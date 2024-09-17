"use client";
import { InputField, Loader } from "@/components";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { changePasswordFormNodes } from "@/Constants/FormNodes";
import { useUpdatePassword } from "@/hooks";

const ChangePassword = () => {
  const { form, onSubmit, isLoading } = useUpdatePassword();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
        {changePasswordFormNodes.map((node) => {
          return (
            <InputField
              key={node.name}
              name={node.name}
              placeholder={node.placeholder}
              control={form.control}
            />
          );
        })}
        <Button
          type="submit"
          className="w-full bg-[#4CB5F9] text-white"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Change Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePassword;
