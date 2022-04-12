import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ListGroup } from "react-bootstrap";
import "./profile.css"
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  getBooks = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let books = await axios.get(url);
      this.setState({
        books: books.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteBook = async (id,) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter((book) => book._id !== id);
      this.setState({
        books: updatedBooks,
      });
    } catch (error) {
      console.log("we have an error:", error.response.data);
    }
  };

  componentDidMount() {
    this.getBooks();
  }

  render() {
    console.log(this.props.auth0.user.picture)
    let deleteButtons = this.state.books.map((book, idx) => {
      return (
        <ListGroup.Item key={idx}  style={{padding: 2, }}>
          <p >{book.title}</p>
          <p ><strong>{book.author}</strong></p>
          <Button variant="danger" onClick={() => this.deleteBook(book._id)} size="sm">
              Delete a Book
          </Button>
        </ListGroup.Item>
      );
    });

    return (
      <>
      <div style={{ marginBlock: 90, paddingTop:20 }}>
      <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name} />
      <h2>{this.props.auth0.user.name}</h2>
      <p className="tealOpac" >{this.props.auth0.user.email}</p>
      </div>

      <ListGroup>
        <ListGroup.Item>
        <h2 className="display-4" > Manage Books </h2>
        </ListGroup.Item>
        {deleteButtons}
      </ListGroup>

    </>

    )
  }
};

export default withAuth0(Profile);
