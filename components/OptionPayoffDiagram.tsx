"use client";

import { OptionsPayoffDiagramProps } from "@/types";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OptionPayoffDiagram = ({
  strikePrice,
  premium,
  option_type,
  isLong,
}: OptionsPayoffDiagramProps) => {
  // If premium is null, set it to 0
  const actualPremium = premium ?? 0;

  const data = [];
  const maxProfit = Infinity; // Maximum profit for a call option is theoretically unlimited
  const maxLoss = -actualPremium; // Maximum loss is limited to the premium paid

  if (isLong) {
    // Calculate payoff for a long position
    if (option_type === "call") {
      for (let price = 0; price <= strikePrice * 2; price += 5) {
        const payoff =
          strikePrice < price
            ? (price - strikePrice - actualPremium).toFixed(2)
            : -actualPremium;
        data.push({ underlyingPrice: price, payoff: payoff });
      }
    } else {
      for (let price = 0; price <= strikePrice * 2; price += 5) {
        const payoff =
          strikePrice > price
            ? (strikePrice - price - actualPremium).toFixed(2)
            : -actualPremium;
        data.push({ underlyingPrice: price, payoff: payoff });
      }
    }
  } else {
    // Calculate payoff for a short position
    if (option_type === "call") {
      for (let price = 0; price <= strikePrice * 2; price += 5) {
        const payoff =
          strikePrice > price
            ? actualPremium
            : (strikePrice - price + actualPremium).toFixed(2);
        data.push({ underlyingPrice: price, payoff: payoff });
      }
    } else {
      for (let price = 0; price <= strikePrice * 2; price += 5) {
        const payoff =
          strikePrice < price
            ? actualPremium
            : (price - strikePrice + actualPremium).toFixed(2);
        data.push({ underlyingPrice: price, payoff: payoff });
      }
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 30, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="underlyingPrice"
          label={{
            value: "Underlying Price ($)",
            position: "insideBottom",
            offset: -10,
          }}
        />
        <YAxis
          label={{
            value: "Profit ($)",
            angle: -90,
            position: "insideLeft",
            offset: -10,
          }}
          domain={["auto", "auto"]}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="payoff"
          stroke={isLong == true ? "#398378" : "#833944"}
          dot={{ r: 0 }}
          activeDot={{ r: 5 }}
          strokeWidth={4}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OptionPayoffDiagram;
