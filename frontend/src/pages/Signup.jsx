import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/axios";
export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const onSubmit = async (data) => {
    let response = await api.post("/auth/register", data);
    setResult(response.data);
    console.log(response.data);
    console.log(response);
  };

  useEffect(() => {
    if (result?.success) {
      navigate("/login", { replace: true });
    }
  }, [result, navigate]);

  return (
    <div className="flex flex-col justify-center items-center flex-1 max-w-7xl min-h-10/12 mx-auto w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-8 w-full max-w-md bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <h1 className="text-2xl">Sigup for an account </h1>
        <input
          className="border rounded-md p-1"
          type="text"
          placeholder="Full Name"
          {...register("fullName", {
            required: { value: true, message: "full name is a required field" },
          })}
        />
        <input
          className="border rounded-md p-1"
          type="text"
          placeholder="Email"
          {...register("email", {
            required: { value: true, message: "email is a required field" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email",
            },
          })}
        />

        <input
          placeholder="Password"
          className="border rounded-md p-1"
          type="password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: { value: 3, message: "Min length is 3" },
          })}
        />

        {errors.fullName && (
          <span className="text-red-500">{errors.fullName.message}</span>
        )}
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <input
          disabled={isSubmitting}
          type="submit"
          value="Sign Up"
          className="bg-black text-white p-3 rounded-md"
        />
        {isSubmitting && <span>Loading...</span>}
      </form>
      {result &&
        (result.success ? (
          <p className="text-green-700 text-md mt-2">
            {result.message} - you can &nbsp;
            <Link to="/login" className=" underline text-blue-700">
              Login
            </Link>
          </p>
        ) : (
          <p className="text-red-700 text-md mt-2">
            {result.message}
            &nbsp;
            <Link to="/login" className="underline text-blue-700">
              Login
            </Link>
          </p>
        ))}
    </div>
  );
};
