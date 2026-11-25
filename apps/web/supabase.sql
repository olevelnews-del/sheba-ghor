-- ShebaGhor Database Schema
-- -------------------------------------------------------
-- Supabase SQL migrations for ShebaGhor - Digital Computer Shop
-- -------------------------------------------------------

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL CHECK (service_type IN ('nid_correction', 'namjari')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'checking', 'ready', 'submitted', 'rejected', 'approved')),
  current_step INTEGER NOT NULL DEFAULT 0,
  app_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  checked_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  quality TEXT NOT NULL DEFAULT 'good' CHECK (quality IN ('good', 'blurry', 'small')),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Checks table
CREATE TABLE IF NOT EXISTS checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  result TEXT NOT NULL CHECK (result IN ('pass', 'fail')),
  message_bn TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_service_type ON applications(service_type);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_documents_application_id ON documents(application_id);
CREATE INDEX IF NOT EXISTS idx_checks_application_id ON checks(application_id);

-- Row Level Security Policies
-- Allow users to only see their own data
CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications" ON applications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM applications WHERE id = application_id));

CREATE POLICY "Users can insert own documents" ON documents
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM applications WHERE id = application_id));

CREATE POLICY "Users can view own checks" ON checks
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM applications WHERE id = application_id));

-- Sample data / seed
INSERT INTO users (phone, name) VALUES ('+8801616200174', 'Test User') ON CONFLICT DO NOTHING;