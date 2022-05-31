import React from "react";

let url = "http://localhost:3001";

class TodoCount extends React.Component {
    constructor() {
        super()

        this.state = {
            todos: []
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

    render() {
        let { count } = "";
        if (this.state.todos.length === 1) {
            count = "todo"
        } else {
            count = "todos"
        }

        return (
            <div className="count">
                <p>You have {this.state.todos.length} {count}</p>
            </div>
        )
    };
};

export default TodoCount;