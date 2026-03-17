-- Create the table
CREATE TABLE IF NOT EXISTS public.waiting_list (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  user_type text NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Optional: index for looking up by email
CREATE INDEX IF NOT EXISTS waiting_list_email_idx ON public.waiting_list (email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Policy: allow anyone to INSERT (so the sign-up form works)
CREATE POLICY "Allow public insert on waiting_list"
  ON public.waiting_list
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: allow authenticated users to SELECT (e.g. admin view later)
CREATE POLICY "Allow authenticated read on waiting_list"
  ON public.waiting_list
  FOR SELECT
  TO authenticated
  USING (true);

COMMENT ON TABLE public.waiting_list IS 'SOTR-APP waiting list sign-ups';