import React from 'react';
import './App.css';
import Form from './Components/Form';
import TodoList from './Components/TodoList';
import TodoCount from './Components/TodosCount';


function App() {
  return (
    <div className="App">
      <Form />
      <TodoList />
      <TodoCount />
    </div>
  );
}

export default App;
