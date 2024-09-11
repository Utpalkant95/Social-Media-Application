import { useEditProfileForm } from '@/forms';
import { editProfileSchema } from '@/schemas/editProfileSchema';
import { z } from "zod";

const useEditProfile = () => {
    const form = useEditProfileForm();
    
    const onSubmit = (values: z.infer<typeof editProfileSchema>) => {
      console.log(values);
    };
    return { form, onSubmit };
}

export default useEditProfile