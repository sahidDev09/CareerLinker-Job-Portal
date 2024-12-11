/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPin, Tractor, Trash, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { saveJobs } from "@/api/apiJobs";
import { useEffect, useState } from "react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = true,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);

  const {
    fnc: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJobs, {
    alreadySaved: saved,
  });

  const { user } = useUser();

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              size={24}
              className=" border-none text-red-400 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo} className=" h-6" />}
          <div className="flex items-center gap-2">
            <MapPin size={18} /> {job.location}
          </div>
        </div>
        <hr />
        <p>{job.description.substring(0, job.description.indexOf("."))}.</p>
      </CardContent>
      <CardFooter className=" flex gap-2">
        <Link to={`/job/${job.id}`} className=" flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-14"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}>
            {saved ? (
              <Heart fill="red" stroke="red" size={24} />
            ) : (
              <Heart size={24} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
