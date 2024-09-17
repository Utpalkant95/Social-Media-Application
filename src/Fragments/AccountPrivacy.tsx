"use client";
import { IRESSignUpUser } from "@/ApiServices/interfaces/response";
import { setAccountPrivate } from "@/ApiServices/UserServices";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { decodeToken, IUserInfo } from "@/helpers/userInfo";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useId } from "react";

const AccountPrivacy = () => {
  const id = useId();
  const user: IUserInfo | null = decodeToken();

  const { mutate } = useMutation({
    mutationKey: ["update account privacy"],
    mutationFn: setAccountPrivate,
    onSuccess: (data: IRESSignUpUser) => {
      enqueueSnackbar(data && data.message, {
        variant: "success",
        autoHideDuration: 2000
      });
    },
    onError: (error: AxiosError<IRESSignUpUser>) => {
      enqueueSnackbar(error.response?.data.message, {
        variant: "error",
        autoHideDuration: 2000
      });
    },
  });

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Label htmlFor={id}>
          <h2 className="text-xl font-medium">Private account</h2>
          <p className="text-sm">
            When your account is public, your profile and posts can be seen by
            anyone, on or off Instagram, even if they don&apos;t have an Snapify
            account. When your account is private, only the followers you
            approve can see what you share, including your photos or videos on
            hashtag and location pages, and your followers and following lists.
            Certain info on your profile, like your profile picture and
            username, is visible to everyone on and off Instagram.
          </p>
        </Label>
        <Switch
          id={id}
          defaultChecked={user?.privateAccount}
          onCheckedChange={(value) => mutate({ privateAccount: value })}
        />
      </div>
    </div>
  );
};

export default AccountPrivacy;
