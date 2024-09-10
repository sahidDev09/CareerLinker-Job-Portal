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
      <nav className=" py-4 flex justify-between items-center mx-3 md:mx-0">
        <Link>
          <img src="./navlogo.png" alt="" className="md:h-20 h-14 " />
        </Link>
        {/* <Button variant="outline">Login</Button> */}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </>
  );
};

export default Header;
