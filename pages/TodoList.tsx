import { useEffect, useRef, useState } from "react";

interface Todo {
  task: string;
  id: number;
}

interface TodolistProps {
  todos: Todo[];
  onAppendTask: (task: string) => void;
  onDeleteTask: (index: number) => void;
  onEditTask: (taskId: number, newTask: string) => void;
}

const TodoList = ({
  todos,
  onAppendTask,
  onDeleteTask,
  onEditTask,
}: TodolistProps) => {
  const [todo, setTodo] = useState<string>("");
  const [editingTask, setEditingTask] = useState<number | null>(null); // Update the type of editingTask to number | null

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleAppendTask = () => {
    if (checkDuplicatedTask(todo, todos)) {
      alert("Duplicated task");
      return;
    }

    if (todo) {
      onAppendTask(todo);
      setTodo("");
    }
  };

  const handleDeleteTask = (task: number) => {
    onDeleteTask(task);
  };

  const handleEditTask = (taskId: number) => {
    setEditingTask(taskId);
  };

  const checkDuplicatedTask = (todo: string, todos: Todo[]) => {
    const isDuplicated = todos.some((task) => task.task === todo);
    return isDuplicated;
  };

  const handleSaveTask = (taskId: number, newTask: string) => {
    if (checkDuplicatedTask(newTask, todos)) {
      const duplicatedIndex = todos.findIndex((task) => task.task === newTask);
      if (todos[duplicatedIndex].id !== taskId) {
        alert("Duplicated task");
        return;
      }
    }
    onEditTask(taskId, newTask);
    setEditingTask(null);
  };

  useEffect(() => {
    if (editingTask !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTask]);

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
              key={task.id}
              className="flex items-center justify-between py-2 border-gray-300 border-b"
            >
              {editingTask === task.id ? (
                <input
                  ref={inputRef}
                  type="text"
                  defaultValue={task.task}
                  onBlur={(e) => {
                    handleSaveTask(task.id, e.target.value);
                  }}
                  className="text-lg flex-grow border-gray-300 border-2 p-2 rounded-lg focus:outline-none focus:border-green-500"
                />
              ) : (
                <span
                  className="text-lg"
                  onClick={() => handleEditTask(task.id)}
                >
                  {task.task}
                </span>
              )}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="px-2 py-1 ml-2 rounded-md bg-red-500 text-white"
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

export default TodoList;
