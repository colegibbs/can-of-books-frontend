import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try {
      let url = `${SERVER}/books?title=Musashi`
      let books = await axios.get(url);
      this.setState({
        books: books.data,
      })
    } catch(error) {
      console.log(error);
    }
    // let apiUrl = `${SERVER}/books`
    // if(title) {
    //   apiUrl += `?title = ${title}`
    // }
    // console.log(apiUrl);
    // try {
    //   const response = await axios.get(apiUrl);
    //   this.setState({
    //     books: response.data,
    //   });
    // } catch(error) {
    //   console.log(error);
    // }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  componentDidMount() {
    this.getBooks();
  }

  render() {
    let books = this.state.books.map((book,idx) =>{ 
        return(
        <Carousel.Item key={idx}>
          <Carousel.Caption>
            <h3>stuff</h3>
            <p>{book.title}</p>
          </Carousel.Caption>
        </Carousel.Item>
        )
    })
    console.log(this.state);
    /* TODO: render user's books in a Carousel */
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Carousel>
          {books}
        </Carousel>

        {/* {this.state.books.length > 0 && 
          <>
            {books}
          </> */}
        {/* //  : (
        //   <h3>No Books Found :(</h3>
        // )
        } */}
      </>
    )
  }
}

export default BestBooks;
