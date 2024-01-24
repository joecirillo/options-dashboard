import { Banner } from "@/components";
import Image from "next/image";
import { SearchBar } from "@/components";
import { CustomFilter } from "@/components";

export default function Home() {
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
          <div className="home__filter-container">
            <CustomFilter title="ticker" />
            <CustomFilter title="ticker" />
          </div>
        </div>
      </div>
    </main>
  );
}
