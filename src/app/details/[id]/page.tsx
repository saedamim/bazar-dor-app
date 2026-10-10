interface Product {
  id: string | number;
  nameBn: string;
  image?: string | null;
  today: number | string;
  unit: string;
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${id}`
  );

  if (!res.ok) {
    return <p>Product পাওয়া যায়নি।</p>;
  }

  const product: Product = await res.json();

  return (
    <main className="mx-auto max-w-5xl p-6">
      {product.image && (
        <img
          src={product.image}
          alt={product.nameBn}
          className="mb-4 h-64 w-full rounded-xl object-contain"
        />
      )}

      <h1 className="text-3xl font-bold">{product.nameBn}</h1>
      <p className="mt-2">প্রতি {product.unit}</p>
      <p className="mt-3 text-xl font-bold">
        {Number(product.today).toLocaleString("bn-BD")} টাকা
      </p>
    </main>
  );
}