import React from "react";

let url = "http://localhost:3001";

class Form extends React.Component {
    constructor() {
        super()

        this.state = {
            inputText: ""
        }
        this.input = React.createRef();
    };

    inputChange(e) {
        this.setState({
            inputText: e.target.value
        })
    };

    addTodo(e) {
        const newEv = {
            event: this.state.inputText,
            completed: false
        }
        if (this.input.current.value === "") {
            alert("Please fill out the field !")
            return false
        } else {
            fetch(url + "/todos", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(newEv)
            })
                .then(res => res.json())
            this.setState({
                inputText: ""
            })
        }
        window.location.reload(false);
    };

    componentDidMount() {
        this.input.current.focus();
    };

    render() {
        return (
            <main>
                <div className="main">
                    <div>
                        <textarea ref={this.input} onChange={e => this.inputChange(e)} value={this.state.inputText} cols="44" rows="3" placeholder="Make event..."></textarea>
                    </div>
                    <div className="add-btn">
                        <button onClick={e => this.addTodo(e)}>Add new</button>
                    </div>
                </div>
            </main>
        )
    };
};

export default Form;