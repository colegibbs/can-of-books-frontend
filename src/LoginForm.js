import { Component } from "react";
import { Form, Button } from 'react-bootstrap';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.State = {
      username: '',
      email: '',
    }
  }

  usernameHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      username: e.target.value,
    })
  }

  emailHandler = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  infoHandler =(e) => {
    e.preventDefault();
    this.props.loginFormHandler(this.state.username, this.state.email);
  }

  render() {
    /* TODO: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
      <Form>
        <Form.Group controlId='username'>
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control type="text" placeholder="Enter Username" onInput={this.usernameHandler}/>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control type="text" placeholder="Enter Email" onInput={this.emailHandler}/>
        </Form.Group>
        <Button type="submit" onClick={this.infoHandler}>Login</Button>
      </Form>
    );
  }
};

export default LoginForm;
