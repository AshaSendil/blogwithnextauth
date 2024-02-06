"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";

const Form = () => {
  const params = useSearchParams();
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  const formSubmit = (form) => {
    const { email, password } = form;
    console.log(form, "form");
    signIn("credentials", {
      email,
      password,
    });
  };

  if (session?.user) {
    router.push("/");
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Email
      </label>
      <div className="mt-2">
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          })}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors.email?.message && (
          <small className="block text-red-600 w-full">
            {errors.email.message}
          </small>
        )}
      </div>
    </div>
  
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="text-sm">
          <a
            href="/forgot-password"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>
      </div>
      <div className="mt-2">
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors.password?.message && (
          <small className="block text-red-600 w-full">
            {errors.password.message}
          </small>
        )}
      </div>
    </div>
  
    <div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    </div>
  
    {error && (
      <small className="block text-red-600 w-full">{error}</small>
    )}
  
    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?{" "}
      <a
        href="/register"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Sign Up
      </a>
    </p>
  </form>
  
  );
};

export default Form;
