import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

interface Todo {
  task: string;
  id: number;
}

describe("TodoList", () => {
  const todos: Todo[] = [
    { task: "Task 1", id: 1 },
    { task: "Task 2", id: 2 },
    { task: "Task 3", id: 3 },
  ];

  it("renders todo list correctly", () => {
    const { getByText } = render(
      <TodoList
        todos={todos}
        onAppendTask={() => {}}
        onDeleteTask={() => {}}
        onEditTask={() => {}}
      />
    );

    todos.forEach((todo) => {
      const taskElement = getByText(todo.task);
      expect(taskElement).toBeInTheDocument();
    });
  });

  it("appends task correctly", () => {
    const onAppendTask = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <TodoList
        todos={todos}
        onAppendTask={onAppendTask}
        onDeleteTask={() => {}}
        onEditTask={() => {}}
      />
    );

    const inputElement = getByPlaceholderText("Enter a task...");
    const addButtonElement = getByText("Add Task");

    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.click(addButtonElement);

    expect(onAppendTask).toHaveBeenCalledTimes(1);
    expect(onAppendTask).toHaveBeenCalledWith("New Task");
  });

  it("deletes task correctly", () => {
    const onDeleteTask = jest.fn();
    const { getByText } = render(
      <TodoList
        todos={todos}
        onAppendTask={() => {}}
        onDeleteTask={onDeleteTask}
        onEditTask={() => {}}
      />
    );

    const deleteButtonElement = getByText("Delete");

    fireEvent.click(deleteButtonElement);

    expect(onDeleteTask).toHaveBeenCalledTimes(1);
    expect(onDeleteTask).toHaveBeenCalledWith(todos[0]);
  });

  it("edits task correctly", () => {
    const onEditTask = jest.fn();
    const { getByText, getByTestId } = render(
      <TodoList
        todos={todos}
        onAppendTask={() => {}}
        onDeleteTask={() => {}}
        onEditTask={onEditTask}
      />
    );

    const editButtonElement = getByText("Edit");
    const editInput = getByTestId("edit-input");
    const editSaveButton = getByTestId("edit-save-button");

    fireEvent.click(editButtonElement);
    fireEvent.change(editInput, { target: { value: "Updated Task" } });
    fireEvent.click(editSaveButton);

    expect(onEditTask).toHaveBeenCalledTimes(1);
    expect(onEditTask).toHaveBeenCalledWith(todos[0], "Updated Task");
  });
});
