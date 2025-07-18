package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	_ "github.com/lib/pq"
)

type FileMeta struct {
	ID         string    `json:"id"`
	Name       string    `json:"name"`
	Size       int64     `json:"size"`
	Type       string    `json:"type"`
	Location   string    `json:"location"`
	UploadedAt time.Time `json:"uploaded_at"`
}

type StorageStats struct {
	TotalSizeGB    float64 `json:"total_size_gb"`
	TotalSizeBytes int64   `json:"total_size_bytes"`
	MaxSizeGB      float64 `json:"max_size_gb"`
	UsagePercent   float64 `json:"usage_percent"`
	FileCount      int     `json:"file_count"`
}

var db *sql.DB

func main() {
	var err error
	db, err = sql.Open("postgres", "user=postgres password=anshuman.01 dbname=file_manager sslmode=disable")
	if err != nil {
		log.Fatal("DB connection error:", err)
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Fatal("Cannot ping database:", err)
	}

	http.HandleFunc("/upload", corsMiddleware(fileUploadHandler))
	http.HandleFunc("/download", corsMiddleware(fileDownloadHandler))
	http.HandleFunc("/files", corsMiddleware(getFilesHandler))
	http.HandleFunc("/delete", corsMiddleware(deleteFileHandler))
	http.HandleFunc("/storage-stats", corsMiddleware(getStorageStatsHandler))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server running on :%s\n", port)
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, nil))
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		allowedOrigins := map[string]bool{
			"http://localhost:5173":     true,
			"https://192.168.56.1:5173": true, // 🔁 Update to your deployed frontend URL
		}
		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}

		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func fileUploadHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(20 << 20)
	if err != nil {
		http.Error(w, "Error parsing form", http.StatusBadRequest)
		return
	}

	file, info, err := r.FormFile("myFile")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	dst, err := createLocation(info.Filename)
	if err != nil {
		http.Error(w, "Error creating file location", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		http.Error(w, "Error writing the file", http.StatusInternalServerError)
		return
	}

	location := filepath.Join("uploads", info.Filename)
	_, err = db.Exec(`
		INSERT INTO files (name, size, type, location, uploaded_at) 
		VALUES ($1, $2, $3, $4, $5)
	`, info.Filename, info.Size, info.Header.Get("Content-Type"), location, time.Now())

	if err != nil {
		log.Printf("Database insert error: %v", err)
		http.Error(w, "Database insert failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	response := map[string]string{
		"message": fmt.Sprintf("File %s uploaded successfully", info.Filename),
		"status":  "success",
	}
	json.NewEncoder(w).Encode(response)
}

func createLocation(fileName string) (*os.File, error) {
	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		err = os.MkdirAll("uploads", 0755)
		if err != nil {
			return nil, err
		}
	}
	return os.Create(filepath.Join("uploads", fileName))
}

func fileDownloadHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	fileName := r.URL.Query().Get("file")
	if fileName == "" {
		http.Error(w, "Missing file parameter", http.StatusBadRequest)
		return
	}

	path := filepath.Join("uploads", fileName)
	if _, err := os.Stat(path); os.IsNotExist(err) {
		http.Error(w, "File not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Disposition", "attachment; filename="+fileName)
	w.Header().Set("Content-Type", "application/octet-stream")
	http.ServeFile(w, r, path)
}

func getFilesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	rows, err := db.Query("SELECT file_id, name, size, type, location, uploaded_at FROM files ORDER BY uploaded_at DESC")
	if err != nil {
		log.Printf("Database query error: %v", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var files []FileMeta
	for rows.Next() {
		var f FileMeta
		if err := rows.Scan(&f.ID, &f.Name, &f.Size, &f.Type, &f.Location, &f.UploadedAt); err != nil {
			log.Printf("Row scan error: %v", err)
			continue
		}
		files = append(files, f)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Rows iteration error: %v", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(files)
}

func getStorageStatsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var totalSize int64
	var fileCount int

	err := db.QueryRow("SELECT COALESCE(SUM(size), 0), COUNT(*) FROM files").Scan(&totalSize, &fileCount)
	if err != nil {
		log.Printf("Database query error: %v", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	const maxSizeGB = 10.0
	totalSizeGB := float64(totalSize) / (1024 * 1024 * 1024)
	usagePercent := (totalSizeGB / maxSizeGB) * 100

	stats := StorageStats{
		TotalSizeGB:    totalSizeGB,
		TotalSizeBytes: totalSize,
		MaxSizeGB:      maxSizeGB,
		UsagePercent:   usagePercent,
		FileCount:      fileCount,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}

func deleteFileHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost && r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		IDs []string `json:"ids"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if len(req.IDs) == 0 {
		http.Error(w, "No file IDs provided", http.StatusBadRequest)
		return
	}

	deletedCount := 0
	for _, id := range req.IDs {
		var location string
		err := db.QueryRow("SELECT location FROM files WHERE file_id = $1", id).Scan(&location)
		if err != nil {
			log.Printf("Error getting file location for ID %s: %v", id, err)
			continue
		}

		if err := os.Remove(location); err != nil {
			log.Printf("Error deleting physical file %s: %v", location, err)
		}

		result, err := db.Exec("DELETE FROM files WHERE file_id = $1", id)
		if err != nil {
			log.Printf("Error deleting file with ID %s from database: %v", id, err)
			continue
		}

		rowsAffected, _ := result.RowsAffected()
		if rowsAffected > 0 {
			deletedCount++
		}
	}

	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"message": fmt.Sprintf("Successfully deleted %d files", deletedCount),
		"deleted": deletedCount,
	}
	json.NewEncoder(w).Encode(response)
}
