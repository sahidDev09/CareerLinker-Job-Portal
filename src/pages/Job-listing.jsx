import { getJobs } from "@/api/apiJobs";
import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";

const Joblisting = () => {
  const { session } = useSession();

  const fetchJobs = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const data = await getJobs(supabaseAccessToken);
    console.log(data, "from supabase information");
  };

  useEffect(() => {
    fetchJobs();
  }, [session]);

  return <div>this is jobs listing</div>;
};

export default Joblisting;
