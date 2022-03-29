import { Component } from "react";
import {  Button } from 'react-bootstrap';

class LogoutButton extends Component {

  render() {
    return (
      <Button onClick={this.props.onLogout}>Logout</Button>
    );
  }
};

export default LogoutButton;
