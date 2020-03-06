import React, {useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4'; //cretes random ids for us

const LOCAL_STORAGE_KEY = 'todoApp.todaos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef(); //creating hook

  useEffect(() => { //make sure our todos stay if refreshed
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos] //create copy of current todo list cause we never change the original directly!!
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete;
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === "") return; //don't enter an empty todo
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null //clear box once hit enter
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="container">
      <div className="top">
        <input ref={todoNameRef} type="text" />
        <button className="addBtn" onClick={handleAddTodo}>Add ToDo Item</button><br></br>
      </div>
      <div className="bottom">
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        <div className="todos">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        <div><button className="clear" onClick={handleClearTodos}>Clear Complete Items</button></div>
      </div>
    </div>
  );
}

export default App;
