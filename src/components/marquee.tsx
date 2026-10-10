import { GiShoppingCart } from "react-icons/gi";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

interface Product {
  id: string | number;
  image?: string | null;
  nameBn: string;
  today: number | string;
  unit: string;
  change?: {
    dir: string;
    pct: number;
  };
}

const getUnit = (unit: string): string => {
  const normalizedUnit = unit?.trim().toLowerCase() ?? "";

  const unitMap: Record<string, string> = {
    kg: "kg",
    gm: "gm",
    g: "gm",
    ltr: "ltr",
    liter: "ltr",
    litre: "ltr",
    ml: "ml",
    pcs: "pcs",
    pc: "pcs",
    piece: "pcs",
    pkt: "pkt",
    packet: "pkt",
    box: "box",
  };

  return unitMap[normalizedUnit] ?? normalizedUnit;
};

const Marquee = async (): Promise<React.ReactElement> => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await res.json();

  const products: Product[] = Array.isArray(data) ? data : (data.data ?? []);

  return (
    <div className="w-full overflow-hidden border-y border-base-300 bg-base-200 py-3">
      <div className="price-ticker-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex shrink-0 items-center gap-2 px-5 text-sm"
              >
                <span>{product.image || <GiShoppingCart />}</span>

                <span className="font-semibold">{product.nameBn}</span>

                <span className="whitespace-nowrap">
                  ৳{product.today}/{getUnit(product.unit)}
                </span>

                <span
                  className={`flex items-center whitespace-nowrap font-semibold ${
                    product.change?.pct === 0
                      ? "text-gray-500"
                      : product.change?.dir === "down"
                        ? "text-green-600"
                        : "text-red-500"
                  }`}
                >
                  {product.change?.pct === 0 ? (
                    "-- 0.0%"
                  ) : product.change ? (
                    <>
                      {product.change.dir === "down" ? (
                        <FaCaretDown />
                      ) : (
                        <FaCaretUp />
                      )}
                      {Math.abs(product.change.pct).toFixed(1)}%
                    </>
                  ) : (
                    "-- 0.0%"
                  )}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
