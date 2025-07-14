package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	fmt.Println("Server running on :8080")

	http.HandleFunc("/upload", corsMiddleware(fileUploadHandler))
	http.HandleFunc("/download", corsMiddleware(fileDownloadHandler))

	log.Fatal(http.ListenAndServe(":8080", nil))
}

// 🧱 CORS middleware wrapper
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Allow requests from your frontend (Vite dev server)
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight
		if r.Method == http.MethodOptions {
			return
		}

		next(w, r)
	}
}

// 📤 Upload handler
func fileUploadHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(20 << 20) // 20 MB max

	file, info, err := r.FormFile("myFile")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	fmt.Fprintf(w, "File name: %s\n", info.Filename)
	fmt.Fprintf(w, "File size: %d\n", info.Size)
	fmt.Fprintf(w, "MIME header: %v\n", info.Header)

	dst, err := createLocation(info.Filename)
	if err != nil {
		http.Error(w, "Error saving the file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	_, err = dst.ReadFrom(file)
	if err != nil {
		http.Error(w, "Error writing the file", http.StatusInternalServerError)
	}
}

// 📁 Create folder if not exists and create file
func createLocation(fileName string) (*os.File, error) {
	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		os.Mkdir("uploads", 0755)
	}
	return os.Create(filepath.Join("uploads", fileName))
}

// 📥 Download handler
func fileDownloadHandler(w http.ResponseWriter, r *http.Request) {
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
