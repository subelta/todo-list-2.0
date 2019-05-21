import React, {Component} from 'react';
import Auth from '@jetbrains/ring-ui/components/auth/auth';
import TodoList from './todo-list'

import './app.css';

export default class AppRoot extends Component {
  componentDidMount() {
    // You can uncomment this after registering your client as a Hub service
    // https://www.jetbrains.com/help/hub/2017.3/OAuth-2.0-Authorization.html#d79479e312
    // this.auth.init();
  }

  auth = new Auth({
    // clientId: <your client id here>
    serverUri: 'https://hub.jetbrains.com' // replace with your Hub server
  });

  render() {
    return (
      <TodoList />
    );
  }
}
