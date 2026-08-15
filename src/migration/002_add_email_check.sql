ALTER TABLE students
ADD CONSTRAINT check_email_format
CHECK (email LIKE '%@%.com');
