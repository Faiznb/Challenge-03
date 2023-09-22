import { useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  };

  return (
    <div className=" d-flex justify-content-center">
      <div className="content d-flex flex-column align-items-center container bg-secondary">
        <TodoList setRefresh={setRefresh} isRefresh={isRefresh} />
      </div>
    </div>
  );
}

export default App;
