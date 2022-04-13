import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButtonAutho from "./LogoutButtonAutho";


class Header extends React.Component {
  render() {
    return (
      <>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className='fixed-top'>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/Bookshelf" className="nav-link">Your Digital Bookshelf</Link></NavItem>
        <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
       
        {this.props.auth0.isAuthenticated ? (
          <LogoutButtonAutho />
        ) : (
          ""
        )}
      </Navbar>

      </>
    )
  }
}

export default withAuth0(Header);
