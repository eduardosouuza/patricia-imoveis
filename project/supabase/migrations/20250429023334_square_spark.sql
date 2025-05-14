/*
  # Create properties table with enhanced features

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `full_description` (text)
      - `image` (text)
      - `images` (text[])
      - `price` (numeric)
      - `location` (text)
      - `address` (text)
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `bedrooms` (integer)
      - `bathrooms` (numeric)
      - `size` (numeric)
      - `featured` (boolean)
      - `property_type` (text)
      - `year_built` (integer)
      - `features` (text[])
      - `status` (text)
      - `parking_spaces` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `created_by` (uuid, references auth.users)
      - `updated_by` (uuid, references auth.users)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  full_description text,
  image text NOT NULL,
  images text[],
  price numeric NOT NULL,
  location text NOT NULL,
  address text NOT NULL,
  latitude numeric,
  longitude numeric,
  bedrooms integer NOT NULL,
  bathrooms numeric NOT NULL,
  size numeric NOT NULL,
  featured boolean DEFAULT false,
  property_type text,
  year_built integer,
  features text[],
  status text NOT NULL DEFAULT 'available',
  parking_spaces integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users NOT NULL,
  updated_by uuid REFERENCES auth.users NOT NULL,

  CONSTRAINT status_check CHECK (status IN ('available', 'sold', 'rented'))
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Allow read access for all authenticated users"
  ON properties
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Allow update for property creators
CREATE POLICY "Allow update for property creators"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Allow delete for property creators
CREATE POLICY "Allow delete for property creators"
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create function to automatically update updated_at and updated_by
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    NEW.updated_by = auth.uid();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the function before update
CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE
    ON properties
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();