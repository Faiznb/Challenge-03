import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Link } from "react-router-dom";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("semua");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    // memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // ketika Rest API sukses, simpan data dari response ke dalam state lokal
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const filteredTodos = todos
    .filter((todo) => (filter === "sudah selesai" && todo.complete) || (filter === "belum selesai" && !todo.complete) || filter === "semua")
    .filter((todo) => todo.task.toLowerCase().includes(searchKeyword.toLowerCase()));

  return (
    <div className="content d-flex flex-column align-items-center">
      <div className="content d-flex justify-content-around mt-3 ">
        <Link className="btn btn-outline-light" to="/Add">
          Add Todo
        </Link>
        <div className="input-group w-50">
          <input className="form-control" type="text" placeholder="Cari Todo..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
        </div>
      </div>
      <div className="content d-flex justify-content-around my-2">
        <button className="btn  btn-outline-light" onClick={() => handleFilterChange("semua")}>
          ALL
        </button>
        <button className="btn  btn-outline-light" onClick={() => handleFilterChange("sudah selesai")}>
          DONE
        </button>
        <button className="btn  btn-outline-light" onClick={() => handleFilterChange("belum selesai")}>
          TODO
        </button>
      </div>

      <ul id="todo-list" className="content list-group">
        {filteredTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
