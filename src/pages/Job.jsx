import { getSingleJob } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPin } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Job = () => {
  const { isLoaded, user } = useUser();

  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fnc: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className=" mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className=" flex flex-col gap-8 mt-5">
      <div className=" flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className=" font-extrabold text-4xl sm:text-6xl pb-3">
          {job?.title}
        </h1>
        <img src={job?.company?.logo} alt={job?.title} className=" h-12" />
      </div>
      <div className=" flex justify-between">
        <div className=" flex gap-2 items-center">
          <MapPin />
          {job?.location}
        </div>
        <div className=" flex items-center gap-2">
          <Briefcase />
          {job?.application?.length} Applicants
        </div>
        <div className=" flex items-center gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen />
              Open
            </>
          ) : (
            <>
              {" "}
              <DoorClosed /> Closed{" "}
            </>
          )}
        </div>
      </div>
      {/* hiring status */}
      <h2 className=" text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className=" sm:text-lg">{job?.description}</p>
      <h2 className=" text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
    </div>
  );
};

export default Job;
