import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './components/history';
import LoginPage from './components/pages/LoginPage';
import Routes from '../src/components/Routes';
import { Route, Switch } from 'react-router-dom';


ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/login' exact component={LoginPage} />
            <Routes />
        </Switch>
        {/* <App /> */}
    </Router>, document.getElementById('root'));
registerServiceWorker();
