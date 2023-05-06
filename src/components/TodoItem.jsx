import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import todoContext from "../Context/todos/todoContext";
import "../index.css";

const TodoItem = (props) => {
  const context = useContext(todoContext);
  const { todo, updateTodo, mode, handleMode } = props;
  const { deleteTodo } = context;

  const [isDone, setIsDone] = useState(false);

  const TaskDone = () => {
    setIsDone(!isDone);
    setTimeout(() => {
      deleteTodo(todo._id);
    }, 300);
  };

  return (
    <div className="col">
      <Card
        className={
          mode === "dark" ? "card-todo-dark container" : "card-todo container"
        }
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title
              className={`todo-title ${isDone ? "linethrough" : ""}`}
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              {todo.title}
            </Card.Title>
            <i
              className="bi bi-check-circle-fill btn7"
              onClick={() => {
                TaskDone();
              }}
              title="Mark as Done"
            ></i>
          </div>
          <Card.Text
            style={{ color: "grey" }}
            className={`${isDone ? "linethrough" : ""}`}
          >
            {todo.description}
          </Card.Text>
          <Card.Text
            style={{ color: "grey" }}
            className={`${isDone ? "linethrough" : ""}`}
          >
            <span style={{ color: "#0275d8" }}>Tag :</span> {todo.tag}
          </Card.Text>
          <div className="d-flex justify-content-evenly">
            <Button
              className={
                mode === "dark"
                  ? "rounded-pill btn-1-dark d-flex justify-content-evenly"
                  : "rounded-pill btn-1 d-flex justify-content-evenly"
              }
              variant="primary"
              onClick={() => {
                updateTodo(todo);
              }}
              title="Edit Todo"
              style={{ border: mode === "dark" ? "2px solid white" : "" }}
            >
              Edit
              <i className="bi bi-trash3-fill mx-2 rounded-circle btn-icon1"></i>
            </Button>
            <Button
              className={
                mode === "dark"
                  ? "rounded-pill btn-2-dark d-flex justify-content-evenly"
                  : "rounded-pill btn-2 d-flex justify-content-evenly"
              }
              variant="primary"
              onClick={() => {
                deleteTodo(todo._id);
              }}
              title="Delete Todo"
              style={{ border: mode === "dark" ? "2px solid white" : "" }}
            >
              Delete
              <i
                className={
                  mode === "dark"
                    ? "bi bi-pen-fill mx-2 rounded-circle btn-icon2-dark"
                    : "bi bi-pen-fill mx-2 rounded-circle btn-icon2"
                }
              ></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodoItem;
