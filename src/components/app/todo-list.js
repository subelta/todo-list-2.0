import React, {Component} from 'react';
import Island, { AdaptiveIsland, Header, Content } from '@jetbrains/ring-ui/components/island/island';
import { Tabs, Tab, SmartTabs, CustomItem } from '@jetbrains/ring-ui/components/tabs/tabs';

import './todo-list.css'
import Todo from './todo'
import NewTodo from './new-todo'

import Data from '../../../incoming-data/todo-list' 


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : [],
        }
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }


    componentDidMount() {
        if (localStorage.hasOwnProperty('todos')) {
            if (localStorage.getItem('todos').length > 2) {
                // Читаем из нашего localstorage
                console.log(localStorage.getItem('todos'));
                this.getFromLocalStorage();
            } else {
                // Читаем из нашего JSONа
                let data = Data.todoList.map((todo) => {
                    todo.completed = (todo.completed == "false") ? false : true;
                    return todo;
                })
                this.setState({ todos : data});
                console.log("srbtefvdAS");
            }
        } 
    
        window.addEventListener("beforeunload", this.saveToLocalStorage.bind(this));
    }
    
    componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveToLocalStorage.bind(this)
        );
        this.saveToLocalStorage();
    }

    getFromLocalStorage() {
        let list = localStorage.getItem('todos');    
        list = JSON.parse(list) || [];
        this.setState({ todos : list });
    }

    saveToLocalStorage() {
        for (let key in this.state) {
          localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }


    create(newTodo) {
        this.setState({
            todos: [newTodo, ...this.state.todos] 
        });
    }

    remove(id) {
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        });
    }

    update(id, updatedTask) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return {...todo, task: updatedTask};
            }
            return todo;
        })
        this.setState({todos: updatedTodos});
    }

    toggleCompletion(id) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return {...todo, completed: !todo.completed};
            }
            return todo;
        })
        this.setState({todos: updatedTodos});
    }

    render() {
        // console.log(this.state.todos)
        // localStorage.setItem('todos', JSON.stringify(this.state.todos));
        const todos = this.state.todos.map(todo => {
            return <Todo 
                        key={todo.id} 
                        id={todo.id}
                        task={todo.task} 
                        completed={todo.completed}
                        removeTodo={this.remove} 
                        updateTodo={this.update}
                        toggleTodo={this.toggleCompletion}
                    />;
        });
        return(
            <Island className="limited-island" narrow>
                <Header className="island-header" border>
                    <h1 className="heading">Todo List</h1>
                    <p className="info">With React and Ring UI</p>
                    <NewTodo createTodo={this.create}/>
                    {/* <Tabs></Tabs> */}
                </Header>
                <Content fade>
                    <ul>
                        { todos }
                    </ul>
                </Content>
            </Island>
        )
    }
}


export default TodoList;