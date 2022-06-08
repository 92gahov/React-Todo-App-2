import React from 'react';
import './App.css';
import Form from './Components/Form';

class App extends React.Component {

  render() {
    const { title, handleChange, handleSubmit, editTodo, handleEdit } = this.props;
    return (
      <div className="App">
        <Form title={title}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editTodo={editTodo}
          handleEdit={handleEdit} />
      </div>
    )
  }
};

export default App;

