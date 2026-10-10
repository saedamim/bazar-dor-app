"use client";

import React, { useState } from "react";
import {
  Button,
  // Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const toast = {
  error: (message: string) => window.alert(message),
  success: (message: string) => window.alert(message),
};

const SignUpPage = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!name || name.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("অন্তত একটি বড় হাতের অক্ষর দিন");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("অন্তত একটি ছোট হাতের অক্ষর দিন");
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.error("অন্তত একটি সংখ্যা দিন");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      toast.error("অন্তত একটি বিশেষ চিহ্ন দিন");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
        // autoSignIn: false,
      });

      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
        return;
      }

      // Better Auth-এর default signup data-তে image পাঠানো হয় না।
      // Image URL প্রয়োজন হলে signup-এর পরে profile update করতে হবে।
      if (image.trim()) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। প্রোফাইল ছবিটি পরে সেট করতে পারবেন।");
      } else {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।");
      }

      router.push("/login");
      router.refresh();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.error(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি`);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 font-bengali sm:px-6">
      <Form
        className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center"
        onSubmit={onSubmit}
      >
        <div className="mb-5 w-full max-w-[380px] text-center">
          <h1 className="text-[24px] font-bold leading-tight text-gray-900 sm:text-[26px]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1.5 text-[12px] leading-5 text-gray-500 sm:text-[13px]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
          </p>
        </div>

        <div className="flex w-full max-w-[380px] flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <TextField name="image" type="url">
            <Label className="mb-1.5 block text-[13px] font-medium text-gray-700">
              প্রোফাইল ছবির URL
            </Label>
            <Input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
            <FieldError className="mt-1 text-[11px] text-red-500" />
          </TextField>

          <TextField
            name="name"
            validate={(value) => {
              if (!value.trim()) return "আপনার নাম লিখুন";
              if (value.trim().length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="mb-1.5 mt-3 block text-[13px] font-medium text-gray-700">
              নাম
            </Label>
            <Input
              name="name"
              placeholder="যেমন: রহিম উদ্দিন"
              className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
            <FieldError className="mt-1 text-[11px] text-red-500" />
          </TextField>

          <TextField
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা লিখুন";
              }
              return null;
            }}
          >
            <Label className="mb-1.5 mt-3 block text-[13px] font-medium text-gray-700">
              ইমেইল
            </Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
            <FieldError className="mt-1 text-[11px] text-red-500" />
          </TextField>

          <TextField
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              if (!/[A-Z]/.test(value)) return "অন্তত একটি বড় হাতের অক্ষর দিন";
              if (!/[a-z]/.test(value)) return "অন্তত একটি ছোট হাতের অক্ষর দিন";
              if (!/[0-9]/.test(value)) return "অন্তত একটি সংখ্যা দিন";
              if (!/[^A-Za-z0-9]/.test(value)) return "অন্তত একটি বিশেষ চিহ্ন দিন";
              return null;
            }}
          >
            <Label className="mb-1.5 mt-3 block text-[13px] font-medium text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
            <FieldError className="mt-1 text-[11px] text-red-500" />
          </TextField>

          <TextField
            name="confirmPassword"
            type="password"
            validate={(value) => {
              if (!value) return "পাসওয়ার্ড আবার লিখুন";
              if (value !== password) return "দুটি পাসওয়ার্ড মিলছে না";
              return null;
            }}
          >
            <Label className="mb-1.5 mt-3 block text-[13px] font-medium text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার লিখুন"
              className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
            <FieldError className="mt-1 text-[11px] text-red-500" />
          </TextField>

          <Button
            type="submit"
            isDisabled={isLoading}
            className="mt-5 h-10 w-full rounded-md bg-green-700 px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="shrink-0 text-[11px] text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onPress={() => handleSocialSignIn("google")}
              className="h-9 rounded-md border border-gray-200 bg-white text-[10px] text-gray-700 hover:bg-gray-50"
            >
              <FcGoogle className="mr-1" />
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              onPress={() => handleSocialSignIn("github")}
              className="h-9 rounded-md border border-gray-200 bg-white text-[10px] text-gray-700 hover:bg-gray-50"
            >
              <FaGithub className="mr-1" />
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          <p className="mt-5 text-center text-[11px] text-gray-500">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-700 hover:text-green-800 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </Form>

      <div className="mt-2 text-center">
        <Link
          href="/"
          className="text-[10px] text-gray-400 hover:text-gray-600"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
