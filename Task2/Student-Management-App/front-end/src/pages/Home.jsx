import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutLineAddBox, MdOutLineDeleteBox } from "react-icons/ai";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        setBooks(res.data.data);
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
          <MdOutLineAddBox className="text-sky-800 text-4xl" />
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
              <tr key={student._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
