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
  const minPrice = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const maxPrice = Math.max(
    ...product.markets.map((market) => market.max)
  );

  const averagePrice =
    product.markets.length > 0
      ? product.markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / product.markets.length
      : 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4">
      {/* Product Summary Card */}
      <section className="rounded-xl border p-5">
        <div className="flex items-center gap-3">
          <span className="text-4xl">
            {product.image || product.categoryIcon}
          </span>

          <div>
            <h1 className="text-2xl font-bold">
              {product.nameBn}
            </h1>
            <p className="text-gray-500">
              {product.categoryNameBn} · {product.unit}
            </p>
          </div>
        </div>
      </section>

      {/* Price Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p>সর্বনিম্ন দাম</p>
          <h2 className="text-2xl font-bold">
            ৳{minPrice}
          </h2>
        </div>

        <div className="rounded-xl border p-4">
          <p>সর্বোচ্চ দাম</p>
          <h2 className="text-2xl font-bold">
            ৳{maxPrice}
          </h2>
        </div>

        <div className="rounded-xl border p-4">
          <p>গড় দাম</p>
          <h2 className="text-2xl font-bold">
            ৳{averagePrice.toFixed(2)}
          </h2>
        </div>
      </section>

      {/* Market Price Comparison */}
      <section className="overflow-x-auto rounded-xl border p-4">
        <h2 className="mb-4 text-xl font-bold">
          বাজারভিত্তিক দামের তুলনা
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">বাজার</th>
              <th className="p-3">বিভাগ</th>
              <th className="p-3">সর্বনিম্ন</th>
              <th className="p-3">সর্বোচ্চ</th>
            </tr>
          </thead>

          <tbody>
            {product.markets.map((market) => (
              <tr key={market.market} className="border-b">
                <td className="p-3">{market.market}</td>
                <td className="p-3">{market.division}</td>
                <td className="p-3">৳{market.min}</td>
                <td className="p-3">৳{market.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}