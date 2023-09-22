import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditTodo() {
  const [newTask, setNewTask] = useState("");
  const [todo, setTodo] = useState(null);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // Mengambil data todo dari sumber data berdasarkan ID
    fetch(`http://localhost:8000/todos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTodo(data);
        setNewTask(data.task);
      })
      .catch((error) => {
        console.error("Error fetching todo:", error);
      });
  }, [id]);

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const saveEdit = () => {
    // Mengirim perubahan data todo ke API atau state global
    const editedTodo = { ...todo, task: newTask };

    fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTodo),
    })
      .then(() => {
        alert("todo updated.");

        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };
  return (
    <div className=" d-flex justify-content-center ">
      <div className="content d-flex flex-column bg-secondary align-items-center">
        <h1>Edit Todo</h1>
        <div className="content px-3">
          <input className="form-control" type="text" value={newTask} onChange={handleTaskChange} />
        </div>
        <div>
          <button className="btn btn-success mx-3" onClick={saveEdit}>
            Save
          </button>
          <Link className="btn btn-danger my-3 mx-3" to="/">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
