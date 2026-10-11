import { Suspense } from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
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
}

type Props = {
  params: Promise<{ slug: string }>;
};

async function ProductDetails({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.API_BASE_URL}/products/${encodeURIComponent(slug)}`,
    { cache: "no-store" },
  );
   console.log(res)
  if (!res.ok) {
    return <p className="p-5">পণ্যের তথ্য পাওয়া যায়নি।</p>;
  }

  const product = (await res.json()) as Product;
  const markets = product.markets ?? [];

  const minPrice =
    markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : 0;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : 0;

  return (
    <div className="rounded-2xl p-5 shadow">
      <p className="text-sm">{product.nameBn}</p>

      <p className="mt-2 text-2xl font-bold">
        {averagePrice.toLocaleString("bn-BD", {
          maximumFractionDigits: 2,
        })}{" "}
        <span className="text-base font-normal">টাকা</span>
      </p>

      <p className="mt-2 text-xs text-gray-500">
        সর্বনিম্ন {minPrice.toLocaleString("bn-BD")} টাকা •{" "}
        {product.categoryNameBn}
      </p>
    </div>
  );
}

export default function ProductDetailsPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <p className="p-5 text-center">পণ্যের তথ্য লোড হচ্ছে...</p>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}