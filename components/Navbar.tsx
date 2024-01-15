import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1140px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.png"
            alt="Options Hub Logo"
            width={200}
            height={55}
            className="object-contain"
          />
        </Link>

        <CustomButton
          title="Sign In"
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
        />
      </nav>
    </header>
  );
};

export default Navbar;
