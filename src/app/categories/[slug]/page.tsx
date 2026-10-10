
import Link from "next/link";
import { notFound } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Product {
  id: string | number;
  nameBn?: string;
  name?: string;
  image?: string;
  unit?: string;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  priceMin?: number;
  priceMax?: number;
  priceAvg?: number;
}

async function getCategory(slug: string): Promise<Category | null> {
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/categories/${slug}`,
    { cache: "no-store" }
  );

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  return res.json();
}

async function getProducts(slug: string): Promise<Product[]> {
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/categories"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← সব ক্যাটাগরি
        </Link>

        <section className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl">
              {category.icon}
            </div>

            <div>
              <p className="text-sm font-medium text-green-700">
                বাজারদর ক্যাটাগরি
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
                {category.nameBn}
              </h1>
            </div>
          </div>

          <p className="mt-4 text-slate-600">
            {category.nameBn} ক্যাটাগরির পণ্য ও বাজারদর দেখুন।
          </p>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {category.nameBn} এর পণ্য
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                এই ক্যাটাগরির পণ্যসমূহ
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
              {products.length} টি পণ্য
            </span>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-slate-600">
                এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => {
                const name =
                  product.nameBn ?? product.name ?? "পণ্যের নাম";

                const minPrice =
                  product.minPrice ?? product.priceMin;

                const maxPrice =
                  product.maxPrice ?? product.priceMax;

                const avgPrice =
                  product.avgPrice ?? product.priceAvg;

                return (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={name}
                        className="h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-44 items-center justify-center bg-green-50 text-5xl">
                        {category.icon}
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900">
                        {name}
                      </h3>

                      {product.unit && (
                        <p className="mt-1 text-sm text-slate-500">
                          একক: {product.unit}
                        </p>
                      )}

                      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
                        {avgPrice != null && (
                          <p className="flex justify-between gap-2">
                            <span className="text-slate-500">
                              গড় দাম
                            </span>
                            <span className="font-bold text-green-700">
                              ৳{avgPrice}
                            </span>
                          </p>
                        )}

                        {minPrice != null && (
                          <p className="flex justify-between gap-2">
                            <span className="text-slate-500">
                              সর্বনিম্ন
                            </span>
                            <span>৳{minPrice}</span>
                          </p>
                        )}

                        {maxPrice != null && (
                          <p className="flex justify-between gap-2">
                            <span className="text-slate-500">
                              সর্বোচ্চ
                            </span>
                            <span>৳{maxPrice}</span>
                          </p>
                        )}
                      </div>

                      <Link
                        href={`/product/${product.id}`}
                        className="mt-5 block rounded-lg bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        বিস্তারিত দেখুন →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}