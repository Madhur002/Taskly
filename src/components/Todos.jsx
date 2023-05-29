import React, { useState, useContext, useEffect, useRef } from "react";
import todoContext from "../Context/todos/todoContext";
import TodoItem from "./TodoItem";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../index.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Todos = () => {
  const navigate = useNavigate();
  const context = useContext(todoContext);
  const { todos, addTodo, getTodos, editTodo, handleRemoveCompleted } = context;
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const [filter, setFilter] = useState("all");

  // Function to handle search results
  const handleSearch = (data) => {
    setSearchResults(data);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodos();
    } else {
      navigate("/login");
    }
  }, []);

  const [todo, setTodo] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrors({ title: "", description: "" });

    // Validation
    let isValid = true;
    if (todo.title.length > 50) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title should have a maximum length of 50 characters.",
      }));
      isValid = false;
    }
    if (todo.description.length > 256) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description:
          "Description should have a maximum length of 256 characters.",
      }));
      isValid = false;
    }

    // Display alert after 2 seconds
    if (isValid) {
      // Perform other actions if form is valid
      refClose.current.click();
      editTodo(todo.id, todo.etitle, todo.edescription, todo.etag);
      addTodo(todo.title, todo.description, todo.tag);
      setTodo({ title: "", description: "", tag: "" });

      setTimeout(() => {
        alert("Form submitted successfully!");
      }, 2000);
    }
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateTodo = (currentTodo) => {
    ref.current.click();
    setTodo({
      id: currentTodo._id,
      etitle: currentTodo.title,
      edescription: currentTodo.description,
      etag: currentTodo.tag,
    });
  };

  const [mode, setMode] = useState("light");

  const handleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const filteredTodos = (
    searchResults.length > 0 ? searchResults : todos
  ).filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    }
  });

  filteredTodos.map((todo) => {
    return (
      <TodoItem
        key={todo._id}
        updateTodo={updateTodo}
        mode={mode}
        handleMode={handleMode}
        todo={todo}
      />
    );
  });

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  
  return (
    <div className={mode === "dark" ? "dark-mode todos-bg" : "todos-bg"}>
      {/* MODAL */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              marginTop: "150px",
              borderRadius: "30px",
              backgroundColor: "rgba(255, 255, 255, 0.20)",
              backdropFilter: "blur(50px)",
              border: "5px solid white",
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Form className="mt-4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                    style={{ marginLeft: "11px", fontWeight: "bold" }}
                  >
                    Title
                  </Form.Label>
                  <Form.Control
                    className="rounded-pill"
                    name="etitle"
                    type="text"
                    placeholder="Title"
                    value={todo.etitle}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label
                    style={{ marginLeft: "11px", fontWeight: "bold" }}
                  >
                    Description
                  </Form.Label>
                  <Form.Control
                    style={{ borderRadius: "30px" }}
                    type="text"
                    name="edescription"
                    onChange={onChange}
                    value={todo.edescription}
                    placeholder="Description"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label
                    style={{ marginLeft: "11px", fontWeight: "bold" }}
                  >
                    Tag
                  </Form.Label>
                  <Form.Control
                    className="rounded-pill"
                    name="etag"
                    type="text"
                    placeholder="Tag"
                    value={todo.etag}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-pill"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-pill"
                onClick={handleClick}
              >
                Update Todo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex mt-3 position-absolute mx-3 justify-content-start flex-column">
      <div className="mode position-absolute justify-content-center mx-1">
        <SearchBar handleSearch={handleSearch} />
      </div>
        <div className="filter-container d-flex flex-column mt-3">
          <Button
            className={`filter-button ${
              filter === "all" && "active"
            } my-1 mt-4 rounded-pill`}
            onClick={() => handleFilterChange("all")}
          >
            <i className="bi bi-three-dots"></i>
          </Button>
          <Button
            className={`filter-button ${
              filter === "active" && "active"
            } my-1 rounded-pill`}
            onClick={() => handleFilterChange("active")}
          >
            <i className="bi bi-arrow-down-right-circle"></i>
          </Button>
          <Button
            className={`filter-button ${
              filter === "completed" && "active"
            } my-1 rounded-pill`}
            onClick={() => handleFilterChange("completed")}
          >
            <i className="bi bi-check-all"></i>
          </Button>
          <Button
            className="rounded-pill container btn-remove-completed my-1"
            onClick={handleRemoveCompleted}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </div>
      </div>
      <div className="mode d-flex mt-3 justify-content-end">
        <h6
          className="smMode"
          onClick={handleMode}
          style={{ marginTop: "22px", fontWeight: "700", cursor: "pointer" }}
        >
          {mode === "dark" ? "Light Mode" : "Dark Mode"}
        </h6>
        <i
          onClick={handleMode}
          className={
            mode === "dark"
              ? "bi bi-brightness-high-fill sun mx-3 my-2 rotate"
              : "bi bi-moon-fill moon mx-4 my-3 "
          }
        ></i>
      </div>
      <div className="container mt-3">
        <div className="container form-container">
          <h1
            className={
              mode === "dark"
                ? "text-center todos-heading-dark"
                : "text-center todos-heading"
            }
          >
            Add Todo
          </h1>
          <Form className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                value={todo.title}
                className={
                  mode === "dark"
                    ? "rounded-pill form-input-dark"
                    : "rounded-pill form-input"
                }
                name="title"
                type="text"
                placeholder="Write your Todo Title"
                onChange={onChange}
              />
              {errors.title && <p className="error-message">{errors.title}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                className={
                  mode === "dark"
                    ? "rounded-pill form-input-dark"
                    : "rounded-pill form-input"
                }
                value={todo.description}
                style={{ borderRadius: "30px" }}
                type="text"
                name="description"
                onChange={onChange}
                placeholder="Write your Todo Description"
              />
              {errors.description && (
                <p className="error-message">{errors.description}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Control
                value={todo.tag}
                className={
                  mode === "dark"
                    ? "rounded-pill form-input-dark"
                    : "rounded-pill form-input"
                }
                name="tag"
                type="tag"
                placeholder="Write your Todo Tag"
                onChange={onChange}
              />
            </Form.Group>

            <Button
              className={
                mode === "dark"
                  ? "rounded-pill container btn0-dark"
                  : "rounded-pill container btn0"
              }
              variant="primary"
              type="submit"
              onClick={handleClick}
              style={{ border: "3px solid white", letterSpacing: "3px" }}
            >
              Add Task
            </Button>
          </Form>
        </div>

        {/* NOTES MAP */}
        <div className="row">
          <h1
            className={
              mode === "dark"
                ? "mt-4 ml-3 text-center todos-heading2-dark"
                : "mt-4 ml-3 text-center todos-heading2"
            }
          >
            Your Todos
          </h1>
          <h3 className="text-center todos-heading3">
            {todos.length === 0 &&
              searchResults.length === 0 &&
              "Oops! No Todos To Display. Try Creating One"}
          </h3>
          {(searchResults.length > 0 ? searchResults : todos).map((todo) => {
            return (
              <TodoItem
                key={todo._id}
                updateTodo={updateTodo}
                mode={mode}
                handleMode={handleMode}
                todo={todo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todos;
