import { Banner, OptionCard } from "@/components";
import Image from "next/image";
import { SearchBar } from "@/components";
import { CustomFilter } from "@/components";
import { HomeProps, OptionExpiration, SearchProps } from "@/types";
import { getQuotes } from "@/utils/api/getQuotes";
import { lookupCompany } from "@/utils/api/lookupCompany";
import { getOptionsData } from "@/utils/api/getOptionsData";
import { getExpirations } from "@/utils/api/getExpirations";

export default async function Home({ searchParams }: HomeProps) {
  const optionsChain = await getOptionsData({
    stock: searchParams.ticker || "AAPL",
    expiration: searchParams.expiration || "2024-04-19",
  });

  const stockPrice = await getQuotes(searchParams.ticker || "AAPL");
  const expirationDates = await getExpirations(searchParams.ticker || "AAPL");

  const isDataEmpty =
    typeof optionsChain != "object" || Object.keys(optionsChain).length === 0;

  return (
    <main className="overflow-hidden">
      <Banner />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Options Catalogue</h1>
          <p>Explore options and their prices</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container"></div>
        </div>
      </div>

      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {optionsChain?.map((option: any) => (
              <OptionCard option={option} stockPrice={parseFloat(stockPrice)} />
            ))}
          </div>
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
        </div>
      )}
    </main>
  );
}
