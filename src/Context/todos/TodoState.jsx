import React, { useState } from "react";
import TodoContext from "./todoContext";
const TodoState = (props) => {
  // const host = "https://taskly-backend.onrender.com";

    const todosInitial = [];
    const [todos, setTodos] = useState(todosInitial);

    // GET ALL NOTES
    const getTodos = async () => {
      // API CALL
      const response = await fetch (`/api/todos/fetchtodos`,{
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'auth-token' : localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json);
      setTodos(json);

    }

        // Add a todo
        const addTodo = async (title,description,tag) => {
          // API CALL
          const response = await fetch (`/api/todos/addtodos`,{
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
          const todo = await response.json();
          setTodos(todos.concat(todo));
        }
        // delte a todo
        const deleteTodo = async (id) => {
          //  API CALL
            const response = await fetch (`/api/todos/deletetodo/${id}`,{
              method: 'DELETE',
              headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
              }});
            const json = response.json();
          console.log(json);
          const newTodos = todos.filter((todo)=> { return todo._id !== id })
          setTodos(newTodos);
        }
        // Edit a todo
        const editTodo = async (id, title, description, tag) => {
          // API CALL
          const response = await fetch (`/api/todos/updatetodo/${id}`,{
            method: 'PUT',
            headers: {
              'Content-Type' : 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
          const json = await response.json();
          console.log(json);
          // LETS CREATE A NEW NOTES ARRAY
          let newTodos = JSON.parse(JSON.stringify(todos));
        //  LOGIC to edit in client 
          for (let index = 0; index < newTodos.length; index++) {
            const element = newTodos[index];
            if (  element._id === id){
              newTodos[index].title = title;
              newTodos[index].description = description;
              newTodos[index].tag = tag;
              break;
            }
          }         
          setTodos(newTodos) 
        }


    return (
        <TodoContext.Provider value={{ todos,addTodo,deleteTodo, editTodo, getTodos}}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState;







