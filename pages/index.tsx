import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface TodolistProps {
  todos: string[];
  onAppendTask: (task: string) => void;
  onDeleteTask: (task: string) => void;
}

const checkDuplicatedTask = (todo: string, todos: string[]) => {
  const isDuplicated = todos.includes(todo);
  if (isDuplicated) {
    alert("Duplicated task");
  }
  return isDuplicated;
};

const TodoList = ({ todos, onAppendTask, onDeleteTask }: TodolistProps) => {
  const [todo, setTodo] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleAppendTask = () => {
    if (checkDuplicatedTask(todo, todos)) {
      return;
    }

    if (todo) {
      onAppendTask(todo);
      setTodo("");
    }
  };

  const handleDeleteTask = (task: string) => {
    onDeleteTask(task);
  };

  useEffect(() => {
    console.log("Todos:", todos);
  }, [todos]);

  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">Todo List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={todo}
            onChange={handleInputChange}
            className="flex-grow border-gray-300 border-2 p-2 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter a task..."
          />
          <button
            onClick={handleAppendTask}
            className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            Add Task
          </button>
        </div>
        <ul>
          {todos.map((task) => (
            <li
              key={task}
              className="flex items-center justify-between py-2 border-gray-300 border-b"
            >
              <span className="text-lg">{task}</span>
              <button
                onClick={() => handleDeleteTask(task)}
                className="text-gray-500 hover:text-red-500 focus:outline-none"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);

  const handleAppendTask = (task: string) => {
    setTodos([...todos, task]);
  };

  const handleDeleteTask = (task: string) => {
    setTodos(todos.filter((t) => t !== task));
  };

  return (
    <main>
      <TodoList
        todos={todos}
        onAppendTask={handleAppendTask}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
}
