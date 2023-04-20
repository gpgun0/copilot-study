import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import TodoList from "./TodoList";

const inter = Inter({ subsets: ["latin"] });

interface Todo {
  task: string;
  id: number;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAppendTask = (newTask: string) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), task: newTask }]);
  };

  const handleDeleteTask = (taskId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
  };

  const handleEditTask = (taskId: number, newTask: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo: Todo) => {
        if (todo.id === taskId) {
          return { ...todo, task: newTask };
        }
        return todo;
      })
    );
  };

  return (
    <main>
      <TodoList
        todos={todos}
        onAppendTask={handleAppendTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </main>
  );
}
