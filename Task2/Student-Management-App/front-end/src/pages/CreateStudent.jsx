import React, { useState } from "react";
import Backbutton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveStudent = () => {
    const data = {
      name,
      secondName,
      birthYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:3000/students", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened. Please Check console");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4"> Add student</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Second Name</label>
          <input
            type="text"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Birth Year</label>
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveStudent}>
          Save
        </button>
      </div>
    </div>
  );
};
export default CreateStudent;
