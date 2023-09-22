import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [task, setTask] = useState("");
  let navigate = useNavigate();

  // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
  const addTodo = () => {
    const newTodo = { task, completed: false };

    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      // ketika sukses menambah data, reset form dengan mengeset state task menjadi empty string
      setTask("");
      alert("new todo added.");
      navigate("/");
    });
  };
  return (
    <div className=" d-flex justify-content-center ">
      <div className="content d-flex flex-column bg-secondary align-items-center">
        <h2>ADD TODO</h2>
        <div className="input-group px-3">
          <input className="form-control " type="text" value={task} onChange={(e) => setTask(e.target.value)} />
          <button className="btn btn-primary " onClick={addTodo}>
            Add
          </button>
        </div>
        <Link className="btn btn-warning my-3 mx-3" to="/">
          Kembali
        </Link>
      </div>
    </div>
  );
}
