import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

// Mocking the functions passed as props to the TodoList component
const mockOnAppendTask = jest.fn();
const mockOnDeleteTask = jest.fn();
const mockOnEditTask = jest.fn();

// Define test data
const todos = [{ task: "Task 1", id: 1 }];

describe("TodoList", () => {
  it("renders TodoList component correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <TodoList
        todos={todos}
        onAppendTask={mockOnAppendTask}
        onDeleteTask={mockOnDeleteTask}
        onEditTask={mockOnEditTask}
      />
    );

    // Check if the TodoList component is rendered correctly
    expect(getByText("Todo List")).toBeTruthy();
    expect(getByPlaceholderText("Enter a task...")).toBeTruthy();
  });

  it("calls onAppendTask function when Add Task button is clicked with a valid task", () => {
    const { getByPlaceholderText, getByText } = render(
      <TodoList
        todos={todos}
        onAppendTask={mockOnAppendTask}
        onDeleteTask={mockOnDeleteTask}
        onEditTask={mockOnEditTask}
      />
    );

    const inputElement = getByPlaceholderText("Enter a task...");
    const addButton = getByText("Add Task");

    // Type a task in the input field
    fireEvent.change(inputElement, { target: { value: "New Task" } });

    // Click Add Task button
    fireEvent.click(addButton);

    // Check if the onAppendTask function is called with the correct task
    expect(mockOnAppendTask).toHaveBeenCalledTimes(1);
    expect(mockOnAppendTask).toHaveBeenCalledWith("New Task");
  });

  it("calls onDeleteTask function when Delete button is clicked", () => {
    const { getByText } = render(
      <TodoList
        todos={todos}
        onAppendTask={mockOnAppendTask}
        onDeleteTask={mockOnDeleteTask}
        onEditTask={mockOnEditTask}
      />
    );

    const deleteButton = getByText("Delete");

    // Click Delete button
    fireEvent.click(deleteButton);

    // Check if the onDeleteTask function is called with the correct taskId
    expect(mockOnDeleteTask).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteTask).toHaveBeenCalledWith(1); // Assuming the taskId is 1 in this test
  });

  it("calls onEditTask when input field is blurred", () => {
    const onEditTaskMock = jest.fn();
    const { getByText, getByDisplayValue } = render(
      <TodoList
        todos={todos}
        onAppendTask={() => {}}
        onDeleteTask={() => {}}
        onEditTask={onEditTaskMock}
      />
    );

    const taskElement = getByText("Task 1");
    fireEvent.click(taskElement);

    const inputField = getByDisplayValue("Task 1");
    fireEvent.change(inputField, { target: { value: "Edited Task 1" } });
    fireEvent.blur(inputField);

    expect(onEditTaskMock).toHaveBeenCalledWith(1, "Edited Task 1");
  });
});
