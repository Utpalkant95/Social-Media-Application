"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { InputField } from "@/components";
import { useSignUp } from "@/hooks";
import { signUpFormNodes } from "@/Constants/FormNodes";

function ProfileForm() {
  const { form, onSubmit, isPending, status} = useSignUp();
  return (
    <main>
      <h2 className="text-[#737373] font-medium text-center mb-4">
        Sign up to see photos and videos from your friends.
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          {signUpFormNodes.map((node) => (
            <InputField
              key={node.name}
              name={node.name}
              placeholder={node.placeholder}
              control={form.control}
            />
          ))}
          <p className="text-xs text-center text-[#737373] pt-2">
            People who use our service may have uploaded your contact
            information to Instagram.
          </p>
          <p className="text-xs text-center text-[#737373]">
            By signing up, you agree to our Terms, Privacy Policy, and Cookies
            Policy.
          </p>

          <Button type="submit" className="w-full bg-[#4CB5F9] text-white" disabled={status === "pending"}>
            {isPending ? "Loading..." : "Sign up"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-[#737373] mt-4">
        Have an account?{" "}
        <Link href="/account/sign-in" className="text-[#0095F6]">
          Log in
        </Link>
      </div>
    </main>
  );
}

export default ProfileForm;