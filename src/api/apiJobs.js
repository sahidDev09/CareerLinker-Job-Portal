import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo), saved: saved_job(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data: jobs, error } = await query;

  if (error) {
    console.error("Error occurs", error);
    return null;
  }
  return jobs;
}

// saved jobs

export async function saveJobs(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_job")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error deleting Data", deleteError);
      return null;
    }
    return data;

  } else {
    const { data, error: insertError } = await supabase
      .from("saved_job")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error inserting Data", insertError);
      return null;
    }
    return data;
  }
}
