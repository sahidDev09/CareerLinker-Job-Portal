import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <nav className=" py-4 flex justify-between items-center">
        <Link>
          <img src="./careerLinkerLogo.png" alt="" className=" h-20" />
        </Link>
        <Button variant="outline">Login</Button>
      </nav>
    </>
  );
};

export default Header;
