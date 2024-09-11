import { useUpdatePasswordForm } from '@/forms';
import { updatePasswordSchema } from '@/schemas/updatePasswordSchema';
import { z } from "zod";

const useEditProfile = () => {
    const form = useUpdatePasswordForm();
    
    const onSubmit = (values: z.infer<typeof updatePasswordSchema>) => {
      console.log(values);
    };
    return { form, onSubmit };
}

export default useEditProfile