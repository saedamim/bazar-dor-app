import Loader from "@/components/loader";
import Link from "next/link";
import { Suspense } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.API_BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

async function Categories() {
  const categories = await getCategories();
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-green-700">
            Bazardor
          </p>

          <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
            বাজারের ক্যাটাগরি
          </h1>

          <p className="mt-4 text-slate-600">
            আপনার প্রয়োজনীয় পণ্যের ক্যাটাগরি বেছে নিন।
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl transition group-hover:bg-green-100">
                {category.icon}
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-green-700">
                {category.nameBn}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                এই ক্যাটাগরির পণ্য ও বাজারদর দেখুন।
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-semibold text-green-700">
                  পণ্য দেখুন
                </span>

                <span className="text-lg text-green-700 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
export default async function CategoriesPage() {
  return (
    <Suspense fallback={<Loader className="min-h-screen" message="ক্যাটাগরি লোড হচ্ছে..."/>}>
      <Categories />
    </Suspense>
  );
}
