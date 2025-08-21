// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Cole aqui a URL e a chave que você copiou do seu projeto Supabase
const supabaseUrl = 'https://icsytolryyduvtfzrexx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljc3l0b2xyeXlkdXZ0ZnpyZXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1Mzg5MDYsImV4cCI6MjA2MTExNDkwNn0.mLkLYd6bCPl9rqlcdNcXC4utqEgxF7n9tV4fHoM_aQk';

// Cria e exporta o cliente Supabase para ser usado em outros lugares do app
export const supabase = createClient(supabaseUrl, supabaseAnonKey );
