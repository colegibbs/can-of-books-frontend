import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile'
import LoginForm from './LoginForm';
import BookFormModal from './BookFormModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks';
import AddBookButton from './AddBookButton';
import axios from 'axios';
import UpdateModal from './UpdateModal';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books:[],
      user: null,
      userName: null,
      email: null,
      loginForm: false,
      showBookForm: false,
      showUpdateForm: false,
      loggedIn: false
      
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
      userName: null,
      email: null
    })
    console.log(this.state);
  }

  loginFormHandler = (userName, email) => {
    this.setState({
      userName: userName,
      email: email,
      loginForm: false,
      loggedIn: true
    })
  }

  addBookHandler = () => {
    console.log('hit');
    this.setState({
      showBookForm: true,
    })
  }

  addBookRemove =() => {
    this.setState({
      showBookForm: false,
    })
  }

  getBooks = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`
      let books = await axios.get(url);
      this.setState({
        books: books.data,
      })
    } catch(error) {
      console.log(error);
    }
  }

  postBook = async (newBook) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let createdBook = await axios.post(url, newBook);
      this.setState({
        books: [...this.state.books, createdBook.data],
      })
    } catch(error) {
      console.log('we have an error:', error.response.data);
    }
  }

  deleteBook = async (id) => {
    try{
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks  
      })
    } catch(error) {
      console.log('we have an error:', error.response.data);
    }
  }

  updateForm = () => {
    this.setState({
      showUpdateForm: true,
    });
  }

  hideUpdateForm = () => {
    this.setState({
      showUpdateForm: false,
    });
  }

  updateBook = async (updatedBook) => {
    try{
      let id = updatedBook._id;
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;
      let rebornBook = await axios.put(url, updatedBook);
      let newBooks = this.state.books.map(book => {
        return book._id === updatedBook._id ? rebornBook.data : book;
      })
      this.setState({
        books: newBooks,
      });
    } catch(error) {
      console.log('we have an error:', error.response.data);
    }
  }

  bookForUpdate = (book) => {
    this.setState({
      book: book
    });
  }

  componentDidMount() {
    this.getBooks();
  }
  

  render() {
    console.log(this.state)
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} onLogin={this.loginHandler}/>
          <BestBooks
           books={this.state.books}
           deleteBook={this.deleteBook}
           loggedIn={this.state.loggedIn}
           updateForm={this.updateForm}
           bookForUpdate={this.bookForUpdate}
           />
          <BookFormModal show={this.state.showBookForm} addBookRemove={this.addBookRemove} postBook={this.postBook}/>
          <UpdateModal 
            books = {this.state.books}
            show={this.state.showUpdateForm} 
            onHide={this.hideUpdateForm} 
            updateBook={this.updateBook}
            book={this.state.book}
          />
          <AddBookButton addBookHandler={this.addBookHandler}/>
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

          {this.state.loggedIn
          ?
          <>
          <h3>Welcome!</h3>    
          <p>User: {this.state.userName}</p>
          <p>User Email: {this.state.email}</p>
          </>
          :
          ''
          }

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
