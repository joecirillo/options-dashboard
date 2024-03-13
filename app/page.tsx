import { Banner, OptionCard } from "@/components";
import Image from "next/image";
import { SearchBar } from "@/components";
import { CustomFilter } from "@/components";
import { OptionExpiration } from "@/types";
import {
  decodeOptionsData,
  decodeLookupCompany,
  getLookupCompany,
  getOptionsChain,
  decodeQuotes,
} from "@/utils";

export default async function Home({ searchParams }) {
  const optionsChain = await decodeOptionsData({
    stock: searchParams.ticker || "AAPL",
    expiration: searchParams.expiration || "2024-04-19",
  });

  //const lookupCompany = await getLookupCompany();
  // const lookup = await decodeLookupCompany();
  const stockPrice = await decodeQuotes(searchParams.ticker || "AAPL");
  // const clock = await fetchClock();

  // console.log(decodeLookupCompany());

  const isDataEmpty =
    typeof optionsChain != "object" || Object.keys(optionsChain).length === 0;

  // console.log("Companies" + lookupCompany);
  // console.log(clock);

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
