"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import signin from "../../../../assets/img/signin.jpg"; // Update import for the image
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Assuming Input is imported from shardCNUI
import { Button } from "@/components/ui/button"; // Assuming Button is imported from shardCNUI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { LoginRequestBody } from "@/app/dto/request";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import authApiRequest from "@/apiRequests/auth";
import { toast } from "react-toastify";
export default function LoginForm() {
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequestBody) => authApiRequest.login(data),
    onError: (error: any) => {
      console.log("check error", error.content);
      toast.error(error.content.content || "Đăng nhập thất bại");
    },
    onSuccess: () => {
      toast.success("Đăng nhập thành công");
      router.push("/");
    },
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestBody>(); // Typing the form data

  // Submit function
  const onSubmit = async (data: LoginRequestBody) => {
    await loginMutation.mutateAsync(data);
  };
  return (
    <section className="sign-in">
      <div className="container_form">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <Image src={signin} alt="sign up image" className="w-100" />
            </figure>
          </div>
          <div className="signin-form">
            <h1 className="text-center text-2xl font-bold text-[green] p-3">
              Sign In to Fiverr
            </h1>
            <form
              className="login-form"
              id="login-form"
              onSubmit={handleSubmit(onSubmit)} // Handle form submission
            >
              {/* Email Input Field */}
              <div className="flex flex-col  mb-4">
                <div className="flex flex-row items-center w-full">
                  <FontAwesomeIcon icon={faUser} size="lg" className="p-2" />
                  <Input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Please enter a valid email address",
                      },
                    })} // Register field with validation
                    className=""
                  />
                </div>
                <div className="text-red-500 mt-2 text-sm ml-9 h-[20px] ">
                  {errors.email && (
                    <span className="h-[40px]">{errors.email.message}</span>
                  )}
                </div>
              </div>

              {/* Password Input Field */}
              <div className="d-flex flex-col  mb-4 w-full">
                <div className="flex flex-row items-center w-full">
                  <FontAwesomeIcon icon={faLock} size="lg" className="p-2" />
                  <Input
                    type="password"
                    id="password"
                    placeholder="Your Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })} // Register password field with validation
                    className="w-full"
                  />
                </div>
                <div className="text-red-500 mt-2 text-sm ml-9 h-[20px] ">
                  {errors.password && (
                    <span className="h-[40px]">{errors.password.message}</span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-group register d-flex justify-content-center align-items-baseline gap-3 mt-5">
                <Button type="submit" variant="default" className="">
                  Login
                </Button>
              </div>
              <div className="mt-3">
                <Link href="/register" className="no-underline ">
                  <span className="text-[green] flex flex-row items-center">
                    <span className="mx-auto">Register Now</span>
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
