"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { verifyFormNodes } from "@/Constants/FormNodes";
import { InputField } from "@/components";
import useVerify from "@/hooks/useVerify";

function Page() {
  const {form,onSubmit} = useVerify();
  return (
    <main className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          {verifyFormNodes.map((node) => (
            <InputField
              key={node.name}
              name={node.name}
              placeholder={node.placeholder}
              control={form.control}
              maxLength={6}
            />
          ))}
          <Button
            type="submit"
            className="w-full bg-[#0095F6] text-white "
          >
            {/* {status === "pending" ? "Loading..." : "Submit"} */}
          </Button>
        </form>
      </Form>

    </main>
  );
}

export default Page;