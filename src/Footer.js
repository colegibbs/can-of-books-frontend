import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './footer.css'


class Footer extends React.Component {
  render() {
    return (
      <Navbar className='fixed-bottom' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>©Thomas Basham & Cole Gibbs </Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
