/* eslint-disable react-hooks/exhaustive-deps */
import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

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

  const { fnc: fncompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fncompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded, location, searchQuery, company_id]);

  // serach filter funcitonality

  const handleSerach = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  // clear filter fucntion

  const clearFilter = () => {
    setLocation("");
    setSearchQuery("");
    setCompnay_id("");
  };

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

      <form
        onSubmit={handleSerach}
        className=" h-14 flex w-full gap-2 items-center mb-6">
        <Input
          type="text"
          placeholder="Search Jobs By Title.."
          name="search-query"
          className=" h-full flex-1 py-4 text-md"
        />
        <Button type="submit" className=" h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      {/* select items */}

      <div className=" flex flex-col sm:flex-row gap-3">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("BD").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompnay_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={clearFilter}
          variant="destructive"
          className="sm:w-1/2">
          Clear Filter
        </Button>
      </div>

      {JobsLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {JobsLoading == false && (
        <div>
          {jobs?.length ? (
            <div className="grid mt-8 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => {
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    savedInit={job.saved?.length > 0}
                  />
                );
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
