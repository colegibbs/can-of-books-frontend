import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {Container, Card, Button} from "react-bootstrap"

let SERVER = process.env.REACT_APP_SERVER;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchedBooks: [],
      books:[]
    };
  }
  getGoogleBooks = async (e) => {
    e.preventDefault()
    try {
      let searchedBooks = await axios.get(`${SERVER}/googlebooks?q=${this.state.query}`);
      this.setState({
        searchedBooks: searchedBooks.data
      });
      console.log(searchedBooks);
    } catch (error) {
      console.log('error updating', error.message);
    }
  };
  handleFormInput = (e) => {
    this.setState({
      query: e,
    });
  }
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


  handleNewBook = (element) => {
    let newBook = {
      title: element.title,
      description: element.description,
      status: false,
      email: this.props.auth0.user.email,
    }

    this.postBook(newBook);
  }
  render() {
    console.log(this.state)

    let renderedBooks = this.state.searchedBooks.map((element, index) => {
      return(
              <Card className="individual-card" key={index} >
        <Card.Body className="real-card-body">
          <Card.Title>{element.title}</Card.Title>
          <Card.Text>
          {element.author}
          </Card.Text>
          <Card.Text>
          {element.description}
          </Card.Text>
          <Card.Text>
          <a class="btn btn-primary" href={element.canonicalVolumeLink} target="_blank" rel="noopener noreferrer">Link to Book</a>
          {/* <iframe src= {element.canonicalVolumeLink} title={element.canonicalVolumeLink}></iframe>  */}
          </Card.Text>
          <Button onClick={() => this.handleNewBook(element)}>Add To Bookshelf</Button>
        </Card.Body>
      </Card>
        );
    })

    return (
      <>
      <h2>Hello, {this.props.auth0.user.name}</h2>
              <Container className="search-bar">
          <form >
            <label className="search-label">Find a Book: </label>
            <input type="text" onInput={(event) => { this.handleFormInput(event.target.value) }} placeholder="Powered by Google Books "></input>
            <button onClick={this.getGoogleBooks} >Search Books</button>
          </form>
        </Container>

      <Container>
        {renderedBooks}
      </Container>
      </>
    );
  }
}

export default withAuth0(Main);
