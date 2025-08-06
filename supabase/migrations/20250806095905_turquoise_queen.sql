/*
  # Create Social Links and Site Content Tables

  1. New Tables
    - `social_links`
      - `id` (uuid, primary key)
      - `platform_name` (text, not null)
      - `url` (text, not null)
      - `icon_class` (text)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
    
    - `site_content`
      - `id` (uuid, primary key)
      - `content_type` (text, not null) - for 'privacy_policy', 'about', 'terms_conditions'
      - `title` (text, not null)
      - `content` (text, not null)
      - `last_updated` (timestamp)
      - `is_published` (boolean, default false)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated admin users to manage content

  3. Indexes
    - Add indexes for better query performance
    - Add unique constraints where appropriate

  4. Sample Data
    - Insert default social media links
    - Insert placeholder content for legal pages
*/

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_name text NOT NULL,
  url text NOT NULL,
  icon_class text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  last_updated timestamptz DEFAULT now(),
  is_published boolean DEFAULT false
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_social_links_active ON social_links (is_active);
CREATE INDEX IF NOT EXISTS idx_social_links_platform ON social_links (platform_name);
CREATE INDEX IF NOT EXISTS idx_site_content_type ON site_content (content_type);
CREATE INDEX IF NOT EXISTS idx_site_content_published ON site_content (is_published);

-- Add unique constraint for content types
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'site_content_content_type_key' 
    AND table_name = 'site_content'
  ) THEN
    ALTER TABLE site_content ADD CONSTRAINT site_content_content_type_key UNIQUE (content_type);
  END IF;
END $$;

-- Add check constraints
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints 
    WHERE constraint_name = 'social_links_platform_name_check'
  ) THEN
    ALTER TABLE social_links ADD CONSTRAINT social_links_platform_name_check 
    CHECK (platform_name IN ('facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'telegram'));
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints 
    WHERE constraint_name = 'site_content_content_type_check'
  ) THEN
    ALTER TABLE site_content ADD CONSTRAINT site_content_content_type_check 
    CHECK (content_type IN ('privacy_policy', 'about', 'terms_conditions', 'refund_policy', 'disclaimer', 'contact'));
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Create policies for social_links
CREATE POLICY IF NOT EXISTS "Anyone can read active social links"
  ON social_links
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY IF NOT EXISTS "Authenticated users can manage social links"
  ON social_links
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for site_content
CREATE POLICY IF NOT EXISTS "Anyone can read published content"
  ON site_content
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY IF NOT EXISTS "Authenticated users can manage site content"
  ON site_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default social media links
INSERT INTO social_links (platform_name, url, icon_class, is_active) VALUES
  ('facebook', 'https://facebook.com/bumpr', 'fab fa-facebook-f', true),
  ('twitter', 'https://twitter.com/bumpr', 'fab fa-twitter', true),
  ('linkedin', 'https://linkedin.com/company/bumpr', 'fab fa-linkedin-in', true),
  ('instagram', 'https://instagram.com/bumpr', 'fab fa-instagram', true)
ON CONFLICT DO NOTHING;

-- Insert default site content
INSERT INTO site_content (content_type, title, content, is_published) VALUES
  (
    'privacy_policy',
    'Privacy Policy',
    'This Privacy Policy describes how Bumpr India collects, uses, and protects your personal information when you use our RTO test preparation platform. We are committed to protecting your privacy and ensuring the security of your personal data.',
    true
  ),
  (
    'about',
    'About Bumpr India',
    'Bumpr India is the leading RTO test preparation platform in India. We help millions of aspiring drivers pass their driving license tests with comprehensive mock tests, practice questions, and expert guidance. Our questions are based on the India Motor Vehicles Act, 1988 and are valid across all Indian states.',
    true
  ),
  (
    'terms_conditions',
    'Terms and Conditions',
    'These Terms and Conditions govern your use of the Bumpr India platform. By accessing or using our services, you agree to be bound by these terms. Please read them carefully before using our platform.',
    true
  ),
  (
    'refund_policy',
    'Refund Policy',
    'At Bumpr India, we strive to provide the best RTO test preparation experience. This refund policy outlines the terms and conditions for refunds on our premium services.',
    true
  ),
  (
    'disclaimer',
    'Disclaimer',
    'The information provided on Bumpr India is for educational purposes only. While we strive to ensure accuracy, we recommend verifying all information with official RTO sources before your actual test.',
    true
  ),
  (
    'contact',
    'Contact Information',
    'Get in touch with Bumpr India support team. We are here to help you succeed in your RTO test preparation journey.',
    true
  )
ON CONFLICT (content_type) DO NOTHING;

-- Create trigger to update last_updated timestamp
CREATE OR REPLACE FUNCTION update_site_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER IF NOT EXISTS update_site_content_last_updated
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_site_content_timestamp();