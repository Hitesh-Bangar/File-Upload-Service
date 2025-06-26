# 📦 File-Upload-Service

A secure Node.js (Express) micro-service for **authenticated file uploads**, **async processing with BullMQ + Redis**, and **status tracking** on PostgreSQL/SQLite.  
Perfect as a plug-in micro-service in a larger architecture or as a learning template for production-grade Express back-ends.

---

## ✨ Features

* **JWT authentication** – stateless, role-free demo login (`demo@example.com / password`)
* **File uploads** – streamed to `src/uploads/` with Multer, 10 MB max
* **Background processing** – BullMQ worker calculates a SHA-256 checksum (simulated business logic)
* **Per-user isolation** – a user sees only their own files
* **SQLite by default** – flip one env var to use PostgreSQL
* **Docker-first** – Node.js + Redis + (optional) Postgres in one command
* **Tests** – Jest scaffolding (unit + integration)
* **Swagger-ready** – add `swagger-ui-express` and point to `swagger.json` if desired

---

## 🚀 Quick Start

> **Prereqs:**  
> * Docker Desktop **OR** Node 18 +, npm, and (optionally) a local Redis/PostgreSQL instance.

### 1 · Clone & configure

```bash`
git clone https://github.com/your-org/file-upload-service.git
cd file-upload-service
cp .env.example .env      # edit if needed

docker-compose up --build            # foreground  
### or detach:
docker-compose up -d --build


npm install
npm run dev            # launches src/server.js with nodemon
### in another terminal:
npm run worker         # starts the BullMQ processor

docker-compose down

docker exec -it postgres-1 psql -U postgres -d file_upload


## Demo Curls

curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"demo@example.com","password":"password"}'
{
    "token": "token"
}

curl --location 'http://localhost:3000/upload' \
--form 'file=@"/path/file-sample_150kB 2.pdf"'
{
    "id": 2,
    "status": "uploaded"
}

curl --location 'http://localhost:3000/files/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkZW1vQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ4NDE3ODMzLCJleHAiOjE3NDg0MjE0MzN9.G9T0sKrlA07ftaXeY5zZzT4LZBIGnEnMN8wXMTt2pOY'
{
    "id": 1,
    "user_id": 1,
    "original_filename": "file-sample_150kB 2.pdf",
    "storage_path": "path\1748417967053-470708549.pdf",
    "title": null,
    "description": null,
    "status": "uploaded",
    "extracted_data": null,
    "uploaded_at": "2025-05-28T07:39:27.085Z"
}

curl --location 'http://localhost:3000/health' \
--header 'Authorization: Bearer token'
{
    "status": "ok",
    "timestamp": 1748418072787
}
