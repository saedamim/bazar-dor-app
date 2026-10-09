
import Link from "next/link";

type Category = {
  slug: string;
  nameBn: string;
};

type CategoryResponse = {
  data: Category[];
};

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result: CategoryResponse = await res.json();
  const navs = result;
console.log(navs);
  if (!Array.isArray(navs)) {
    throw new Error("Invalid categories API response");
  }

  return (
    <div className="bg-white border-t border-gray-200 ">

    <nav className="flex max-w-7xl mx-auto  gap-4 py-2 px-8">
      {navs.map((n) => (
        <Link key={n.slug} href={`/${n.slug}`}>
         {n.icon}{" "}{n.nameBn}
        </Link>
      ))}
    </nav>
      </div>
  );
};

export default NavLinks;