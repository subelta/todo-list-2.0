import React, {Component} from 'react';
import Island, { AdaptiveIsland, Header, Content } from '@jetbrains/ring-ui/components/island/island';

import './todo-list.css'
import Todo from './todo'
import NewTodo from './new-todo'


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : []
        }
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }

    create(newTodo) {
        this.setState({
            todos: [...this.state.todos, newTodo] 
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
            <AdaptiveIsland className="limited-island" narrow>
                <Header border>
                    Todo List
                    <p>Todo list with React and Ring UI</p>
                    <NewTodo createTodo={this.create}/>
                </Header>
                <Content fade>
                    <ul>
                        { todos }
                    </ul>
                </Content>
            </AdaptiveIsland>
        )
    }
}

    //   <AdaptiveIsland className="limited-island" narrow>
    //     <Header>Title</Header>
    //     <Content fade>
    //       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
    //       standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
    //       make a type specimen book. It has survived not only five centuries, but also the leap into electronic
    //       typesetting, remaining essentially unchanged.
    //     </Content>
    //   </AdaptiveIsland>
    // )
  

  export default TodoList;