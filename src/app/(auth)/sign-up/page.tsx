"use client";
import { useState, type FormEvent } from "react";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignUpPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const submittedPassword = formData.get("password")?.toString() ?? "";
    const submittedConfirmPassword =
      formData.get("confirmPassword")?.toString() ?? "";

    if (submittedPassword !== submittedConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Demo only: connect your signup API here.
    console.log({ name, email });
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex min-h-screen bg-green-50 items-center mt-5 justify-center px-4 py-10">
      <Form
        className="w-full  px-8 py-10  max-w-96"
        onSubmit={onSubmit}
      >
        <div className="mb-6 flex  items-center  flex-col justify-center">
          <Fieldset.Legend>
            <h2 className="text-xl font-bold">অ্যাকাউন্ট তৈরি করুন</h2>
          </Fieldset.Legend>

          <Description>
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </Description>
        </div>

        <FieldGroup className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
          <TextField
           
            name="name"
            validate={(value) => {
              if (!value.trim()) {
                return "আপনার নাম লিখুন";
              }
              if (value.trim().length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label>ImageURl</Label>
            <Input  name="image" type="url" className=" input" placeholder="Image"/>

            <Label> নাম</Label>
            <Input placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError />
          </TextField>

          <TextField  name="email" type="email">
            <Label>ইমেইল </Label>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField
            
            name="password"
            type="password"
            minLength={8}
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              if (!/[A-Z]/.test(value)) {
                return "অন্তত একটি ইংরেজি বড় হাতের অক্ষর দিন";
              }
              if (!/[a-z]/.test(value)) {
                return "অন্তত একটি ইংরেজি ছোট হাতের অক্ষর দিন";
              }
              if (!/[0-9]/.test(value)) {
                return "অন্তত একটি সংখ্যা দিন";
              }
              if (!/[^A-Za-z0-9]/.test(value)) {
                return "অন্তত একটি বিশেষ চিহ্ন দিন, যেমন @ বা #";
              }
              return null;
            }}
          >
            <Label>পাসওয়ার্ড</Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           
            <FieldError />
          </TextField>

          <TextField
            
            name="confirmPassword"
            type="password"
            validate={(value) => {
              if (!value) {
                return " আবার লিখুন";
              }
              if (value !== password) {
                return "দুটি পাসওয়ার্ড মিলছে না";
              }
              return null;
            }}
          >
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input
              placeholder="আবার লিখুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FieldError />
          </TextField>
        </FieldGroup>

        <Fieldset.Actions>
          <Button className="bg-green-600 text-white items-center" type="submit">
            অ্যাকাউন্ট তৈরি করুন
          </Button>
         
        </Fieldset.Actions>
      </Form>
    </div>
     
  );
};

export default SignUpPage;
