import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

interface InputFieldProps {
  name: string;
  placeholder: string;
  type?: string;
  control: Control<any>;
  maxLength ?: number
}

const InputField: React.FC<InputFieldProps> = ({ name, placeholder, type = "text", control, maxLength }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input placeholder={placeholder} {...field} type={type} className="w-full" maxLength={maxLength}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default InputField;