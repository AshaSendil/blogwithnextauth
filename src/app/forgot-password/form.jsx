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
    },
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  const formSubmit = async (e) => {
    console.log(e, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    try {
      const response = await fetch(`api/auth/forgot-password`, {
        method: "POST",
        body:JSON.stringify({
            email: "test1@test.com",
         }) ,

        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, "response");

      if (response.status === 200) {
        alert("Mail sent");
      }
    } catch (err) {
      alert(err);
    }
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send
        </button>
      </div>

      {error && <small className="block text-red-600 w-full">{error}</small>}

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
