import { Suspense } from "react";
import ProductSection from "@/components/productsection";
import { notFound } from "next/navigation";
import Loader from "@/components/loader";

type Props = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

async function CategoryContent({ slug }: { slug: string }) {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();
  const products = Array.isArray(result) ? result : result.data;

  if (!Array.isArray(products)) {
    throw new Error("Invalid products API response");
  }

  if (products.length === 0) {
    notFound();
  }

  return <ProductSection products={products} />;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  return (
    <Suspense fallback={<Loader />}>
      <CategoryContent slug={slug} />
    </Suspense>
  );
}