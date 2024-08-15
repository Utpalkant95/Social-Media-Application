"use client";
// import { PrimaryLoader } from "@/components";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useLogin } from "@/hooks";

const LoginFrag = ({ signUp }: {signUp : boolean}) => {
//   const { formik, loginMutation, signUpMutation, googleMutation } = useLogin({signUp: signUp});
//   const Loading = formik.isSubmitting || signUpMutation.isLoading || loginMutation.isLoading;
  return (
    <div>fom</div>
    // <form className="flex flex-col gap-y-2" onSubmit={formik.handleSubmit}>
    //   <Input
    //     type="email"
    //     placeholder="Email"
    //     value={formik.values.email}
    //     name="email"
    //     onChange={formik.handleChange}
    //     onBlur={formik.handleBlur}
    //   />
    //   <Input
    //     type="password"
    //     placeholder="Password"
    //     value={formik.values.password}
    //     name="password"
    //     onChange={formik.handleChange}
    //     onBlur={formik.handleBlur}
    //   />
    //   <Input
    //     type="password"
    //     placeholder="Confirm Password"
    //     value={formik.values.confirm_password}
    //     name="confirm_password"
    //     onChange={formik.handleChange}
    //     onBlur={formik.handleBlur}
    //   />
    //   <Button
    //     type="submit"
    //     variant="form"
    //     size="form"
    //     disabled={
    //       formik.isSubmitting ||
    //       signUpMutation.isLoading ||
    //       loginMutation.isLoading
    //     }
    //   >
    //     {Loading ? <PrimaryLoader /> : signUp ? "Sign Up" : "Sign In"}
    //   </Button>
    //   <div className="flex items-center gap-x-1">
    //     <hr className="w-full" />
    //     <span>Or</span>
    //     <hr className="w-full" />
    //   </div>
    //   <Button
    //     className=""
    //     type="button"
    //     variant="form"
    //     size="form"
    //     // onClick={() => googleMutation()}
    //     disabled={Loading}
    //   >
    //     Continue With Google
    //   </Button>
    // </form>
  );
};

export default LoginFrag;
