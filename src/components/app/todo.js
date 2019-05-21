import React, { Component } from 'react'
import Group from '@jetbrains/ring-ui/components/group/group';
import Button from '@jetbrains/ring-ui/components/button/button';
import Input from '@jetbrains/ring-ui/components/input/input';
import Text from '@jetbrains/ring-ui/components/text/text';
import { PencilIcon, TrashIcon } from '@jetbrains/ring-ui/components/icon/';

import './todo.css'


class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEditing: false, 
            task: this.props.task,
            empty: false
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
        if (this.state.task) {
            this.props.updateTodo(this.props.id, this.state.task);
            this.setState({isEditing: false})
        } else {
            this.setState({ empty: true})
        }
    }

    handleChange(e) {
        this.setState({
            task: e.target.value,
            empty: false
        }) 
    }

    handleCompletion(e) {
        this.props.toggleTodo(this.props.id);
    }

    render() {
        let result;
        if (this.state.isEditing) {
            result = (
                <li className="todo">
                    <Group className="todo-task">
                        <Input 
                            type="text" 
                            value={this.state.task} 
                            name="task"
                            onChange={this.handleChange}
                            className="edit-field-wrap"
                        />
                        <Button className="edit-btn" onClick={this.handleSave}>Save</Button>
                    </Group> 
                </li>
            )
        } else {
            result = (
                    <li className={this.props.completed ? 'todo-task completed' : 'todo-task'}>
                        <Text 
                            onClick={this.handleCompletion}
                            className={this.props.completed ? 'task-text completed' : 'task-text'}
                        >
                            { this.props.task }
                        </Text>
                        <Group className="todo-buttons">
                            <Button 
                                primary 
                                icon={PencilIcon}
                                onClick={this.toggleEdit}
                            >
                                Edit
                            </Button> 
                            <Button 
                                primary 
                                danger 
                                icon={TrashIcon} 
                                onClick={this.handleRemove}
                            >
                                Delete
                            </Button>
                        </Group>
                    </li>
            )
        }
        return result;
    };
}

export default Todo