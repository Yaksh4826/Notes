import React, { useState ,useEffect ,useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../api/axios";
export const UpdatePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [result, setResult] = useState(null);
  const navigate = useNavigate();
    const params  = useParams();



const getTask =  async () => {
 let response =  await api.get(`/tasks/${params.id}`);
 console.log(response);
reset({title:response.data?.task.title , content :response.data?.task.content})
}



// Getting the task values for better UX
useEffect(()=>{
getTask();

} , [])







  const onSubmit = async (data) => {
    try {
      let response = await api.patch(`/tasks/${params.id}`, data);
      setResult(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (result?.success) {
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-center items-center flex-1 max-w-7xl min-h-10/12 mx-auto w-full">
      <Link
        className="flex w-6/12 p-4 items-center gap-1 text-blue-600 hover:text-blue-800"
        to="/"
      >
        
        <ArrowLeft size={15}></ArrowLeft>Back to Home
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-8 w-full max-w-lg bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <h1 className="text-2xl">Update Note</h1>
        <input
          className="border  border-gray-500 rounded-md p-1"
          type="text"
          placeholder="title"
          {...register("title", {
            required: { value: true, message: "title is a required field" },
          })}
        
          
        />

        <textarea
          {...register("content", {
            required: { value: true, message: "content is a required field" },
          })}
          className="border  border-gray-500 rounded-md p-1 h-48 w-full max-w-xl resize-none"
          placeholder="Ideas, thoughts, reminders — all go here."
        ></textarea>

        <input
          className="border bg-black text-white hover:bg-pink-700 transition duration-200 p-2 rounded-md"
          type="submit"
          value="Update"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};
