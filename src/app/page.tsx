import AllProducts from "@/components/allproducts";
import Banner from "@/components/banner";
import Loader from "@/components/loader";
import PriceDrop from "@/components/pricedrop";
import PriceIncreased from "@/components/priceincrease";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<Loader message="" className="min-h-screen"/>}>
        <Banner />
        <PriceIncreased />
        <PriceDrop />
        <AllProducts />
      </Suspense>
    </div>
  );
}
