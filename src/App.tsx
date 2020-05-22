import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import HomeComponent from './components/home-component/HomeContainer';
import LoginComponent from './components/login-component/LoginContainer';
import NavbarComponent from './components/navbar-component/NavbarContainer';
import RegisterComponent from './components/register-component/RegisterContainer';
import ReimbComponent from './components/reimbursement-component/ReimbursementContainer'

import { Provider } from 'react-redux';
import { store } from './Store';
import UserComponent from './components/user-component/UserContainer';
import LogoutComponent from './components/logout-component/LogoutComponent';

function App() {

  return (
    <div>
      <Provider store={store}>
        <Router>
          <AppBar color='primary' position='static'>
            <Toolbar>
              <Typography variant='h5' color='inherit'>
              <NavbarComponent />
              </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path='/home' render={() => <HomeComponent />} />
            <Route path='/login' render={() => <LoginComponent />} />
            <Route path='/register' render={() => <RegisterComponent />} />
            <Route path='/reimbursements' render={() => <ReimbComponent />} />
            <Route path='/users' render={() => <UserComponent />} />   
            <Route path="/logout" render={() => <LogoutComponent /> } />         
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
