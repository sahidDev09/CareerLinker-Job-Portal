import supabaseClient from "@/utils/supabase";

export async function getJobs(token) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select("*");

  const { data: jobs, error } = await query;

  if (error) {
    console.error("Error occurs", error);
    return null;
  }
  return jobs;
}
