import { FaCaretUp } from "react-icons/fa";

type Product = {
  id: string | number;
  categoryIcon?: string;
  image?: string;
  nameBn?: string;
  unit?: string;
  today?: number | string;
  change?: {
    dir?: string;
    pct?: number;
  };
};

async function PriceIncreased() {
  const res = await fetch(`${process.env.API_BASE_URL}/products`, {
    cache: "no-store",
  });

  const result = (await res.json()) as Product[] | { data?: Product[] };
  const products = (Array.isArray(result) ? result : (result.data ?? []))
    .filter((p: Product) => p.change?.dir === "up")
    .sort(
      (a: Product, b: Product) =>
        Number(b.change?.pct ?? 0) - Number(a.change?.pct ?? 0),
    )
    .slice(0, 6);

  return (
    <section className=" max-w-7xl  mx-auto my-10">
      <h2 className="mb-5 text-xl font-bold text-gray-900">
        <span className="text-red-500">
          <FaCaretUp />
        </span>{" "}
        আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p: Product) => (
          <div key={p.id} className="rounded-xl  bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                {p.image}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-800">{p.nameBn}</h3>
                <p className="text-xs text-gray-500">
                  প্রতি{" "}
                  {p.unit === "kg"
                    ? "কেজি"
                    : p.unit === "liter"
                      ? "লিটার"
                      : p.unit === "piece"
                        ? "পিস"
                        : p.unit === "dozen"
                          ? "ডজন"
                          : p.unit === "pkt"
                            ? "প্যাকেট"
                            : p.unit === "box"
                              ? "বক্স"
                              : p.unit}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <p className="text-lg font-bold text-gray-800">
                  {p.today ?? 0} টাকা
                </p>
              </div>

              <span className="text-sm text-red-500">
                <FaCaretUp />
                {p.change?.pct ?? 0}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PriceIncreased;
