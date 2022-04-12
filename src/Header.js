import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButtonAutho from "./LogoutButtonAutho";
import LoginButtonAutho from "./LoginButtonAutho";


class Header extends React.Component {
  render() {
    return (
      <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem>

        {this.props.auth0.isAuthenticated ? (
          <LogoutButtonAutho />
        ) : (
          <LoginButtonAutho />
        )}


        </NavItem>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
        <NavItem><Link to="/BestBooks" className="nav-link">Best Books</Link></NavItem>
      </Navbar>

      </>
    )
  }
}

export default withAuth0(Header);
