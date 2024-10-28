import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { useSignIn } from "@/hooks";
import { signInFormNodes } from "@/Constants/FormNodes";
import { InputField } from "@/components";

function LoginFrag() {
  const { form, onSubmit, isLoading } = useSignIn();
  return (
    <main className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          {signInFormNodes.map((node) => (
            <InputField
              key={node.name}
              name={node.name}
              type={node.type}
              placeholder={node.placeholder}
              control={form.control}
            />
          ))}

          <p className="text-xs text-[#00376B] font-medium text-right w-full  pb-2">
            <Link href="/account/password/reset">Forget Password ?</Link>
          </p>
          <Button
            type="submit"
            className="w-full bg-[#0095F6] text-white "
            disabled={isLoading}
          >
            {isLoading? "Loading..." : "Submit"}
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

export default LoginFrag;