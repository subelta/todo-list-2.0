import React, { Component } from 'react'
import './todo.css'

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEditing: false, 
            task: this.props.task,
        }; 

        this.handleRemove = this.handleRemove.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCompletion = this.handleCompletion.bind(this);
        
    }
    handleRemove() {
        this.props.removeTodo(this.props.id);
    }

    toggleEdit() {
        this.setState({isEditing : !this.state.isEditing});
    }

    handleSave(e) {
        e.preventDefault();
        this.props.updateTodo(this.props.id, this.state.task);
        this.setState({isEditing: false})
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }) 
    }

    handleCompletion(e) {
        this.props.toggleTodo(this.props.id);
    }

    render() {
        let result;
        if (this.state.isEditing) {
            result = (
                <div>
                    <form onSubmit={this.handleSave}>
                        <input 
                            type="text" 
                            value={this.state.task} 
                            name="task"
                            onChange={this.handleChange}
                        />
                        <button>Save</button>
                    </form> 
                </div>
            )
        } else {
            result = (
                <div>
                    <li 
                        className={this.props.completed ? 'todo-task completed' : 'todo-task'}
                        onClick={this.handleCompletion}
                    >
                        { this.props.task }
                    </li>
                    <div>
                        <button onClick={this.toggleEdit}>
                            Edit
                        </button>
                        <button onClick={this.handleRemove}>
                            X
                        </button>
                    </div>
                    
                    
                </div>
            )
        }
        return result;
    };
}

export default Todo