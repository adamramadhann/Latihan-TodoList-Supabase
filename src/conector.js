// import suabase 
import { createClient } from "@supabase/supabase-js"

//  mengambil data mengunakan url dan dibuat variabel 
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

//  mengabungkan variabel url dan key 
const supabase = createClient(url, key) 

// mengexport defaul agar elemen bisa dipanggil
export default supabase