import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Landing = () => {
  return (
    <main className=" flex flex-col py-5 gap-7 m-2">
      <section className=" text-center flex flex-col items-center justify-center">
        <h1 className=" gradient-title md:text-6xl text-xl font-black uppercase">
          Your search for the next <br /> dream job is over here
        </h1>
        <img
          src="./careerLinkerBig.png"
          alt="career linker logo"
          className="md:w-[45%] w-72 md:ml-24"
        />
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Discover your next career move with confidence and ease
        </p>
      </section>

      {/* button */}

      <div className="md:flex md:gap-5 gap-2 justify-center md:mr-10">
        <Link to="/jobs">
          <Button variant="blue" size="xl" className=" w-full mb-2">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl" className=" w-full mb-2">
            Post Jobs
          </Button>
        </Link>
      </div>

      {/* carousel */}

      <div>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
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

      {/* banner */}

      <div>
        <img
          src="/public/careerLinkerBigone.png"
          alt=""
          className="rounded-md md:h-[650px] lg:h-[720px] object-cover w-full"
        />
      </div>

      {/* cards */}

      <section className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="opacity-75">
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track application, and more.
          </CardContent>
        </Card>
        <Card className="opacity-75">
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* Accordians */}
      <section>
        <h1 className=" text-3xl text-center font-semibold">FAQ</h1>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className=" p-4 rounded-md bg-gray-800">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </main>
  );
};

export default Landing;
