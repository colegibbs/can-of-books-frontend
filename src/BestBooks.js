import React from "react";
import BookFormModal from "./BookFormModal";
import "bootstrap/dist/css/bootstrap.min.css";
import AddBookButton from "./AddBookButton";
import axios from "axios";
import UpdateModal from "./UpdateModal";
import { withAuth0 } from "@auth0/auth0-react";
import { Button, Carousel } from "react-bootstrap";

// import axios from 'axios';
import UpdateButton from "./UpdateButton";

// let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      user: null,
      userName: null,
      email: this.props.auth0.user,
      loginForm: false,
      showBookForm: false,
      showUpdateForm: false,
      loggedIn: false,
    };
  }

  addBookHandler = () => {
    console.log("hit");
    this.setState({
      showBookForm: true,
    });
  };

  addBookRemove = () => {
    this.setState({
      showBookForm: false,
    });
  };

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

  postBook = async (newBook) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let createdBook = await axios.post(url, newBook);
      this.setState({
        books: [...this.state.books, createdBook.data],
      });
    } catch (error) {
      console.log("we have an error:", error.response.data);
    }
  };

  deleteBook = async (id) => {
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

  updateForm = () => {
    this.setState({
      showUpdateForm: true,
    });
  };

  hideUpdateForm = () => {
    this.setState({
      showUpdateForm: false,
    });
  };

  updateBook = async (updatedBook) => {
    try {
      let id = updatedBook._id;
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;
      let rebornBook = await axios.put(url, updatedBook);
      let newBooks = this.state.books.map((book) => {
        return book._id === updatedBook._id ? rebornBook.data : book;
      });
      this.setState({
        books: newBooks,
      });
    } catch (error) {
      console.log("we have an error:", error.response.data);
    }
  };

  bookForUpdate = (book) => {
    this.setState({
      book: book,
    });
  };

  componentDidMount() {
    this.getBooks();
  }
  handleClick = () => {
    this.bookForUpdate(this.props.book);
    this.updateForm();
  };

  render() {
    console.log(this.state.books);
    let books = this.state.books.map((book, idx) => {
      return book.email === this.props.auth0.user.email 
      ?(
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src="https://dummyimage.com/800x400.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{book.title}</h3>

            <p>{book.description}</p>
            {book.status ? <p>Read🧑‍🏫</p> : <p>Haven't Read yet 🚫</p>}
            <p>{book.email}</p>
            <UpdateButton
              updateForm={this.updateForm}
              loggedIn={this.loggedIn}
              book={book}
              bookForUpdate={this.bookForUpdate}
            />
            <Button variant="danger" onClick={() => this.deleteBook(book._id)}>
              Delete a Book
            </Button>
          </Carousel.Caption>
          <Carousel.Caption></Carousel.Caption>
          <UpdateModal
            books={this.state.books}
            show={this.state.showUpdateForm}
            onHide={this.hideUpdateForm}
            updateBook={this.updateBook}
            book={book}
          />
        </Carousel.Item>
      ) 
      :(
        ""
      );
    });

    let deleteButtons = this.state.books.map((book, idx) => {
      return (
        <li key={idx} className="row">
          <p className="col">{book.title}</p>
        </li>
      );
    });

    return (
      <>
        {this.state.books.length > 0 ? (
          <>
            <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

            <Carousel>{books} </Carousel>
            <ul style={{ width: 300 }}>
              <h2> Manage Books </h2>
              {deleteButtons}
            </ul>
          </>
        ) : (
          <h3> No Books Found </h3>
        )}
        <Button onClick={this.addBookHandler}>Add Book</Button>
        <BookFormModal
          email={this.props.auth0.user.email}
          show={this.state.showBookForm}
          addBookRemove={this.addBookRemove}
          postBook={this.postBook}
        />
      </>
    );
  }
}

export default withAuth0(BestBooks);
