import { GiShoppingCart } from "react-icons/gi";


interface Product {
  id: string | number;
  image?: string | null;
  nameBn: string;
  today: number | string;
  unit: string;
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
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data: Product[] = (await res.json()) as Product[];
    console.log(data);
    const products: Product[] = data;
    return (
       
<div className="w-full overflow-hidden border-y border-base-300 bg-base-200 py-3">
  <div className="price-ticker-track">
    {[0, 1].map((copy: number) => (
      <div
        key={copy}
        aria-hidden={copy === 1}
        className="flex shrink-0 items-center"
      >
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="flex shrink-0 items-center gap-2 px-5 text-sm"
          >
            <span>{product.image || <GiShoppingCart />}</span>
            <span className="font-semibold">{product.nameBn}</span>
            <span className="whitespace-nowrap">
              ৳{product.today}/{getUnit(product.unit)}
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