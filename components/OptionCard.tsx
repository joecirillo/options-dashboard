"use client";

import { useState } from "react";
import Image from "next/image";
import React from "react";
import { CustomButton, OptionPayoffDiagram, OptionsDetails } from ".";
import { Option } from "@/types";

interface OptionCardProps {
  option: Option;
  stockPrice: number;
}

const OptionCard = ({ option, stockPrice }: OptionCardProps) => {
  const {
    description,
    bid,
    ask,
    last,
    underlying,
    strike,
    expiration_date,
    expiration_type,
    option_type,
  } = option;
  const [isLong, setIsLong] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const handleSwitch = () => {
    setIsLong(isLong === true ? false : true);
    console.log(isLong);
  };

  const isInTheMoney =
    (option_type === "call" &&
      (isLong ? strike < stockPrice : strike > stockPrice)) ||
    (option_type === "put" &&
      (isLong ? strike > stockPrice : strike < stockPrice));

  const isAtTheMoney = strike === stockPrice;

  const moneyness = isInTheMoney ? "ITM" : isAtTheMoney ? "ATM" : "OTM";

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">{description}</h2>
      </div>
      <p className="mt-6">
        <span className="self-end text-[32px] font-extrabold">
          ${last != null ? last.toFixed(2) : ask.toFixed(2)}{" "}
        </span>
        <span className="self-end text-[14px] font-medium">{option_type}</span>
      </p>

      <div className="relative w-full h-60 mt-6 flex justify-center items-center">
        <OptionPayoffDiagram
          strikePrice={strike}
          premium={last || ask}
          option_type={option_type}
          isLong={isLong}
        />
      </div>
      <CustomButton
        title={isLong === true ? "Long" : "Short"}
        containerStyles={
          isLong
            ? "bg-primary-green text-white rounded-full mt-10 w-full"
            : "bg-primary-red text-white rounded-full mt-10 w-full"
        }
        handleClick={handleSwitch}
      ></CustomButton>
      <div className="relative justify-between flex w-full mt-6">
        <div className="flex group-hover:invisible w-full justify-between">
          <div className="flex flex-col justify-center items-center gap-2">
            Moneyness
            <p className="text-[14px] leading-[17px]">{moneyness}</p>
          </div>
          <div className="car-card__icon">
            Current Underlying Price
            <p className="text-[14px] leading-[17px]">
              ${stockPrice.toFixed(2)}
            </p>
          </div>
          <div className="car-card__icon">
            Current Payoff
            <p className="text-[14px] leading-[17px]">
              {option_type === "call"
                ? isLong
                  ? `$${Math.max(
                      stockPrice - strike - (last ?? ask),
                      0
                    ).toFixed(2)}`
                  : `$${Math.max(
                      strike - stockPrice + (last ?? ask),
                      0
                    ).toFixed(2)}`
                : isLong
                ? `$${Math.max(strike - stockPrice - (last ?? ask), 0).toFixed(
                    2
                  )}`
                : `$${Math.max(stockPrice - strike + (last ?? ask), 0).toFixed(
                    2
                  )}`}
            </p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="More Details"
            containerStyles="w-full py-[16px] rounded-full mt-10 bg-black-100"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <OptionsDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        option={option}
      />
    </div>
  );
};

export default OptionCard;
