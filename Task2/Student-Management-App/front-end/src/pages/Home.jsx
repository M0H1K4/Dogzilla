import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        setStudents(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Srudents List</h1>
        <Link to="/students/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Second Name
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Birth Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr key={student._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {student.name}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {student.secondName}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {student.birthYear}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4 ">
                      <Link to={`/students/details/${student._id}`}>
                        <BsInfoCircle className="'text-2xl text-green-800" />
                      </Link>
                      <Link to={`/students/edit/${student._id}`}>
                        <AiOutlineEdit className="'text-2xl text-yellow-800" />
                      </Link>
                      <Link to={`/students/delete/${student._id}`}>
                        <MdOutlineDelete className="'text-2xl text-red-800" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
