-- Create the contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for better query performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Optional: Create a row level security policy if needed
-- ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
-- 
-- -- Only authenticated users can read submissions (for admin purposes)
-- CREATE POLICY "Only authenticated users can read contact submissions" ON contact_submissions
--   FOR SELECT USING (auth.role() = 'authenticated');
-- 
-- -- Allow anonymous insert for contact form submissions
-- CREATE POLICY "Allow anonymous contact form submissions" ON contact_submissions
--   FOR INSERT WITH CHECK (true);