import React from "react";
import Todo from "./Todo";

class TodoList extends React.Component {
    render() {
        const { todos, deleteTodo, finishTodo, undoTodo, editTodo, handleEdit } = this.props;
        return (
            <div >
                {
                    todos.map(todo => {
                        return <Todo key={todo.id}
                            event={todo.event}
                            id={todo.id}
                            completed={todo.completed}
                            deleteTodo={deleteTodo}
                            finishTodo={finishTodo}
                            undoTodo={undoTodo}
                            editTodo={editTodo}
                            handleEdit={handleEdit} />
                    })
                }
            </div>
        )
    }
};

export default TodoList;