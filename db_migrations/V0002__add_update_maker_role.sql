-- Add is_update_maker column to reviews table
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS is_update_maker BOOLEAN DEFAULT FALSE;

-- Add is_update_maker column to review_replies table
ALTER TABLE review_replies 
ADD COLUMN IF NOT EXISTS is_update_maker BOOLEAN DEFAULT FALSE;