import { FaCaretUp } from "react-icons/fa";
import { IoCaretDown } from "react-icons/io5";

async function PriceDrop() {
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
const res = await fetch(
  `${process.env.API_BASE_URL}/products`,
  { cache: "no-store" },
);

if (!res.ok) {
  throw new Error("Failed to fetch products");
}

const result = (await res.json()) as Product[] | { data?: Product[] };

const products = (Array.isArray(result) ? result : (result.data ?? []))
  .filter((p: Product) => p.change?.dir === "down")
  .sort(
    (a: Product, b: Product) =>
      Number(a.change?.pct ?? 0) - Number(b.change?.pct ?? 0),
  )
  .slice(0, 6);

  return (
    <section className=" max-w-7xl mx-auto my-10">
      <h2 className="mb-5 text-xl font-bold text-gray-800">
        <span className="text-green-600"><IoCaretDown /></span> আজ দাম কমেছে
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl shadow bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{p.image}</span>
              <div>
                <h3 className="font-semibold">{p.nameBn}</h3>
                <p className="text-xs text-gray-500">
                  প্রতি {p.unit === "kg" ? "কেজি" : p.unit}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <div>
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <p className="text-lg font-bold">
                  {p.today.toLocaleString("bn-BD")} টাকা
                </p>
              </div>
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
                  "-- ০.০%"
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

export default PriceDrop;

