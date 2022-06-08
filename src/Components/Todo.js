import React from "react";
import check from "../Components/img/circle-check-solid.svg";
import undo from "../Components/img/undo.svg";
import remove from "../Components/img/trash-can-solid.svg";
import edit from "../Components/img/pencil.png";

class Todo extends React.Component {

    editTodo = (e) => {
        const id = e.target.getAttribute("data-edit");
        this.props.editTodo(id);
    };

    finishTodo = (e) => {
        const id = e.target.getAttribute("data-check");
        this.props.finishTodo(id);
    };

    undoTodo = (e) => {
        const id = e.target.getAttribute("data-undo");
        this.props.undoTodo(id);
    };

    deleteTodo = (e) => {
        const id = e.target.getAttribute("data-remove");
        this.props.deleteTodo(id);
    };

    render() {
        const { event, id, completed } = this.props;
        return (
            <div className="output">
                <div className="event-info">
                    <p className={`todo-item ${completed ? "completed" : ""}`}>{event}</p>
                </div>
                <div className="edit">
                    <img alt="edit"
                        src={edit}
                        onClick={this.editTodo}
                        data-edit={id}
                        title="Edit event!"></img>
                </div>
                <div className="check">
                    <img alt="check"
                        src={check}
                        onClick={this.finishTodo}
                        data-check={id}
                        title="Finish event!"></img>
                </div>
                <div className="undo">
                    <img alt="undo"
                        onClick={this.undoTodo}
                        data-undo={id} src={undo}
                        title="Undo finish event!"></img>
                </div>
                <div className="remove">
                    <img alt="remove"
                        src={remove}
                        onClick={this.deleteTodo}
                        data-remove={id}
                        title="Delete event!"></img>
                </div>
            </div>
        )
    }
};

export default Todo;