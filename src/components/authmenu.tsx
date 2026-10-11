
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcBusinessman } from "react-icons/fc";

export default function AuthMenu() {
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await authClient.signOut();

    if (error) return;

    setIsOpen(false);
    router.replace("/sign-in");
    router.refresh();
  }

  if (isPending) return null;

  return (
    <div className="relative">
      {session?.user ? (
        <>
          {/* Avatar + Name */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="flex items-center gap-2 rounded-xl p-2 transition hover:bg-green-50"
          >
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 rounded-full border border-gray-200 object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-2xl">
                <FcBusinessman />
              </span>
            )}

            <span className="max-w-28 truncate font-semibold text-gray-800">
              {session.user.name || "প্রোফাইল"}
            </span>

            <span className="text-sm text-gray-500">
              {isOpen ? "▲" : "▼"}
            </span>
          </button>

          {/* Dropdown Popup */}
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              {/* User information */}
              <div className="flex items-center gap-3 border-b border-gray-100 p-4">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={48}
                    height={48}
                    unoptimized
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-3xl">
                    <FcBusinessman />
                  </span>
                )}

                <div className="min-w-0">
                  <p className="truncate font-bold text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {session.user.email}
                  </p>
                </div>
              </div>

              {/* Profile link */}
              <div className="p-2">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                >
                  <span>👤</span>
                  <span>আমার প্রোফাইল</span>
                </Link>

                {/* Sign out */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                >
                  <span>↪</span>
                  <span>সাইন আউট</span>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="btn px-2 py-2">
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="btn rounded-xl bg-green-700 px-2 py-2 text-white"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
}
