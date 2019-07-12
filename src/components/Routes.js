import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage'
import history from './history';
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/dashboard' component={DashboardPage} />
      </Switch>
    );
  }
}

export default Routes;
