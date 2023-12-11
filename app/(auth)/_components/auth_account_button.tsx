"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStyles } from "@/hooks/useStyles";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signOut } from "next-auth/react";

import { CldUploadButton } from "next-cloudinary";
import formConfig from "@/config/authentication/user_setting.json"; // adjust the import path accordingly

import ThemeSwitcher from "@/components/ui/theme_switcher";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "./auth_input";
import { Icons } from "@/components/ui/icons";
import { HoverAnimationWrapper } from "@/components/animation/theme_hover_component_wrapper";
import useAsyncData from "@/hooks/useAsyncDataFetcher";
import { User } from "@prisma-client-mongo";
import LoadingCarrot from "@/components/ui/loading/loading-carrot";

interface UserButtonProps {
  initialData: User | null;
}

const UserButton: React.FC<UserButtonProps> = () => {
  const styles = useStyles();
  const router = useRouter();
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const { data, isLoading, error } = useAsyncData<User>("/api/user");
  const user = data;

  const authForm = useForm<FieldValues>({
    defaultValues: {
      username: "",
      name: "",
      image: "",
      email: "",
    },
  });

  // This effect will update the form values when 'user' data changes
  useEffect(() => {
    if (user) {
      authForm.reset({
        username: user.username || "",
        name: user.name || "",
        image: user.image || "",
        email: user.email || "",
      });
    }
  }, [user, authForm.reset, authForm]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = authForm;

  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });

    axios
      .post("/api/settings/avatar", { image: image })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully updated user avatar");
        }
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsUploadLoading(false));
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsUploadLoading(true);

    axios
      .post("/api/settings", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully updated");
        }
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsUploadLoading(false));
  };
  if (error) return <div>An error occurred.</div>;
  if (isLoading)
    return (
      <div>
        <LoadingCarrot text={"Loading Account"}></LoadingCarrot>
      </div>
    );

  return (
    <>
      <Sheet>
        <div className="flex  flex-col justify-start items-center gap-0">
          <SheetTrigger>
            <Avatar className="hover:opacity-70">
              <AvatarImage
                src={image || user?.image || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <HoverAnimationWrapper
            defaultStyle={styles.textPrimary}
            hoverStyle={styles.hoverText}
          >
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onUpload={handleUpload}
              uploadPreset="olc1wg3v"
              onSuccess={() => toast.success("Upload Image Success !")}
              className=" text-xs font-extralight"
            >
              Change
            </CldUploadButton>
          </HoverAnimationWrapper>
        </div>
        <SheetContent side={"left"} style={styles.userProfileContainerStyles}>
          <SheetHeader>
            <SheetTitle>
              <div className=" flex gap-2 items-center">
                <Avatar>
                  <AvatarImage
                    src={
                      image || user?.image || "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className=" overflow-clip ">
                  {user?.name ?? (user?.email as string)}
                </div>
              </div>
            </SheetTitle>
            <SheetDescription>
              This is your account control center. Please feel free to edit your
              account.
            </SheetDescription>
          </SheetHeader>
          <div>
            {/* Setting Form */}
            <div className="mt-1 flex flex-col gap-4 w-full h-full">
              <Form {...authForm}>
                <form
                  onSubmit={authForm.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  {formConfig.variants.fields.map((f) => {
                    return (
                      <FormField
                        key={f.name}
                        control={authForm.control}
                        name={f.name}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className=" sr-only" htmlFor={f.name}>
                              {f.label}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className=" form-input"
                                id={f.name}
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
                    {formConfig.variants.submitButtonLabel}
                  </Button>
                </form>
              </Form>
            </div>
            <div className=" mt-4 flex gap-2">
              <Button
                style={styles.userProfileContainerButtonStyles}
                variant={"user"}
                onClick={() => signOut()}
              >
                {" "}
                Log out{" "}
              </Button>
              <ThemeSwitcher></ThemeSwitcher>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserButton;
