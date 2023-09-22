import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import AddTodo from "./components/AddTodo.jsx";
import EditTodo from "./components/EditTodo.jsx";

export default function Rute() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Add" element={<AddTodo />} />
      <Route path="/:id" element={<EditTodo />} />
    </Routes>
  );
}
