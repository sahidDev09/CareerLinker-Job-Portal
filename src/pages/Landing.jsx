import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";

const Landing = () => {
  return (
    <main className=" flex flex-col py-5 gap-7">
      <section className=" text-center flex flex-col items-center justify-center">
        <h1 className=" gradient-title md:text-6xl text-2xl font-black uppercase">
          Your search for the next <br /> dream job is over here
        </h1>
        <img
          src="./careerLinkerBig.png"
          alt="career linker logo"
          className="md:w-[45%] ml-24"
        />
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Discover your next career move with confidence and ease
        </p>
      </section>

      {/* button */}

      <div className="flex gap-5 justify-center mr-10">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">
            Post Jobs
          </Button>
        </Link>
      </div>

      {/* carousel */}

      <div>
        <Carousel
          plugins={[Autoplay({ delay: 2000})]}
          className="w-full py-10">
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, location }) => {
              return (
                <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                  <img
                    src={location}
                    alt={name}
                    className=" h-9 sm:h-14 object-contain"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </main>
  );
};

export default Landing;
