ALTER TABLE students
ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
