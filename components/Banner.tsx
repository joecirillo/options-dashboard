"use client";

import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";

const Banner = () => {
  const handleScroll = () => {};

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="banner__title">Discover the world of options trading</h1>

        <p className="banner__subtitle">
          Use the dashboard to search, filter, and understand the fundamentals.
        </p>

        <CustomButton
          title="Explore Options"
          containerStyles="bg-primary-green text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="banner__image-container">
        <div className="banner__image">
          <Image
            src="/circular-logo.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
