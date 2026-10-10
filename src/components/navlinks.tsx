
import Link from "next/link";

type Category = {
  slug: string;
  nameBn: string;
  image?: string;
  icon?: string;
};

const NavLinks = async () => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/categories`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await res.json();

  const navs: Category[] = Array.isArray(result)
    ? result
    : result.data;

  if (!Array.isArray(navs)) {
    console.error("Invalid categories response:", result);
    return null;
  }

  return (
    <div className="border-t border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-8 py-2">
        {navs.map((n) => (
          <Link
            key={n.slug}
            href={`/categories/${n.slug}`}
            className="shrink-0 whitespace-nowrap text-sm text-gray-700 hover:text-green-600"
          >
            {n.image || n.icon || "🛒"} {n.nameBn}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavLinks;
