import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Movies from './pages/Movies';
import List from './pages/List';

class App extends Component {


  
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Movies}/>
          <Route path='/list' component={List}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;