import React from "react";
import AnimatedPage from "../shared/components/AnimatedPage";
import { Link } from "react-router-dom";
import "/home/prathmeshchhabra/Web-Development/TravelElite/frontend/src/users/pages/SignIn.css";

const Home = () => {
  return (
    <AnimatedPage>
      <div className="flex flex-col items-center justify-center text-gray-300">
        <div className="text-4xl pb-4">
          Welcome to <span className="font-bold">TravelELite</span>
        </div>
        <div className="text-xl">Mission to Connect Travelers</div>
        <div className="text-center w-[50%] mt-10 text-xl">
          TravelElite aims to connect people who like to travel and allows them
          store their captured memories on the site. You can create your profile
          and upload the photos of pictures you have visited along with some
          relevant information about it. You may also look at other people's
          profiles.
        </div>

        <Link to={"./signup"}>
          <div id="center-btn">
            <input
              type="submit"
              id="join-btn"
              name="join"
              alt="Join"
              value="Get Started"
            ></input>
          </div>
        </Link>
      </div>
    </AnimatedPage>
  );
};

export default Home;
