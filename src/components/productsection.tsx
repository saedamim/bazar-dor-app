"use client";

import { useState } from "react";

type Product = {
  id: number;
  nameBn: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  today: number;
  unit: string;
  image?: string;
  change?: {
    dir: string;
    pct: number;
  };
};

const banglaNumber = (num: number) =>
  Number(num).toLocaleString("bn-BD");

export default function ProductSection({
  products,
}: {
  products: Product[];
}) {
  const [sortBy, setSortBy] = useState("default");

  const filteredproduct = [...products].sort((a, b) => {
    if (sortBy === "low") return a.today - b.today;
    if (sortBy === "high") return b.today - a.today;
    return a.id - b.id;
  });

  return (
    <section className="min-h-screen bg-white px-4 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
            {products[0]?.categoryIcon || products[0]?.image || "🛒"}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {products[0]?.categoryNameBn || "পণ্য"}
            </h2>

            <p className="text-sm text-gray-500">
              {banglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">সাজান</span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">কম থেকে বেশি</option>
              <option value="high">বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        <p className="mb-4 text-sm text-gray-500">
          মোট {banglaNumber(filteredproduct.length)}টি পণ্য পাওয়া গেছে
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredproduct.map((product) => {
            const change = product.change?.pct ?? 0;
            const direction = product.change?.dir;

            return (
              <div
                key={product.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {product.nameBn}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {product.unit === "kg"
                        ? "প্রতি কেজি"
                        : product.unit}
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="mb-1 text-xs text-gray-400">
                      আজকের দাম
                    </p>

                    <h3 className="text-xl font-bold text-gray-800">
                      {banglaNumber(product.today)} টাকা
                    </h3>
                  </div>

                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      direction === "up"
                        ? "bg-red-50 text-red-500"
                        : direction === "down"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {direction === "up"
                      ? "▲"
                      : direction === "down"
                        ? "▼"
                        : "—"}{" "}
                    {banglaNumber(change)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}