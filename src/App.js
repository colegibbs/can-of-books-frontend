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

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books:[],
      user: null,
      userName: '',
      email: '',
      loginForm: false,
      showBookForm: false,
    }
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
      let url = `&{process.env.REACT_APP_SERVER}/books/${id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks  
      })
    } catch(error) {
      console.log('we have an error:', error.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }
  

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} onLogin={this.loginHandler}/>
          <BestBooks
           books={this.state.books}
           deleteBook={this.deleteBook}
           
           
           />
          <BookFormModal show={this.state.showBookForm} addBookRemove={this.addBookRemove} postBook={this.postBook}/>
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
