import React from "react";
import { TypeAnimation } from "react-type-animation";

// Header with a dynamic type animation
const Header: React.FC = () => {
  return (
    <header className=" mx-1 my-5 p-4 flex justify-between items-center">
      {/* <h1 className="text-xl font-bold">Restaurant Finder</h1> */}
      <div
        // href="/"
        className="text-sm font-semibold bg-neutral-700 rounded-md p-1"
      >
        <span className="text-white mr-1">Restaurant</span>
        <span className=" w-12 h-8 rounded bg-neutral-100 px-1 text-neutral-700 font-bold">
          Finder
        </span>
      </div>
      <p className=" text-sm font-semibold mx-2 px-1">
        <TypeAnimation
          sequence={[
            "Good food is the foundation of genuine happiness !", // Types 'One'
            2000, // Waits 2s
            "Savor the flavors, one restaurant at a time !", // De-letes 'One' and types 'Two'
            2000, // Waits 2s
            "Where every meal is a culinary adventure !",
            2000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ display: "inline-block" }}
        />
      </p>
    </header>
  );
};

export default Header;
