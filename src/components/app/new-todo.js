import React, { Component } from 'react'
import uuid from 'uuid/v4';
// import "./NewTodo.css";


class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {task: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }) 
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createTodo({...this.state, id: uuid(), completed: false});
        this.setState({task: ""});
    } 

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="task">New Todo</label>
                <input 
                    id="task" 
                    name="task"
                    type="text"
                    value={this.state.task}
                    placeholder="New Todo"
                    onChange={ this.handleChange }
                />
                <button>Add Todo</button>
            </form>
        );
    };
}

export default NewTodo