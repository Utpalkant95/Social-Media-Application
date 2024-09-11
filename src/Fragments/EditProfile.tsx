"use client";

import { InputField } from "@/components";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { editProfileFormNodes } from "@/Constants/FormNodes";
import useEditProfile from "@/hooks/useEditProfile";

const EditProfile = () => {
  const { form, onSubmit } = useEditProfile();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
        {editProfileFormNodes.map((node) => {
          if (node.name === "bio") {
            return (
              <Textarea
                key={node.name}
                placeholder={node.placeholder} 
                {...form.register(node.name)}
              />
            );
          }
          return (
            <InputField
              key={node.name}
              name={node.name}
              placeholder={node.placeholder}
              control={form.control}
            />
          );
        })}
        <Button type="submit" className="w-full bg-[#4CB5F9] text-white">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditProfile;
