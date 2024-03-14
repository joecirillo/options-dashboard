"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { useState } from "react";
import { SearchTickerSymbol } from ".";
import SearchTicker from "./SearchTicker";
import SearchExpiration from "./SearchExpiration";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-18 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={20}
      height={20}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [expiration, setExpiration] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ticker === "" && expiration === "") return alert("Please fill");

    updateSearchParams(ticker.toLowerCase(), expiration.toLowerCase());
  };

  const updateSearchParams = (ticker: string, expiration: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (ticker) {
      searchParams.set("ticker", ticker);
    } else {
      searchParams.set("ticker", ticker);
    }

    if (expiration) {
      searchParams.set("expiration", expiration);
    } else {
      searchParams.set("expiration", expiration);
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchTicker ticker={ticker} setTicker={setTicker} />
      </div>
      <div className="searchbar__item">
        <SearchExpiration
          expiration={expiration}
          setExpiration={setExpiration}
          ticker={ticker}
        ></SearchExpiration>
        <SearchButton otherClasses="max-sm:hidden" />
      </div>
    </form>
  );
};

export default SearchBar;
