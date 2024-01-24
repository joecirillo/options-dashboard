"use client";

import React from "react";

import { useState } from "react";
import { SearchTickerSymbol } from ".";
import SearchTicker from "./SearchTicker";

const SearchBar = () => {
  const [ticker, setTicker] = useState("");
  const handleSearch = () => {};

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchTicker ticker={ticker} setTicker={setTicker} />
      </div>
    </form>
  );
};

export default SearchBar;
