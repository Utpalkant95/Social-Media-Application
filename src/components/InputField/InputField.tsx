import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

interface InputFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  control: Control<any>;
}

const InputField: React.FC<InputFieldProps> = ({ name, placeholder, type = "text", control }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input placeholder={placeholder} {...field} type={type} className="w-full" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default InputField;