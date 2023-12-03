import React, { useState } from "react";
import Backbutton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteStudent() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteStudent = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/students/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        alert("Ann error happened. Please Check console");
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4">Delete Student</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto ">
        <h3 className="text-2xl">
          Are You Sure You Want to delete this sdudent?
        </h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteStudent}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
}
