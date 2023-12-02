import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateStudent from "./pages/CreateStudent";
import ShowStudent from "./pages/ShowStudent";
import EditStudent from "./pages/EditStudent";
import DeleteStudent from "./pages/DeleteStudent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students/create" element={<CreateStudent />} />
      <Route path="/students/details/:id" element={<ShowStudent />} />
      <Route path="/students/edit/:id" element={<EditStudent />} />
      <Route path="/students/delete/:id" element={<DeleteStudent />} />
    </Routes>
  );
};

export default App;
