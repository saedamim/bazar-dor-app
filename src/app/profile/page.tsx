/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { FcBusinessman } from "react-icons/fc";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/sign-in");
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  async function handleUpdate() {
    if (!name.trim()) return;

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
      });

      if (!result.error) {
        setName("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await authClient.signOut();
    router.replace("/sign-in");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>

        <p className="mt-2 text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <section className="mt-7 flex flex-col items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row">
          {user?.image ? (
            <img
              src={user.image}
              alt="Profile"
              width={150}
              height={150}
              className="h-20 w-20 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 text-3xl">
              <FcBusinessman />
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
            <p className="mt-1 text-gray-500">{user?.email}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="rounded-lg border border-red-400 px-4 py-2 text-red-600 hover:bg-red-50"
          >
            সাইন আউট
          </button>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900">তথ্য</h2>

          <label className="mt-6 block text-sm text-gray-700">নাম</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={name}
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
          />

          <button
            onClick={handleUpdate}
            disabled={loading || !name.trim()}
            className="mt-4 w-full rounded-lg bg-green-700 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </section>
      </div>
    </main>
  );
}
