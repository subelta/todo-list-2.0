import React, { Component } from 'react'
import Input from '@jetbrains/ring-ui/components/input/input';
import Group from '@jetbrains/ring-ui/components/group/group';
import Button from '@jetbrains/ring-ui/components/button/button';

import uuid from 'uuid/v4';
import './new-todo.css'


class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            danger: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submit = this.submit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    submit() {
        if (this.state.task) {
            this.props.createTodo({...this.state, id: uuid(), completed: false});
        } else {
            this.setState({ danger: true})
        }
        this.setState({task: ""});
    }

    handleChange(e) {
        this.setState({
            task: e.target.value,
            danger: false
        }) 
    }

    handleSubmit() {
        this.submit();
    } 

    handleKeyPress(e) {
        if(e.keyCode == 13){
            this.submit();
        }
    }

    render() {
        return(
            <Group className="form">
                <Input 
                    id="task"
                    name="task"
                    label="Input todo" 
                    className="input-wrapper"
                    inputClassName="input-field"
                    value={this.state.task}
                    onChange={ this.handleChange }
                    autoComplete="off"
                    error={this.state.danger ? 'Input something!' : null}
                    // clearable="true"
                    onKeyDown={this.handleKeyPress}
                />
                <Button 
                    primary 
                    delayed 
                    className="add-todo-btn"
                    onMouseDown={this.handleSubmit}>
                    Add Todo
                </Button>
            </Group>
        );
    };
}

export default NewTodo