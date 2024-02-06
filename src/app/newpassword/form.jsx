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
      password: "",
      confirmpassword: "",
    },
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const formSubmit = async (event) => {
    console.log(event,"event")
    event.preventDefault();
    try {
      const response = await fetch(`api/auth/new-password`, {
        method: "POST",
        body: JSON.stringify({
          password: password,
          confirmpassword: confirmpassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, "response");

      if (response.status === 200) {
        alert("Password updated successfully");
      } else {
        // Handle other status codes
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (session?.user) {
    router.push("/");
  }
  return (
    <form className="space-y-6" onSubmit={formSubmit}>
      {/* Password input */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            // Rest of your input props
          />
        </div>
      </div>

      {/* Confirm Password input */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="confirmpassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password
          </label>
        </div>
        <div className="mt-2">
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            // Rest of your input props
          />
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
