import React, {Component} from 'react';
import Island, { AdaptiveIsland, Header, Content } from '@jetbrains/ring-ui/components/island/island';
// import { Tabs, Tab, SmartTabs, CustomItem } from '@jetbrains/ring-ui/components/tabs/tabs';
import Group from '@jetbrains/ring-ui/components/group/group';
import Button from '@jetbrains/ring-ui/components/button/button';


import './todo-list.css'
import Todo from './todo'
import NewTodo from './new-todo'

import Data from '../../../incoming-data/todo-list' 


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : [],
            tab: 'all'
        }
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
        this.showAll = this.showAll.bind(this);
        this.showActive = this.showActive.bind(this);
        this.showCompleted = this.showCompleted.bind(this);
    }


    componentDidMount() {
        if (localStorage.hasOwnProperty('todos')) {
            if (localStorage.getItem('todos').length > 2) {
                // Читаем из нашего localstorage
                this.getFromLocalStorage();
            } else {
                // Читаем из нашего JSONа
                let data = Data.todoList.map((todo) => {
                    todo.completed = (todo.completed == "false") ? false : true;
                    return todo;
                })
                this.setState({ todos : data});
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


    showAll() {
        this.setState({
            tab : "all"
        })
    }
    
    showActive() {
        this.setState({
            tab : "active"
        })
    }

    showCompleted() {
        this.setState({
            tab : "completed"
        })
    }

    render() {
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
        
        const completed = todos.filter(todo => todo.props.completed);
        const active = todos.filter(todo => !todo.props.completed);
        const tab = this.state.tab;

        return(
            <Island className="limited-island" narrow>
                <Header className="island-header" border>
                    <h1 className="heading">Todo List</h1>
                    <p className="info">With React and Ring UI</p>
                    <NewTodo createTodo={this.create}/>
                    <Group>
                        <Button 
                            onClick={this.showAll} 
                            active={tab == 'all'} 
                            name="all" 
                            title="Show all">
                            Show all
                        </Button>
                        <Button 
                            onClick={this.showActive} 
                            active={tab == 'active'} 
                            name="active" 
                            title="Show active">
                            Show active
                        </Button>
                        <Button 
                            onClick={this.showCompleted} 
                            active={tab == 'completed'} 
                            name="completed" 
                            title="Show completed">
                            Show completed
                        </Button>
                    </Group>
                </Header>
                <Content className="island-content" fade>
                    <ul>
                        { (tab == "all") ? todos : (tab == "active") ? active : completed }
                    </ul>
                </Content>
            </Island>
        )
    }
}


export default TodoList;