/*
  # Add featured flag to properties

  1. Changes
    - Add featured boolean column to properties table with default false
*/

ALTER TABLE properties
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Update the existing RLS policies to include the new column
CREATE POLICY "Users can update featured status"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);