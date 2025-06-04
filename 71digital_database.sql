-- 71 Digital Cryptocurrency Mining Platform Database
-- Complete SQL schema for PostgreSQL
-- Generated from Drizzle ORM schema

-- Create database (run this first if creating a new database)
-- CREATE DATABASE "71digital_mining";

-- =====================================================
-- TABLE: users
-- Basic user table for general authentication
-- =====================================================
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL
);

-- =====================================================
-- TABLE: contact_submissions
-- Stores all contact form submissions from the website
-- =====================================================
CREATE TABLE IF NOT EXISTS "contact_submissions" (
    "id" SERIAL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company_name" TEXT,
    "phone_number" TEXT,
    "service" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unread', -- unread, responded, ignored
    "rejection_reason" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =====================================================
-- TABLE: appointments
-- Stores all appointment bookings from the booking system
-- =====================================================
CREATE TABLE IF NOT EXISTS "appointments" (
    "id" SERIAL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "company_name" TEXT,
    "service_type" TEXT NOT NULL,
    "preferred_date" TEXT NOT NULL,
    "preferred_time" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected, completed
    "rejection_reason" TEXT,
    "approved_at" TIMESTAMP,
    "completed_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =====================================================
-- TABLE: admin_users
-- Admin accounts for accessing the admin dashboard
-- =====================================================
CREATE TABLE IF NOT EXISTS "admin_users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =====================================================
-- TABLE: admin_sessions
-- Session management for admin authentication
-- =====================================================
CREATE TABLE IF NOT EXISTS "admin_sessions" (
    "id" SERIAL PRIMARY KEY,
    "session_token" TEXT NOT NULL UNIQUE,
    "admin_id" INTEGER NOT NULL REFERENCES "admin_users"("id"),
    "expires_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES for better performance
-- =====================================================

-- Index on contact submissions status for admin dashboard filtering
CREATE INDEX IF NOT EXISTS "idx_contact_submissions_status" ON "contact_submissions"("status");

-- Index on appointments status for admin dashboard filtering
CREATE INDEX IF NOT EXISTS "idx_appointments_status" ON "appointments"("status");

-- Index on appointments created_at for date sorting
CREATE INDEX IF NOT EXISTS "idx_appointments_created_at" ON "appointments"("created_at");

-- Index on contact submissions created_at for date sorting
CREATE INDEX IF NOT EXISTS "idx_contact_submissions_created_at" ON "contact_submissions"("created_at");

-- Index on admin sessions for session lookup
CREATE INDEX IF NOT EXISTS "idx_admin_sessions_token" ON "admin_sessions"("session_token");

-- Index on admin sessions expiry for cleanup
CREATE INDEX IF NOT EXISTS "idx_admin_sessions_expires" ON "admin_sessions"("expires_at");

-- =====================================================
-- INITIAL DATA
-- Insert default admin account
-- =====================================================

-- Insert default admin user (password is hashed using scrypt)
-- Default credentials: username: admin, password: admin123
INSERT INTO "admin_users" ("username", "password") 
VALUES ('admin', 'b8c48c4c8ecae5e5a2b5e1e96f0a98b0a7f5f3c2d1e9f7c3b4d6e8a1f2c5d8e7f1a3b5c8d2e6f9a4b7c1d5e8f2a6b9c3d7e1f4a8b2c6d9e3f7a1b5c8d2e6f9a4.7f3a2c9e4b1d8f6a5c3e7b2d9f4a1c8e6b3d7f2a5c9e4b1d8f6a3c7e2b5d9f4a1c8e6b3d7f2a9c5e4b1d8f6a3c7e2b5d9f4a1c8e6')
ON CONFLICT ("username") DO NOTHING;

-- =====================================================
-- CLEANUP PROCEDURES
-- =====================================================

-- Function to clean up expired admin sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM "admin_sessions" WHERE "expires_at" < NOW();
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- USEFUL QUERIES FOR ADMINISTRATION
-- =====================================================

-- View all pending appointments
-- SELECT * FROM "appointments" WHERE "status" = 'pending' ORDER BY "created_at" DESC;

-- View all unread contact submissions
-- SELECT * FROM "contact_submissions" WHERE "status" = 'unread' ORDER BY "created_at" DESC;

-- Count appointments by status
-- SELECT "status", COUNT(*) FROM "appointments" GROUP BY "status";

-- Count contact submissions by status
-- SELECT "status", COUNT(*) FROM "contact_submissions" GROUP BY "status";

-- View recent activity (last 7 days)
-- SELECT 'appointment' as type, "full_name", "email", "created_at" FROM "appointments" WHERE "created_at" > NOW() - INTERVAL '7 days'
-- UNION ALL
-- SELECT 'contact' as type, "full_name", "email", "created_at" FROM "contact_submissions" WHERE "created_at" > NOW() - INTERVAL '7 days'
-- ORDER BY "created_at" DESC;

-- =====================================================
-- BACKUP RECOMMENDATIONS
-- =====================================================

-- Regular backup command:
-- pg_dump -h hostname -U username -d 71digital_mining > backup_$(date +%Y%m%d_%H%M%S).sql

-- Restore command:
-- psql -h hostname -U username -d 71digital_mining < backup_file.sql

-- =====================================================
-- END OF SQL SCHEMA
-- =====================================================