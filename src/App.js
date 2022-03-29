import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile'
import LoginForm from './LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userName: '',
      email: '',
      loginForm: false,
    }
  }

  loginHandler = (user) => {
    this.setState({
      user: 'user profile',
      loginForm: true,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  loginFormHandler = (userName, email) => {
    this.setState({
      userName: userName,
      email: email,
    })
  }
  

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} onLogin={this.loginHandler} />
          <BestBooks/>
          <Switch>
            <Route exact path="/">
              {/* <BestBooks/> */}
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route>
            <Route exact path="/profile">
              <Profile/>
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>

          {this.state.loginForm
          ?
          <LoginForm loginFormHandler={this.loginFormHandler}/>
          :
          ''
          }
          <p>{this.state.userName}</p>
          <p>{this.state.email}</p>
          {/* <Switch>
            <Route exact path >

            </Route>

          </Switch> */}
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
