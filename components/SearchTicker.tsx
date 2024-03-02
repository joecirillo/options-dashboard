"use client";

import React from "react";
import { SearchTickerProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { useState, Fragment } from "react";
import { tickers } from "@/constants";
import dynamic from "next/dynamic";
import { decodeLookupCompany } from "@/utils";

const SearchTicker = ({ ticker, setTicker }: SearchTickerProps) => {
  const [query, setQuery] = useState("");

  // const tickersAPI = await decodeLookupCompany();
  // console.log("What is this: \n" + tickersAPI);

  const filteredTickers =
    query === ""
      ? tickers
      : tickers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={ticker} onChange={setTicker}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[12px]">
            <Image
              src="/searchbar-symbol.png"
              width={25}
              height={20}
              className="ml-4"
              alt="searchbar symbol"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Enter a ticker symbol..."
            displayValue={(ticker: string) => ticker}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")} // Reset the search query after the transition completes
          >
            <Combobox.Options
              className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              static
            >
              {filteredTickers.map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) =>
                    `relative search-manufacturer__option ${
                      active ? "bg-primary-green text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>

                      {/* Show an active green background color if the option is selected */}
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-pribg-primary-purple"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchTicker;
