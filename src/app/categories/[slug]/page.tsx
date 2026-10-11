import { Suspense } from "react";
import ProductSection from "@/components/productsection";
import { notFound } from "next/navigation";
import Loader from "@/components/loader";

type Props = {
  params: Promise<{ slug: string }>;
};

export const instant = false;


async function CategoryContent({params}:Props){
  const {slug} =await params;
  const res = await fetch(
    `${process.env.API_BASE_URL}/products?category=${encodeURIComponent(slug)}`,
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
  console.log(products);
  return <ProductSection products={products} />;
}

export default async function CategoryPage({ params }: Props) {


  return (
    <Suspense fallback={<Loader />}>
      <CategoryContent params={params} />
      
    </Suspense>
  );
}