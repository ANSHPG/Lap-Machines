# Lap Machines

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000)
![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Node](https://img.shields.io/badge/Node.js-20.x-green.svg)
![Go](https://img.shields.io/badge/Go-1.24-blue.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue.svg)

</div>

## 📋 Table of Contents
- [Overview](#overview)
- [⚠️ Important Notice](#important-notice)
- [🌟 Features](#features)
- [🔧 Technical Stack](#technical-stack)
- [🚀 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Configuration](#configuration)
- [🏗️ Project Structure](#project-structure)
- [📦 Components Deep Dive](#components-deep-dive)
- [🔌 API Documentation](#api-documentation)
- [🗄️ Database Schema](#database-schema)
- [🛠️ Development Guide](#development-guide)
- [🚀 Deployment](#deployment)
- [🔒 Security Considerations](#security-considerations)
- [🤝 Contributing](#contributing)
- [📝 License](#license)
- [👤 Author](#author)

## Overview

Lap Machines is a sophisticated file management system that enables rapid file uploads and downloads through a modern web interface. Built with a powerful stack of Go, React with TypeScript, and PostgreSQL, this project demonstrates a production-ready application with containerized deployment capabilities.

## ⚠️ Important Notice

**Mobile Responsiveness**: Please note that this application is currently optimized for desktop use only and is not mobile-responsive. Mobile users may experience layout issues or reduced functionality. Contributors are welcome to fork the project and add mobile responsiveness.

## 🌟 Features

- **Fast File Operations**
  - Rapid file uploads with progress tracking
  - Instant downloads with proper content-type handling
  - Multiple file selection support
  - Drag and drop interface

- **Smart Storage Management**
  - Automatic file type detection
  - File metadata tracking
  - Storage usage statistics
  - UUID-based file identification

- **Security Features**
  - Secure file storage
  - File type validation
  - Size limit enforcement
  - CORS configuration

- **User Interface**
  - Clean, modern design
  - Real-time upload progress
  - File type icons
  - Sort and filter capabilities
  - Dark/Light theme support

## 🔧 Technical Stack

### Frontend (Ashyft)
- React 18.x with TypeScript
- Vite for build tooling
- TailwindCSS for styling [If ShadCN fails to set up TailwindCSS properly, switch to this approach](https://tailwindcss.com/docs/installation/using-vite)
- Shadcn UI components [for vite](https://ui.shadcn.com/docs/installation/vite)
- File handling libraries [React FilePond](https://www.npmjs.com/package/react-filepond)
- Nginx for serving static content

### Backend (Go)
- Go 1.24
- Standard net/http package
- PostgreSQL driver
- File system operations
- RESTful API design

### Database
- PostgreSQL 14
- UUID extension
- Optimized schema design

### DevOps
- Docker & Docker Compose
- Nginx configuration
- Environment management
- Volume persistence

## 🚀 Getting Started

### Prerequisites

1. Install Docker & Docker Compose
   ```bash
   # Verify installations
   docker --version
   docker-compose --version
   ```

2. Ensure ports 5173 (frontend), 8080 (backend), and 5433 (database) are available

3. At least 1GB of free disk space

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ANSHPG/Lap-Machines.git
   cd Lap-Machines/Production_server
   ```

2. **Environment Setup**
   ```bash
   # Create .env file in Ashyft directory
   cp Ashyft/.env.example Ashyft/.env

   # Update environment variables if needed
   ```

3. **Build and Run**
   ```bash
   docker-compose up --build
   ```

4. **Verify Installation**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/health
   - Database: Port 5433 (use any PostgreSQL client)

### Configuration

#### Frontend Configuration
File: `Ashyft/.env`
```env
VITE_API_URL=http://localhost:8080
VITE_MAX_FILE_SIZE=100000000
```

#### Backend Configuration
Environment variables in docker-compose.yml:
```yaml
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=file_manager
PORT=8080
```

## 🏗️ Project Structure

```
Production_server/
├── Ashyft/                 # Frontend application
│   ├── src/               # Source code
│   ├── public/           # Static assets
│   └── Dockerfile        # Frontend container
├── Backend/               # Go backend
│   ├── main.go          # Entry point
│   └── Dockerfile       # Backend container
├── Postgres/              # Database
│   ├── init.sql        # Schema
│   └── file_manager.md # Documentation
└── docker-compose.yml    # Container orchestration
```

## 📦 Components Deep Dive

### Frontend Components
- **File Uploader**: Handles file selection and upload
- **File List**: Displays uploaded files with metadata
- **Storage Stats**: Shows system usage statistics
- **Theme Switcher**: Manages application theme

### Backend Services
- **File Handler**: Processes file operations
- **Database Manager**: Handles data persistence
- **Stats Collector**: Gathers system statistics

## 🔌 API Documentation

### Endpoints

```
GET    /api/files       # List all files
POST   /api/upload     # Upload new file(s)
GET    /api/download   # Download a file
DELETE /api/files/:id  # Delete a file
GET    /api/stats     # Get storage statistics
```

## 🗄️ Database Schema

```sql
CREATE TABLE files (
    file_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size BIGINT NOT NULL,
    location TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);
```

## 🛠️ Development Guide

### Local Development Setup

1. **Frontend Development**
   ```bash
   cd Ashyft
   npm install
   npm run dev
   ```

2. **Backend Development**
   ```bash
   cd Backend
   go mod download
   go run main.go
   ```

3. **Database Setup**
   ```bash
   # See Postgres/file_manager.md for setup instructions
   ```

### Code Style
- Frontend: ESLint + Prettier configuration
- Backend: Go standard formatting
- SQL: PostgreSQL standard style

## 🚀 Deployment

### Production Deployment Steps

1. Update environment variables
2. Build images:
   ```bash
   docker-compose build
   ```
3. Deploy:
   ```bash
   docker-compose up -d
   ```

### Server Requirements
- 1GB RAM minimum
- 10GB storage recommended
- Linux-based OS preferred

## 🔒 Security Considerations

1. File validation on upload
2. Size limitations
3. Secure file storage
4. Database security
5. API rate limiting (recommended)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Areas for improvement:
- Mobile responsiveness
- Additional file type support
- Enhanced security features
- Performance optimizations

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](#LICENSE) file for details.

## 👤 Author

**Anshuman Pattnaik**

- LinkedIn: [@anshphere](https://www.linkedin.com/in/anshphere)
- GitHub: [@ANSHPG](https://github.com/ANSHPG)

## 💖 Support

If you find this project useful, please consider giving it a ⭐️ on GitHub!

---

**Note**: For the latest updates and detailed contribution guidelines, please visit the [GitHub repository](https://github.com/ANSHPG/Lap-Machines).
