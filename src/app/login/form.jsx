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
    <form
      onSubmit={handleSubmit(formSubmit)}
      className={` flex justify-center items-center flex-col`}
    >
      <h2
        className={`leading-[1.15] mt-12 mx-auto w-full  px-2 text-xl my-6 sm:text-2xl font-semibold  font-Poppins`}
      >
        Log In
      </h2>

      <fieldset className="w-full px-2 flex justify-center items-center flex-col">
        <label className="w-full " htmlFor="email">
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          })}
          className=" w-full   border-solid border-[1px] border-[#EAECEF]"
        />
        {errors.email?.message && (
          <small className="block text-red-600 w-full">
            {errors.email.message}
          </small>
        )}
      </fieldset>
      <fieldset className="w-full px-2 mt-12 flex justify-center items-center flex-col">
        <label className="w-full" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className=" w-full   border-solid border-[1px] border-[#EAECEF]"
        />
        {errors.password?.message && (
          <small className="block text-red-600 w-full">
            {errors.password.message}
          </small>
        )}
      </fieldset>
      <div className={`flex flex-col justify-center w-full items-center px-2`}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center"
        >
          <span className="text-center flex-1   mt-6 bg-green-700 hover:bg-lightColor hover:font-semibold rounded-md p-[1rem] px-4  text-white cursor-pointer">
            Log in
          </span>
        </button>
        <p className={`py-6  text-[#707a8a] text-center`}>
          <span className="mr-1 "> Or</span>
        </p>
      </div>
      <div className="flex w-full justify-center px-2 text-lg items-center">
        <buuton>GoogleBtn</buuton>
      </div>
      {error && (
        <small className="block w-full px-2 text-red-600">{error}</small>
      )}

      <div className="py-4 px-2 w-full">
        <p>
          <Link
            href="/register"
            className="text-lightColor hover:text-primaryColor hover:underline"
          >
            {" "}
            Create an Account
            <BsArrowRightCircleFill className="ml-2" />
          </Link>
        </p>
      </div>
      {isSubmitting && <h3>Loading...................</h3>}
    </form>
  );
};

export default Form;
