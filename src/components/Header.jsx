/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <nav className=" py-4 flex justify-between items-center">
        <Link>
          <img src="./careerLinkerLogo.png" alt="" className=" h-20" />
        </Link>
        <Button variant="outline">Login</Button>

        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </nav>
    </>
  );
};

export default Header;
