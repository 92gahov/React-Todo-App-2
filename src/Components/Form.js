import React from "react";
import TodoList from "./TodoList";

let url = "http://localhost:3001";
let eventId;

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            title: "",
            editTodo: false
        };
        this.input = React.createRef();
    };

    getTodos = () => {
        fetch(url + "/todos")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    todos: data
                })
            })
    };

    componentDidMount() {
        this.getTodos();
        this.input.current.focus();
    };

    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    };

    handleSubmit = (e) => {
        const newEv = {
            event: this.state.title,
            completed: false
        }
        if (this.state.title === "") {
            alert("Please fill out the field !");
            return false;
        } else {
            fetch(url + "/todos", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(newEv)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        todos: [...this.state.todos, data],
                        title: "",
                        editTodo: false
                    })
                })
        }
        this.input.current.focus();
    };

    editTodo = (todoId) => {
        eventId = todoId;
        const selectedTodo = this.state.todos.find(todo => todo.id == todoId);
        this.setState({
            title: selectedTodo.event,
            editTodo: true
        })
        this.input.current.focus();
    };

    handleEdit = (e) => {
        const editEvent = {
            event: this.state.title
        }
        fetch(url + "/todos/" + eventId, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(editEvent)
        })
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id == eventId) {
                    return {
                        ...todo, event: this.state.title
                    }
                }
                return todo
            }),
            title: "",
            editTodo: false
        })
        this.input.current.focus();
    };

    finishTodo = (todoId) => {
        const finish = {
            completed: true
        }
        fetch(url + "/todos/" + todoId, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(finish)
        })
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id == todoId) {
                    return {
                        ...todo, completed: true
                    }
                }
                return todo
            }),
        })
        this.input.current.focus();
    };

    undoTodo = (todoId) => {
        const undo = {
            completed: false
        }
        fetch(url + "/todos/" + todoId, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(undo)
        })
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id == todoId) {
                    return {
                        ...todo, completed: false
                    }
                }
                return todo
            })
        })
        this.input.current.focus();
    };

    deleteTodo = (todoId) => {
        fetch(url + "/todos/" + todoId, {
            method: "DELETE"
        })
        this.setState({
            todos: this.state.todos.filter(todo => todo.id != todoId)
        })
        this.input.current.focus();
    };

    render() {
        let addBtn = <button className="addBtn" onClick={e => this.handleSubmit(e)}>Add new</button>
        let editBtn = <button className="editBtn" onClick={e => this.handleEdit(e)}>Edit event</button>
        let count = "";
        if (this.state.todos.length === 1) {
            count = "event"
        } else {
            count = "events"
        };
        return (
            <main>
                <div className="main">
                    <div>
                        <textarea ref={this.input}
                            value={this.state.title}
                            onChange={e => this.handleChange(e)} cols="44" rows="3" placeholder="Make an event..."></textarea>
                    </div>
                    <div className="add-btn">
                        {
                            this.state.editTodo ? editBtn : addBtn
                        }
                    </div>
                    <TodoList todos={this.state.todos}
                        deleteTodo={this.deleteTodo}
                        finishTodo={this.finishTodo}
                        undoTodo={this.undoTodo}
                        editTodo={this.editTodo}
                        handleEdit={this.handleEdit} />
                </div>
                <div className="count">
                    <p>You have {this.state.todos.length} {count}</p>
                </div>
            </main>
        )
    }
};

export default Form;