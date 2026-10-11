"use client";
import React from "react";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { authClient, signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const SignIn = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.danger(
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 font-bengali sm:px-6">
      <Form
        className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center"
        onSubmit={onSubmit}
      >
        <div className="mb-5 w-full max-w-95 text-center">
          <h1 className="text-[24px] font-bold leading-tight text-gray-900 sm:text-[26px]">
            সাইন ইন
          </h1>

          <p className="mt-1.5 text-[12px] leading-5 text-gray-500 sm:text-[13px]">
            আপনার অ্যাকাউন্টে প্রবেশ করুন ও চালিয়ে যান
          </p>
        </div>
        <div className="flex w-full flex-col max-w-95 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
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
            <Label className="mb-1.5 block text-[13px] font-medium text-gray-700">
              ইমেইল
            </Label>
            <Input
              placeholder="john@example.com"
              className="
              h-10
              w-full
              rounded-md
              border
              border-gray-200
              bg-white
              px-3
              text-[13px]
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-green-600
              focus:ring-2
              focus:ring-green-100
            "
            />
            <FieldError className="mt-1 text-[11px] text-red-500" />
          </TextField>
          <TextField
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              if (!/[A-Z]/.test(value)) {
                return "কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে";
              }
              if (!/[0-9]/.test(value)) {
                return "পাসওয়ার্ডে কমপক্ষে একটি সংখ্যা থাকতে হবে";
              }
              return null;
            }}
          >
            <Label className="mb-1.5 block text-[13px] font-medium text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="
              h-10
              w-full
              rounded-md
              border
              border-gray-200
              bg-white
              px-3
              text-[13px]
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-green-600
              focus:ring-2
              focus:ring-green-100
            "
            />

            <FieldError className="mt-1 text-[11px] text-red-500" />
          </TextField>
          <div className="mt-2 flex justify-end">
            <a
              href="/forgot-password"
              className="text-[11px] font-medium text-green-700 transition hover:text-green-800 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div>
          <Button
            type="submit"
            className="
            mt-4
            h-10
            w-full
            rounded-md
            bg-[#07883f]
            px-4
            text-[13px]
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#067536]
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
            focus:ring-offset-2
            active:scale-[0.99]
          "
          >
            সাইন ইন
          </Button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="shrink-0 text-[11px] text-gray-400">অথবা</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
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
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-green-700 hover:text-green-800 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </Form>

      <div className=" text-center">
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

export default SignIn;
