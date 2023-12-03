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
      navigate('/');
    })
    .catch((err) => {
      
    })
  };
  return <div>DeleteStudents</div>;
}
