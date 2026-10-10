
import Banner from "@/components/banner";
import { Suspense } from "react";


export default function Home() {
  return (
    <div >
        <Suspense
  fallback={
    <div className="w-full py-4 text-center">
      পণ্যের দাম লোড হচ্ছে...
    </div>
  }
>
 
</Suspense>
<Banner />
    </div>
      
   
  );
}
