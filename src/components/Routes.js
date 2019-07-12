import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import TablesPage from './pages/TablesPage';
import MapsPage from './pages/MapsPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage'
import history from './history';
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/tables' component={TablesPage} />
        <Route path='/maps' component={MapsPage} />
        <Route path='/404' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
