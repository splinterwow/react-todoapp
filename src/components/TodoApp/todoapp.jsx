import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import "tailwindcss/tailwind.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Component ochilganda `localStorage`dan todo ro'yxatini olish
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // `todos` o'zgarganda `localStorage`ga saqlash
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos((prevTodos) => [...prevTodos, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleClearTodos = () => {
    setTodos([]);
  };

  return (
    <div className="w-96 mx-auto rounded-lg border border-gray-300 mt-10 text-center p-5 bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-5">Todo App</h1>

      <div className="flex justify-center items-center mb-5">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add your new todo"
          className="w-64 p-2 text-li border border-gray-300 rounded-md mr-2"
        />
        <button
          className="w-10 h-10 text-xl border-none rounded-md bg-green-600 text-white flex items-center justify-center hover:bg-green-700"
          onClick={handleAddTodo}
        >
          <FaPlus />
        </button>
      </div>
      <ul className="list-none p-0">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="w-80 h-12 opacity-75 text-base mx-auto border border-gray-300 rounded-md mb-2 p-4 flex justify-between items-center relative group"
          >
            {todo}
            <button
              className="w-10 ml-10 h-10 bg-red-600 text-white border-none rounded-md cursor-pointer p-0 absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setTodos(todos.filter((_, i) => i !== index))}
            >
              <FaTrash className="ml-2.5" />
            </button>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <div className="flex justify-between items-center mt-5">
          <p className="m-0 opacity-50">
            You have {todos.length} pending tasks
          </p>
          <button
            className="p-2 text-base border-none rounded-md bg-purple-600 text-white cursor-pointer hover:bg-purple-700"
            onClick={handleClearTodos}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoApp;
