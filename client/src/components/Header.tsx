import React from "react";
import { TypeAnimation } from "react-type-animation";

// Header with a dynamic type animation
const Header: React.FC = () => {
  return (
    <header className="bg-neutral-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Restaurant Finder</h1>
      <p className=" text-sm font-semibold">
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
