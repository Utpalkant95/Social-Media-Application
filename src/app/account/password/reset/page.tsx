"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .trim(),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits long")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

function ProfileForm() {
  const [showHidePassword, setShowHidePassword] = useState<"text" | "password">(
    "password"
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="w-full relative">
      <h2 className="text-black font-medium text-center mb-4">
        Trouble logging in?
      </h2>
      <p className="text-xs text-center  text-[#737373] -mt-2 pb-2">
        Enter your email, phone, or username and we&apos;ll send you a link to
        get back into your account.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email Or Username"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="OTP" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-[#0095F6] text-white ">
            Send Verification OTP
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-[#737373] mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/account/sign-up" className="text-[#0095F6]">
          Sign Up
        </Link>
      </div>
    </main>
  );
}

export default ProfileForm;
