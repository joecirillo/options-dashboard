"use client";
import { SearchExpirationProps } from "@/types";
import { getExpirations } from "@/utils";
import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";

const SearchExpiration = ({
  expiration,
  setExpiration,
  ticker,
}: SearchExpirationProps) => {
  const [expirations, setExpirations] = useState<string[]>([]);

  useEffect(() => {
    setExpiration("Select an expiration...");
  }, []);

  useEffect(() => {
    async function fetchTickers() {
      console.log("Ticker: " + ticker);
      try {
        const expirationDates = await getExpirations(ticker);
        setExpirations(expirationDates);
        console.log(expirations);
      } catch (error) {
        console.error(`Error fetching ticker ${ticker}`, error);
      }
    }

    fetchTickers();
  }, [ticker]);

  return (
    <div className="w-fit">
      <Listbox value={expiration} onChange={(e) => setExpiration(e)}>
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{expiration}</span>
            <Image
              src="/dropdown.png"
              width={25}
              height={25}
              className=""
              alt="dropdown"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {expirations.length === 0
                ? "No options available. Please select another stock."
                : expirations.map((expirationDate: string) => (
                    <Listbox.Option
                      key={expirationDate}
                      className={({ active }) =>
                        `relative cursor-defualt select-none py-2 px-4 ${
                          active
                            ? "bg-primary-green text-white"
                            : "text-gray-900"
                        }`
                      }
                      value={expirationDate}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {expirationDate}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SearchExpiration;
