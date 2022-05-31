import React from "react";
import check from "./img/circle-check-solid.svg";
import remove from "./img/trash-can-solid.svg";
import undo from "./img/undo.svg";

let url = "http://localhost:3001";

class Todo extends React.Component {
    constructor() {
        super();

        this.state = {
            todos: [],
        }
    };

    getTodos() {
        fetch(url + "/todos")
            .then(res => res.json())
            .then((json) => {
                this.setState({
                    todos: json
                })
            })
    };

    componentDidMount() {
        this.getTodos()
    };

    finishTodo(e) {
        const id = e.target.getAttribute("data-check")
        const finish = {
            completed: true
        }
        fetch(url + "/todos/" + id, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(finish)
        })
            .then(res => res.json())
        window.location.reload(false);
    };

    undoTodo(e) {
        const id = e.target.getAttribute("data-undo")
        const undo = {
            completed: false
        }
        fetch(url + "/todos/" + id, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(undo)
        })
            .then(res => res.json())
        window.location.reload(false)
    }

    removeTodo(e) {
        const id = e.target.getAttribute("data-remove")
        fetch(url + "/todos/" + id, {
            method: "DELETE",
        })
            .then(res => res.json())
        window.location.reload(false);
    };

    render() {
        const { todos } = this.state;
        return (
            <div>
                {
                    todos.map((todo) => (
                        <div className="output" key={todo.id}>
                            <div className="event-info">
                                <p className={`todo-item ${todo.completed ? "completed" : ""}`}>{todo.event}</p>
                            </div>
                            <div className="check">
                                <img onClick={e => this.finishTodo(e)} alt="check" src={check} data-check={todo.id} title="Finish event!"></img>
                            </div>
                            <div className="undo">
                                <img onClick={e => this.undoTodo(e)} alt="undo" src={undo} data-undo={todo.id} title="Undo finish event!"></img>
                            </div>
                            <div className="remove">
                                <img onClick={e => this.removeTodo(e)} alt="remove" src={remove} data-remove={todo.id} title="Delete event!"></img>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    };
};

export default Todo;