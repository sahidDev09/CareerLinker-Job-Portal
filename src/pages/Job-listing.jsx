/* eslint-disable react-hooks/exhaustive-deps */
import { getJobs } from "@/api/apiJobs";
import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";

const Joblisting = () => {
  const { session } = useSession();

  const fetchJobs = async () => {
    try {
      if (!session) {
        console.error("Session is not available. User may not be logged in.");
        return;
      }

      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      if (!supabaseAccessToken) {
        console.error("Failed to retrieve the Supabase access token.");
        return;
      }

      const data = await getJobs(supabaseAccessToken); // Await the API call
      console.log(data, "hi sahid");
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [session]); // Add session as a dependency to ensure it updates properly

  return <div>job listing</div>;
};

export default Joblisting;
