/* eslint-disable react-hooks/exhaustive-deps */
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Joblisting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompnay_id] = useState("");

  const { isLoaded } = useUser();

  const {
    fnc: fnJob,
    data: jobs,
    loading: JobsLoading,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded, location, searchQuery, company_id]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  console.log(jobs, "my job information");

  return (
    <div>
      <h1 className=" text-6xl sm:text-7xl text-center font-extrabold pb-8">
        Latest Jobs
      </h1>

      {/* add filter here */}

      {JobsLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {JobsLoading == false && (
        <div>
          {jobs?.length ? (
            <div className="grid mt-8 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => {
                return <JobCard key={job.id} job={job} />;
              })}
            </div>
          ) : (
            <div>
              <h1>No Jobs Found 😢</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Joblisting;
