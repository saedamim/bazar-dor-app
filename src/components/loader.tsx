export default function Loader({
  message = "পণ্যের দাম লোড হচ্ছে...",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-40 items-center justify-center gap-3 text-sm text-gray-500 ${className}`}
    >
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-green-600" />
      <p>{message}</p>
    </div>
  );
}
