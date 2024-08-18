import { createClient } from '@supabase/supabase-js';

const URL = 'https://lbyvfhadwogwdstfpfcr.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxieXZmaGFkd29nd2RzdGZwZmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM5NDE0NDQsImV4cCI6MjAzOTUxNzQ0NH0.JiPXhIgKjF491bGkCS_bLKT8j3ZViAdZ9wOa1eqIivY';

export const supabase = createClient(URL, API_KEY);
