import { Link, useSearchParams } from "react-router-dom";

import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Header = () => {
  const [showSignIn, setShowSignin] = useState(false);

  const [search, setSerch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignin(true);
      setSerch({});
    }
  }, [search, setSerch]);

  const handleOverlayClerk = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignin(false);
    }
  };

  return (
    <>
      <nav className=" py-4 flex justify-between items-center mx-3 md:mx-0">
        <Link>
          <img src="./navlogo.png" alt="" className="md:h-20 h-14 " />
        </Link>

        <div className="flex gap-3 z-10">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignin(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: " w-10 h-10",
                },
              }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Applications"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="my-applications"></UserButton.Link>

                <UserButton.Link
                  label="Saved jobs"
                  labelIcon={<Heart size={15} />}
                  href="saved-jobs"></UserButton.Link>
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          onClick={handleOverlayClerk}
          className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
