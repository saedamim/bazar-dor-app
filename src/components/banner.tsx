import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";

const Banner = async () => {
  
  await connection();
     const currentDate = new Date();
  return (
    <div className="grid items-center max-w-6xl mx-auto gap-8 px-6 py-12 md:grid-cols-2">
      <div>
        <p className="mb-4 inline-block rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
          {currentDate.toLocaleDateString("bn-BD", {
  weekday:"long",          
  day: "numeric",
  month: "long",
  year: "numeric",
})}

        </p>

        <h2 className="text-3xl font-bold">
          আজকের বাজারের দাম এক নজরে
        </h2>

        <p className="mt-4 text-base-content/70">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <Link
          href="#all-products"
          className="btn mt-6 rounded-xl bg-green-700 px-4 py-2 text-white"
        >
          সব পণ্য দেখুন
        </Link>
      </div>

      <div>
        <Image
          src="/bazar-hero.png"
          alt="Bazar Hero"
          width={200}
          height={100}
          loading="eager"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
};

export default Banner;
