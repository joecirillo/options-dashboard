import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchTickerProps {
  ticker: string;
  setTicker: (ticker: string) => void;
}

export interface Security {
  symbol: string;
  exchange: string;
  type: string;
  description: string;
}

export interface SecuritiesData {
  securities: {
    security: Security[];
  };
}
export interface Option {
  symbol: string;
  description: string;
  exch: string;
  type: string;
  last: number | 0;
  change: number | null;
  volume: number;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  bid: number;
  ask: number;
  underlying: string;
  strike: number;
  change_percentage: number | null;
  average_volume: number;
  last_volume: number;
  trade_date: number;
  prevclose: number;
  week_52_high: number;
  week_52_low: number;
  bidsize: number;
  bidexch: string;
  bid_date: number;
  asksize: number;
  askexch: string;
  ask_date: number;
  open_interest: number;
  contract_size: number;
  expiration_date: string;
  expiration_type: string;
  option_type: string;
  root_symbol: string;
}

export interface OptionsData {
  options: {
    option: Option[];
  };
}

export interface OptionsPayoffDiagramProps {
  strikePrice: number;
  premium: number | null;
  option_type: string;
  isLong: boolean;
}

export interface OptionExpiration {
  stock: string;
  expiration: string;
}
