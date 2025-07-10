package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "anshuman.01" // <-- Replace with your actual password
	dbname   = "testgo"      // <-- Your DB name
)

type FileRecord struct {
	ID         int64  `json:"id"`
	Filename   string `json:"filename"`
	StoredPath string `json:"stored_path"`
	Size       int64  `json:"size"`
	MimeType   string `json:"mime_type"`
	UploadedAt string `json:"uploaded_at"`
}

func main() {
	fmt.Println("Testing Phase 2")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	triggerPanic(err)
	defer db.Close()

	err = db.Ping()
	triggerPanic(err)

	fmt.Println("✅ Successfully connected to PostgreSQL!")

	rows, err := db.Query(`SELECT id, filename, stored_path, size, mime_type, uploaded_at FROM files ORDER BY uploaded_at DESC`)
	triggerPanic(err)
	defer rows.Close()

	var files []FileRecord

	for rows.Next() {
		var f FileRecord
		err := rows.Scan(&f.ID, &f.Filename, &f.StoredPath, &f.Size, &f.MimeType, &f.UploadedAt)
		triggerPanic(err)
		files = append(files, f)
	}

	// Convert to JSON
	jsonData, err := json.MarshalIndent(files, "", "  ")
	triggerPanic(err)

	fmt.Println("📄 Files Table (as JSON):")
	fmt.Println(string(jsonData))
}

func triggerPanic(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
