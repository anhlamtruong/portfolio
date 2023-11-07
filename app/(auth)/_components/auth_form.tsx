"use client";

import formConfig from "@/config/authentication/sign_in_form.json"; // adjust the import path accordingly
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignInForm } from "@/config/authentication/sign_in_form";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/ui/icons";
import { useStyles } from "@/hooks/useStyles";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [config, setConfig] = useState<SignInForm | null>(null);
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else if (variant === "REGISTER") {
      setVariant("LOGIN");
    }
  }, [variant]);

  const authForm = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    // Load the configuration (assuming it's a local JSON file)
    setConfig(formConfig as SignInForm);
  }, []);

  if (!config) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />; // or some loading indicator
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = authForm;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Axios Register
      axios.post("/api/register", data);
    }
    console.log(data);
    if (variant === "LOGIN") {
      // NextAuth Sign In
    }
    console.log("test");
    setIsLoading(false);
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // Next Auth Social Sign In
  };

  return (
    <div className="justify-center self-center items-center flex flex-col gap-4 w-full">
      <Form {...authForm}>
        <form onSubmit={authForm.handleSubmit(onSubmit)} className="space-y-2">
          {variant === "LOGIN" &&
            formConfig.variants.LOGIN.fields.map((f) => {
              return (
                <FormField
                  key={f.name}
                  control={authForm.control}
                  name={f.name}
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <FormLabel className=" sr-only" htmlFor={f.name}>
                        {f.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className=" form-input"
                          id={f.name}
                          placeholder={f.placeholder}
                          {...field}
                          type={f.name}
                          register={register}
                          autoCorrect="off"
                          errors={errors}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>{f.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
          {variant === "REGISTER" &&
            formConfig.variants.REGISTER.fields.map((f) => {
              return (
                <FormField
                  key={f.name}
                  control={authForm.control}
                  name={f.name}
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <FormLabel className=" sr-only" htmlFor={f.name}>
                        {f.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className=" form-input"
                          id={f.name}
                          placeholder={f.placeholder}
                          {...field}
                          type={f.name}
                          register={register}
                          autoCorrect="off"
                          errors={errors}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>{f.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

          <Button
            variant="default"
            disabled={isLoading}
            type="submit"
            fullWidth={false}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {variant === "LOGIN"
              ? formConfig.variants.LOGIN.submitButtonLabel
              : formConfig.variants.REGISTER.submitButtonLabel}{" "}
            with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex justify-between gap-3">
        <Button
          fullWidth={true}
          variant="outline"
          type="button"
          disabled={isLoading}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" /> Github
        </Button>
        <Button
          fullWidth={true}
          variant="outline"
          type="button"
          disabled={isLoading}
        >
          <Icons.google className="mr-2 h-4 w-4" /> Google
        </Button>
      </div>
      <div
        style={styles.textTertiary}
        className="flex gap-1 justify-center text-sm mt-1 px-2"
      >
        <div>
          {variant === "LOGIN"
            ? "New to Cookit ?"
            : "Already have an account ?"}
        </div>
        <div
          onClick={toggleVariant}
          className="hover:underline underline-offset-2 cursor-pointer"
        >
          {variant === "LOGIN" ? "Create an account" : "Login"}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
