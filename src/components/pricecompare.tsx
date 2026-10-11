
import Link from "next/link";
import { FaCaretUp, FaSortDown } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
};

type PriceCompareProps = {
  product: Product;
};

export default function PriceCompare({
  product,
}: PriceCompareProps) {
  const markets = product.markets ?? [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) =>
          total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : 0;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const priceDifference = Math.abs(
    product.today - product.yesterday
  );

  const toBangla = (value: number, decimals = 0) =>
    value.toLocaleString("bn-BD", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const unitBn =
    product.unit === "kg" ? "কেজি" : product.unit;

  const unitLabel = `প্রতি ${unitBn}`;

  const changeMessage =
    priceDifference === 0
      ? "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
      : `গতকালের তুলনায় আজ দাম ${
          isUp ? "বেড়েছে" : "কমেছে"
        } · ${toBangla(priceDifference)} টাকা`;

  return (
    <main className="min-h-screen bg-green-50 py-5 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6 px-4 md:px-6">
       
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span><IoIosArrowForward/></span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span><IoIosArrowForward /></span>

          <span className="font-medium">
            {product.nameBn}
          </span>
        </nav>

        <section className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white/75 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
          <div className="flex items-center gap-4">
        
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-4xl md:h-24 md:w-24">
              {product.image || product.categoryIcon}
            </div>

        
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold text-gray-600 md:text-3xl">
                {product.nameBn}
              </h1>

              <p className="text-sm text-gray-500">
                {unitLabel} · {product.categoryNameBn}
              </p>

              <p className="text-sm font-medium text-gray-700">
                {changeMessage}
              </p>
            </div>
          </div>

          <div className="flex min-w-36 flex-col items-center justify-center rounded-2xl bg-gray-100 px-6 py-4 text-center sm:self-center">
            <p className="text-sm text-gray-500">
              আজকের দাম
            </p>

            <h2 className="mt-1 text-3xl font-bold text-shadow-green-950">
              {toBangla(product.today)}
            </h2>

            <p className="text-sm text-gray-500">
              টাকা / {unitBn}
            </p>

            <p
              className={`mt-2 text-sm font-semibold ${
                isUp
                  ? "text-red-500"
                  : isDown
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {isUp ?<FaCaretUp />: isDown ? <FaSortDown />: "—"}{" "}
              {toBangla(product.change.pct, 1)}%
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-300 bg-white p-4 md:p-5">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
         
            <div className="rounded-2xl border shadow border-gray-400 p-5">
              <p className="text-sm text-gray-600">
                সর্বনিম্ন দাম
              </p>

              <h3 className="mt-1 text-2xl font-bold text-green-600">
                {toBangla(minPrice)}
                <span className="ml-1 text-base font-medium">
                  টাকা
                </span>
              </h3>

              <p className="mt-1 text-xs text-gray-700">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-gray-400 p-5">
              <p className="text-sm text-gray-600">
                সর্বোচ্চ দাম
              </p>

              <h3 className="mt-1 text-2xl font-bold text-red-600">
                {toBangla(maxPrice)}
                <span className="ml-1 text-base font-medium">
                  টাকা
                </span>
              </h3>

              <p className="mt-1 text-xs text-gray-700">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            
            <div className="rounded-2xl border border-gray-400 p-5">
              <p className="text-sm text-gray-700">
                গড় দাম
              </p>

              <h3 className="mt-1 text-2xl font-bold text-green-600">
                {toBangla(averagePrice)}
                <span className="ml-1 text-base font-medium">
                  টাকা
                </span>
              </h3>

              <p className="mt-1 text-xs text-gray-700">
                {unitLabel}-এর হিসাবে
              </p>
            </div>
          </div>

          <div className="mt-7">
            <h2 className="mb-4 text-lg font-bold text-gray-600">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-gray-300">
              <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-black text-gray-600">
                    <th className="px-4 py-4 font-semibold">
                      বাজার
                    </th>
                    <th className="px-4 py-4 font-semibold">
                      বিভাগ
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বোচ্চ
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage =
                      (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-b border-gray-300 last:border-b-0 ${
                          index % 2 === 0
                            ? "bg-green-50"
                            : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-3.5 font-medium text-gray-600">
                          {market.market}
                        </td>

                        <td className="px-4 py-3.5 text-gray-700">
                          {market.division}
                        </td>

                        <td className="px-4 py-3.5 text-right text-gray-700">
                          {toBangla(market.min)} টাকা
                        </td>

                        <td className="px-4 py-3.5 text-right text-gray-700">
                          {toBangla(market.max)} টাকা
                        </td>

                        <td className="px-4 py-3.5 text-right font-semibold text-gray-600">
                          {toBangla(marketAverage, 2)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {markets.length === 0 && (
                <p className="p-6 text-center text-gray-500">
                  কোনো বাজারের তথ্য পাওয়া যায়নি।
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
