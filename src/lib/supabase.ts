import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdqyxkpbvdccsqyviclc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcXl4a3BidmRjY3NxeXZpY2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNTk0OTYsImV4cCI6MjA5MjgzNTQ5Nn0.LRfmZyb9LHMRj3vV98x2dZoWGFGO1gk0kWAX1ZbW7dQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
