import logo from "../../assets/logo.svg";
import {
  UserButton,
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { Button } from "./button";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <img src={logo} width={150} height={100} />
      <ul className="hidden  md:flex gap-16 ">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Home
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Search
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          New
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Preowned
        </li>
      </ul>

      {isSignedIn ? (
        <div className="flex items-center justify-center gap-4">
          <SignedIn>
            <UserButton />
            <Link to={"/profile"}>
              <Button className="text-white">Submit Listing</Button>
            </Link>
          </SignedIn>
        </div>
      ) : (
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/">
            <Button className="text-white">Sign In</Button>
          </SignInButton>
        </SignedOut>
      )}
    </div>
  );
};

export default Header;