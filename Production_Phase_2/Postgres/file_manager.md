## windows
```sql
psql -U postgres
CREATE DATABASE file_manager
\! cls

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE files (
    file_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size BIGINT NOT NULL,
    location TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW(),
    description TEXT
);

ALTER TABLE files
DROP COLUMN description;
```

```go
go get github.com/lib/pq
```