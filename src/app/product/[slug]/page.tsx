import Loader from "@/components/loader";
import PriceCompare from "@/components/pricecompare";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

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

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/sign-in`);
  }
  const productsRes = await fetch(
    `${process.env.API_BASE_URL}/products/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!productsRes.ok) {
    throw new Error("Failed to fetch products");
  }

  const product = await productsRes.json();

  return <PriceCompare product={product} />;
}

export default async function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <Loader className="min-h-screen" message="ক্যাটাগরি লোড হচ্ছে..." />
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}
