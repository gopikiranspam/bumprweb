/*
  # Create FAQ Table for SEO Enhancement

  1. New Tables
    - `faq`
      - `id` (uuid, primary key)
      - `question` (text, not null)
      - `answer` (text, not null)
      - `created_at` (timestamp)
      - `is_active` (boolean, default true)
      - `display_order` (integer, for custom ordering)

  2. Security
    - Enable RLS on `faq` table
    - Add policy for public read access (SEO friendly)

  3. Sample Data
    - Insert 20 relevant FAQ entries for driving license preparation
*/

-- Create FAQ table
CREATE TABLE IF NOT EXISTS faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (important for SEO)
CREATE POLICY "Anyone can read active FAQs"
  ON faq
  FOR SELECT
  TO public
  USING (is_active = true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_faq_active_order ON faq (is_active, display_order, created_at);

-- Insert sample FAQ data relevant to driving license preparation
INSERT INTO faq (question, answer, display_order) VALUES
('What is a Learner''s License (LLR) in India?', 'A Learner''s License (LLR) is a temporary driving permit that allows you to learn driving under supervision. It''s mandatory before applying for a permanent driving license in India. The LLR is valid for 6 months and can be renewed once.', 1),

('What documents are required for LLR application?', 'You need: 1) Proof of age (Birth certificate, 10th mark sheet, Passport), 2) Proof of address (Aadhaar card, Voter ID, Utility bills), 3) Passport-size photographs, 4) Form 1 (application form), 5) Medical certificate (for commercial vehicles), and 6) Application fee payment receipt.', 2),

('What is the minimum age requirement for different vehicle categories?', 'For motorcycles without gear (up to 50cc): 16 years, For motorcycles with gear and cars: 18 years, For commercial vehicles: 20 years, For transport vehicles: 20 years. Age proof is mandatory during application.', 3),

('How many questions are there in the RTO written test?', 'The RTO written test typically contains 20 questions covering traffic rules, road signs, and driving principles. You need to score at least 60% (12 correct answers) to pass the test. The test duration is usually 30 minutes.', 4),

('What topics are covered in the driving license test?', 'The test covers three main areas: 1) Traffic Rules and Regulations, 2) Road Signs and their meanings, 3) Safe Driving Principles and practices. Questions include scenarios about right of way, speed limits, parking rules, and emergency procedures.', 5),

('Can I take the RTO test in regional languages?', 'Yes, most RTOs offer the written test in regional languages including Hindi, English, and local state languages like Telugu, Tamil, Marathi, etc. You can choose your preferred language during the application process.', 6),

('What happens if I fail the RTO written test?', 'If you fail the written test, you can retake it after 7 days. There''s no limit on the number of attempts, but you may need to pay the test fee again. Use this time to study more and practice with mock tests.', 7),

('How long is the Learner''s License valid?', 'The Learner''s License is valid for 6 months from the date of issue. If you don''t apply for a permanent license within this period, you can renew the LLR once for another 6 months. After that, you''ll need to reapply.', 8),

('What is the difference between LMV and MCWG licenses?', 'LMV (Light Motor Vehicle) license allows you to drive cars, jeeps, and light commercial vehicles up to 7500kg. MCWG (Motor Cycle With Gear) license is for motorcycles with gear systems. You can apply for both simultaneously.', 9),

('Can I drive immediately after getting LLR?', 'No, you cannot drive alone with just an LLR. You must be accompanied by someone who holds a valid permanent driving license for the same category of vehicle. The supervisor should be seated beside you and guide you while driving.', 10),

('What are the common mistakes to avoid in RTO test?', 'Common mistakes include: 1) Not reading questions carefully, 2) Confusing similar road signs, 3) Not knowing exact speed limits, 4) Misunderstanding right-of-way rules, 5) Poor time management. Practice regularly with mock tests to avoid these errors.', 11),

('How much does it cost to get a driving license in India?', 'The fee varies by state but typically: LLR application: ₹150-200, Permanent license: ₹200-500, Additional charges for tests and smart card. Total cost usually ranges from ₹500-1000 depending on your state and vehicle category.', 12),

('What is the validity period of a permanent driving license?', 'A permanent driving license is valid for 20 years from the date of issue (or until age 50, whichever is earlier). After that, it needs to be renewed every 5 years. Commercial licenses have shorter validity periods.', 13),

('Can I apply for DL online?', 'Yes, most states offer online application for driving licenses through their transport department websites or the Parivahan portal. You can fill the application, pay fees, and book test slots online. However, you still need to visit RTO for tests.', 14),

('What should I bring for the practical driving test?', 'For the practical test, bring: 1) Original LLR, 2) All original documents, 3) Vehicle for test (or RTO vehicle), 4) Valid insurance and registration papers (if using own vehicle), 5) Test fee receipt. Arrive 30 minutes early.', 15),

('How can I check my driving license application status?', 'You can check your application status online through: 1) State transport department website, 2) Parivahan portal (parivahan.gov.in), 3) mParivahan mobile app, or 4) by visiting the RTO office with your application receipt number.', 16),

('What are the penalties for driving without a license?', 'Driving without a license can result in: 1) Fine of ₹5,000 for first offense, 2) ₹10,000 for subsequent offenses, 3) Vehicle impoundment, 4) Legal complications in case of accidents. Always carry your license while driving.', 17),

('Can I convert my LLR to permanent license before 30 days?', 'No, you must wait at least 30 days after getting your LLR before applying for a permanent license. This mandatory waiting period ensures you get adequate practice time under supervision before driving independently.', 18),

('What is the process for license renewal?', 'For license renewal: 1) Apply 30 days before expiry, 2) Submit Form 9 with required documents, 3) Pay renewal fees, 4) Medical test (for commercial licenses), 5) Collect renewed license. Late renewal may attract penalties.', 19),

('Are there any medical requirements for driving license?', 'Basic medical fitness is required for all licenses. For commercial vehicles, a detailed medical examination including vision, hearing, and physical fitness tests is mandatory. Some conditions may require special endorsements or restrictions on your license.', 20);