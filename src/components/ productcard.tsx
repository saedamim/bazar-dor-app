import { IoCaretUpOutline } from "react-icons/io5";
import Link from "next/link";
import { IoCaretDown } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
interface Product {
  id: string | number;
  nameBn: string;
  unit: string;
  today: number | string;
  change: number | string;
  image?: string | null;
}

interface ProductCardProps {
  product: Product;
}

const getUnit = (unit: string): string => {
  const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    gm: "প্রতি গ্রাম",
    g: "প্রতি গ্রাম",
    ltr: "প্রতি লিটার",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    ml: "প্রতি মিলিলিটার",
    pcs: "প্রতি পিস",
    pc: "প্রতি পিস",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    pkt: "প্রতি প্যাকেট",
    packet: "প্রতি প্যাকেট",
  };

  return unitMap[unit.trim().toLowerCase()] ?? `প্রতি ${unit}`;
};

const formatPrice = (price: number | string): string => {
  return Number(price).toLocaleString("bn-BD");
};

const ProductCard = ({ product }: ProductCardProps) => {
  const change = Number(product.change);
  const isUp = change > 0;
  const isDown = change < 0;

  return (
    <Link
      href={`/details/${product.id}`}
      className="card border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="card-body gap-3 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex size-14 items-center justify-center rounded-xl bg-base-200 text-3xl">
            {product.image || <GiShoppingCart />}
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isUp
                ? "bg-green-100 text-green-700"
                : isDown
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {isUp ? <IoCaretUpOutline /> : isDown ? <IoCaretDown /> : "—"}
            {" "}
            {formatPrice(Math.abs(change))}%
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-base-content">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-sm text-base-content/60">
            {getUnit(product.unit)}
          </p>
        </div>

        <div className="border-t border-base-300 pt-3">
          <p className="text-xs text-base-content/60">আজকের দাম</p>

          <p className="mt-1 text-xl font-bold text-base-content">
            {formatPrice(product.today)} টাকা
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

