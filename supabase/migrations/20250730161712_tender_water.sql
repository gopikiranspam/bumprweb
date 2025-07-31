/*
  # Sample Questions for Bumpr Driving Test

  ## Overview
  This migration adds sample questions for all three subjects in English, Telugu, and Hindi.
  These questions are based on Indian RTO driving license test requirements.

  ## 1. Question Categories
  - Road Signs Recognition (road_signs)
  - Traffic Rules & Regulations (road_rules) 
  - Safe Driving Principles (driving_principles)

  ## 2. Languages Supported
  - English (en)
  - Telugu (te) 
  - Hindi (hi)

  ## 3. Difficulty Levels
  - Easy: Basic recognition and simple rules
  - Medium: Applied knowledge and scenarios
  - Hard: Complex situations and edge cases
*/

-- Road Signs Questions (English)
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

-- Easy Road Signs
('What does a red circular sign with a white horizontal line mean?', 'No Entry', 'Stop', 'Give Way', 'Speed Limit', 1, 'A red circular sign with a white horizontal line indicates "No Entry" - vehicles are prohibited from entering.', 'road_signs', 'en', 'easy'),

('What does a triangular sign with red border mean?', 'Mandatory', 'Informational', 'Warning', 'Prohibition', 3, 'Triangular signs with red borders are warning signs that alert drivers to potential hazards ahead.', 'road_signs', 'en', 'easy'),

('What color are mandatory road signs?', 'Red', 'Blue', 'Yellow', 'Green', 2, 'Mandatory signs are blue in color and indicate actions that must be taken by drivers.', 'road_signs', 'en', 'easy'),

-- Medium Road Signs  
('What does a yellow diamond-shaped sign indicate?', 'Construction zone', 'School zone', 'Hospital zone', 'All of the above', 4, 'Yellow diamond-shaped signs can indicate various special zones including construction, school, and hospital areas.', 'road_signs', 'en', 'medium'),

('A sign showing a bicycle inside a red circle means:', 'Bicycle crossing', 'Bicycle parking', 'No bicycles', 'Bicycle repair', 3, 'A bicycle inside a red circle is a prohibition sign meaning bicycles are not allowed in that area.', 'road_signs', 'en', 'medium'),

-- Hard Road Signs
('In a complex intersection with multiple signs, which takes precedence?', 'Traffic lights', 'Police officer signals', 'Road signs', 'Traffic warden signals', 2, 'Police officer signals always take precedence over all other traffic control devices including lights and signs.', 'road_signs', 'en', 'hard');

-- Traffic Rules Questions (English)
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

-- Easy Traffic Rules
('What is the maximum speed limit in city areas for cars?', '40 km/h', '50 km/h', '60 km/h', '70 km/h', 2, 'The maximum speed limit for cars in city/urban areas is 50 km/h as per Indian Motor Vehicle Act.', 'road_rules', 'en', 'easy'),

('When should you use indicators?', 'Only when turning', 'Only when changing lanes', 'When turning or changing lanes', 'Only in heavy traffic', 3, 'Indicators should be used whenever you are turning or changing lanes to signal your intention to other road users.', 'road_rules', 'en', 'easy'),

('What is the legal driving age for cars in India?', '16 years', '17 years', '18 years', '21 years', 3, 'The minimum legal age for driving a car in India is 18 years.', 'road_rules', 'en', 'easy'),

-- Medium Traffic Rules
('What is the penalty for driving without a valid license?', '₹1000', '₹2000', '₹5000', '₹10000', 3, 'Driving without a valid license can result in a fine of ₹5000 and possible imprisonment.', 'road_rules', 'en', 'medium'),

('When is overtaking prohibited?', 'On curves and hills', 'Near intersections', 'In school zones', 'All of the above', 4, 'Overtaking is prohibited on curves, hills, near intersections, school zones, and other specified areas for safety reasons.', 'road_rules', 'en', 'medium'),

-- Hard Traffic Rules  
('If involved in an accident causing injury, you must report to police within:', '6 hours', '12 hours', '24 hours', '48 hours', 3, 'Any accident involving injury must be reported to the police within 24 hours as per Indian law.', 'road_rules', 'en', 'hard');

-- Safe Driving Questions (English)
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

-- Easy Safe Driving
('What should you do before starting your vehicle?', 'Check mirrors only', 'Adjust seat and mirrors', 'Start engine immediately', 'Sound horn', 2, 'Before starting, always adjust your seat, mirrors, check surroundings and ensure all safety equipment is working.', 'driving_principles', 'en', 'easy'),

('When should you wear a seatbelt?', 'Only on highways', 'Only in the front seat', 'Always when driving', 'Only during long trips', 3, 'Seatbelts should always be worn when driving, regardless of distance or type of road.', 'driving_principles', 'en', 'easy'),

('What is the safe following distance in normal conditions?', '1 second', '2 seconds', '3 seconds', '5 seconds', 3, 'The recommended safe following distance in normal conditions is 3 seconds behind the vehicle ahead.', 'driving_principles', 'en', 'easy'),

-- Medium Safe Driving
('What should you do if your brakes fail?', 'Jump out of the vehicle', 'Use handbrake gradually', 'Sound horn continuously', 'Speed up', 2, 'If brakes fail, use the handbrake gradually while steering to a safe area and downshifting gears.', 'driving_principles', 'en', 'medium'),

('When driving in fog, you should:', 'Use high beam lights', 'Use low beam and fog lights', 'Drive faster to get out quickly', 'Follow closely behind other vehicles', 2, 'In fog, use low beam headlights and fog lights, drive slowly, and maintain extra following distance.', 'driving_principles', 'en', 'medium'),

-- Hard Safe Driving
('In an emergency braking situation on a wet road, you should:', 'Brake hard and steer', 'Pump the brakes', 'Apply steady pressure and steer straight', 'Use handbrake only', 3, 'On wet roads during emergency braking, apply steady brake pressure and keep steering straight to avoid skidding.', 'driving_principles', 'en', 'hard');

-- Telugu Questions (Sample - Road Signs)
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

('ఎరుపు వృత్తాకార గుర్తులో తెల్లని అడ్డగీత అంటే ఏమిటి?', 'ప్రవేశం లేదు', 'ఆగు', 'దారిమార్చు', 'వేగ పరిమితి', 1, 'తెల్లని అడ్డగీతతో ఎరుపు వృత్తాకార గుర్తు "ప్రవేశం లేదు" అని అర్థం - వాహనాలు లోపలికి రాకూడదు.', 'road_signs', 'te', 'easy'),

('త్రిభుజాకార ఎరుపు అంచుతో ఉన్న గుర్తు అంటే ఏమిటి?', 'తప్పనిసరి', 'సమాచార', 'హెచ్చరిక', 'నిషేధ', 3, 'ఎరుపు అంచుతో త్రిభుజాకార గుర్తులు హెచ్చరిక గుర్తులు - ముందు ప్రమాదం ఉండవచ్చని తెలియజేస్తాయి.', 'road_signs', 'te', 'easy'),

('నిర్బంధ రోడ్డు గుర్తులు ఏ రంగులో ఉంటాయి?', 'ఎరుపు', 'నీలం', 'పసుపు', 'ఆకుపచ్చ', 2, 'నిర్బంధ గుర్తులు నీలం రంగులో ఉంటాయి మరియు డ్రైవర్లు తప్పకుండా చేయవలసిన పనులను సూచిస్తాయి.', 'road_signs', 'te', 'easy');

-- Hindi Questions (Sample - Road Signs)  
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject, language, difficulty_level) VALUES

('सफेद क्षैतिज रेखा के साथ लाल गोलाकार चिह्न का क्या मतलब है?', 'प्रवेश नहीं', 'रुकें', 'रास्ता दें', 'गति सीमा', 1, 'सफेद क्षैतिज रेखा के साथ लाल गोलाकार चिह्न "प्रवेश नहीं" दर्शाता है - वाहनों का प्रवेश निषिद्ध है।', 'road_signs', 'hi', 'easy'),

('लाल बॉर्डर के साथ त्रिकोणीय चिह्न का क्या मतलब है?', 'अनिवार्य', 'सूचनात्मक', 'चेतावनी', 'निषेध', 3, 'लाल बॉर्डर के साथ त्रिकोणीय चिह्न चेतावनी चिह्न हैं जो ड्राइवरों को आगे की संभावित खतरों के बारे में सचेत करते हैं।', 'road_signs', 'hi', 'easy'),

('अनिवार्य सड़क चिह्न किस रंग के होते हैं?', 'लाल', 'नीला', 'पीला', 'हरा', 2, 'अनिवार्य चिह्न नीले रंग के होते हैं और उन कार्यों को दर्शाते हैं जो ड्राइवरों द्वारा किए जाने चाहिए।', 'road_signs', 'hi', 'easy');

-- Add more questions for comprehensive test coverage
-- This is a sample set - in production, you would have 100+ questions per subject per language