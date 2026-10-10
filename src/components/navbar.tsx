import Image from "next/image";
import { Suspense } from "react";
import NavLinks from "./navlinks";
import { connection } from "next/server";
import Link from "next/link";
const Navbar = async () => {
  await connection()

  return (
    <div className= " sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center py-2 px-8 max-w-7xl mx-auto">
        <div className="flex items-center  font-bold text-2xl gap-2  py-1 px-1">
          <Image
            src="/logo-icon.png"
            alt="Logo"
            width={32}
            height={32}
            className="bg-green-700 items-center py-1 px-1"
          />
          <div className="flex flex-col items-start">
            <h2>বাজার দর</h2>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString("bn-BD", {
                dateStyle: "full",
              })}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Link href="/sign-in"
           className="btn px-2 py-2 ">সাইন ইন </Link>
          <Link
    href="/sign-up"
    className="btn bg-green-700 px-2 py-2 rounded-xl text-white"
  >
    সাইন আপ
  </Link>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <NavLinks />
      </Suspense>
    </div>
  );
};

export default Navbar;
