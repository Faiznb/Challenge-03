import { useState } from "react";
import { VscEdit, VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";

const TodoItem = ({ todo, setRefresh }) => {
  const [isComplete, setIsComplete] = useState(todo.complete);
  const updateTodo = () => {
    setIsComplete(!isComplete);
    const updatedTodo = {
      ...todo,
      complete: !isComplete,
    };

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    }).then(() => {
      console.log("todo updated.");
      setRefresh(true);
    });
  };

  const deleteTodo = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log("todo deleted.");
      setRefresh(true);
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between">
      <div>
        <div className={`${todo.complete ? "text-decoration-line-through" : ""}`}>{todo.task}</div>
      </div>
      <div className="action-button d-flex justify-content-between">
        <div>
          <input type="checkbox" checked={isComplete} onChange={updateTodo} className="complete-checkbox action" />
        </div>
        <Link to={`${todo.id}`}>
          <VscEdit />
        </Link>
        <div className="action" onClick={deleteTodo}>
          <VscClose />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
