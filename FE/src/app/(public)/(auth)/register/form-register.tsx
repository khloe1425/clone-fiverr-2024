"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link"; // Next.js routing
import signup from "../../../../assets/img/signup.jpg"; // Image import for Next.js
const eye = <FontAwesomeIcon icon={faEye} />;
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radioGroup";
import { useLogoutMutation } from "@/queries/useAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Define the type for form data
type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  birthday: string;
  gender: string;
};

export default function Register() {
  // Show password toggle
  const registerMutation = useLogoutMutation();
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => setPasswordShow(!passwordShow);
  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // To check the password confirmation value
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      birthday: "",
      gender: "true", // default to male
    },
  });

  // Form submission handler (no API call, just log the data)
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Assume registerMutation is your mutation hook or API call
      await registerMutation.mutateAsync({ ...data });
      toast.success("Registration successful!"); // Success message
      router.push("login");
    } catch (error: any) {
      toast.error(
        error.content.content || "Registration failed. Please try again."
      );
    }
  };
  return (
    <section className="signup" id="register">
      <div className="container_form">
        <div className="signup-content">
          <div className="signup-form">
            <h1 className="text-center text-green-500 font-semibold text-xl">
              REGISTER
            </h1>
            <form
              className="register-form"
              id="register-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Name */}
              <div className="d-flex flex-row align-items-center ">
                <i className="fas fa-user fa-lg me-3 fa-fw" />
                <div className="form-outline flex-fill">
                  <Input
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Name must contain only letters",
                      },
                    })}
                  />
                  <div className="text-red-500 text-sm h-[30px]">
                    {errors.name && (
                      <span className="h-[30px]">{errors.name.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="d-flex flex-row align-items-center">
                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0">
                  <Input
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  <div className="text-red-500 text-sm h-[30px]">
                    {errors.email && (
                      <span className="h-[30px]">{errors.email.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="d-flex flex-row align-items-center">
                <i className="fas fa-lock fa-lg me-3 fa-fw" />
                <div
                  className="form-outline flex-fill mb-0"
                  style={{ position: "relative" }}
                >
                  <Input
                    type={passwordShow ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Your Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 32,
                        message: "Password can be a maximum of 32 characters",
                      },
                    })}
                  />
                  <div className="text-red-500 text-sm h-[30px]">
                    {errors.password && <span>{errors.password.message}</span>}
                  </div>
                  <button
                    type="button"
                    className="show"
                    style={{
                      position: "absolute",
                      top: 8.5,
                      right: 10,
                      border: "none",
                      opacity: "0.5",
                      background: "none",
                    }}
                    onClick={togglePassword}
                  >
                    <i>{eye}</i>
                  </button>
                </div>
              </div>

              {/* Password Confirmation */}
              <div className="d-flex flex-row align-items-center">
                <i className="fas fa-key fa-lg me-3 fa-fw" />
                <div
                  className="form-outline flex-fill mb-0"
                  style={{ position: "relative" }}
                >
                  <Input
                    type={passwordShow ? "text" : "password"}
                    className="form-control"
                    id="passwordConfirm"
                    placeholder="Repeat your password"
                    {...register("passwordConfirm", {
                      required: "Password confirmation is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  <div className="text-red-500 text-sm h-[30px]">
                    {errors.passwordConfirm && (
                      <span>{errors.passwordConfirm.message}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="show"
                    style={{
                      position: "absolute",
                      top: 8.5,
                      right: 10,
                      border: "none",
                      opacity: "0.5",
                      background: "none",
                    }}
                    onClick={togglePassword}
                  >
                    <i>{eye}</i>
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="d-flex flex-row align-items-center">
                <i className="fas fa-phone fa-lg me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0">
                  <Input
                    className="form-control"
                    id="phone"
                    placeholder="Your Phone"
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^(0[3-9]{1})\d{8}$/,
                        message:
                          "Phone number must be 10 digits starting with 03, 05, 07, 08, or 09",
                      },
                    })}
                  />
                  <div className="text-red-500 text-sm h-[30px]">
                    {errors.phone && <span>{errors.phone.message}</span>}
                  </div>
                </div>
              </div>

              {/* Birthday */}
              <div className="d-flex flex-row align-items-center">
                <i className="fa-solid fa-cake-candles me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0">
                  <Input
                    type="date"
                    className="form-control"
                    id="birthday"
                    {...register("birthday", {
                      required: "Birthday is required",
                    })}
                  />
                  <div className="text-red-500 text-sm h-[30px]">
                    {errors.birthday && <span>{errors.birthday.message}</span>}
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="my-5">
                <RadioGroup
                  className="flex flex-row justify-around"
                  defaultValue="true" // Default value for "Male"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="true"
                      id="r1"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                    />
                    <Label htmlFor="r1">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="false"
                      id="r2"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                    />
                    <Label htmlFor="r2">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Terms and conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex flex-row items-center ">
                <button
                  className="btn btn-primary btn_register mx-auto"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Signup Image */}
          <div className="signup-image">
            <div className="flex items-center justify-center">
              <Image src={signup} alt="sign up image" className="w-100" />
            </div>
            <Link href="/login" passHref>
              <span className="signup-image-link">I am already a member</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
