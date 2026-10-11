import { FaCaretUp } from "react-icons/fa";
import { IoCaretDown } from "react-icons/io5";

type Product = {
  id: number;
  nameBn: string;
  categoryIcon: string;
  image?: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
};

async function AllProducts() {
  const res = await fetch(`${process.env.API_BASE_URL}/products`, {
    cache: "no-store",
  });

  const data = await res.json();
  const products: Product[] = Array.isArray(data) ? data : (data.data ?? []);

  return (
    <section
      id="all-products"
      className=" max-w-7xl mx-auto my-10 scroll-mt-24"
    >
      <h2 className="mb-5 text-xl font-bold text-gray-800">সব পণ্য</h2>
      <p className="text-gray-600">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl  bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{p.image}</span>
              <div>
                <h3 className="font-semibold">{p.nameBn}</h3>
                <p className="text-xs text-gray-500">
                  প্রতি {p.unit === "kg" ? "কেজি" : p.unit}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-between">
              <span className="font-bold">
                {p.today.toLocaleString("bn-BD")} টাকা
              </span>
              <span
                className={
                  p.change.pct === 0
                    ? "text-black"
                    : p.change.dir === "down"
                      ? "text-green-600"
                      : "text-red-500"
                }
              >
                {p.change.pct === 0 ? (
                  "-- 00.0%"
                ) : (
                  <>
                    {p.change.dir === "down" ? <IoCaretDown /> : <FaCaretUp />}{" "}
                    {p.change.pct.toLocaleString("bn-BD")}%
                  </>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AllProducts;
