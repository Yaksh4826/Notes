import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";


export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const {isAuthenticated , user ,   login} = useContext(AuthContext);

  const onSubmit = async (data) => {
    let response = await api.post("/auth/login", data);
    console.log(response.data)
  

 if (response.data.success && response.data.id) {
  login(response.data);
    navigate(`/profile/${response.data.id}`, { replace: true });
    
 
  }

  };





  return (
    <div className="flex flex-col justify-center items-center flex-1 max-w-7xl min-h-10/12 mx-auto w-full">
      {result && <p className="text-md text-blue-700">{result.message}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-8 w-full max-w-md bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <h1 className="text-2xl">Login your Account </h1>

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
          value="Login"
          className="bg-black text-white p-3 rounded-md"
        />
        {isSubmitting && <span>Loading...</span>}
      </form>
    </div>
  );
};
