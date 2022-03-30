import React from 'react';
// import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import UpdateButton from './UpdateButton';
import DeleteBookButton from './DeleteBookButton';

// let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     books: []
  //   }
  // }

  // getBooks = async () => {
  //   try {
  //     let url = `${SERVER}/books`
  //     let books = await axios.get(url);
  //     this.setState({
  //       books: books.data,
  //     })
  //   } catch(error) {
  //     console.log(error);
  //   }
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
  // }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  // componentDidMount() {
  //   this.getBooks();
  // }

  render() {
    let books = this.props.books.map((book, idx) =>{ 
        return(
       
          <Carousel.Item key={idx}>
            
            <img
              className="d-block w-100"
              src='https://dummyimage.com/800x400.jpg'
              alt="First slide"
            />  
            <Carousel.Caption>
              <h3>{book.title}</h3>

              <p>{book.description}</p>
            {book.status
                ?
                <p>Read🧑‍🏫</p>
                :
                <p>Haven't Read yet 🚫</p>
            
            }
              <p>{book.email}</p>
            </Carousel.Caption>
          </Carousel.Item>
                 
        )
    })

  let deleteButtons = this.props.books.map((book, idx)=> {
    return(
      <li key={idx} className='row' >
        <p className='col'>{book.title}</p>
        <DeleteBookButton 
        className='col'
        deleteBook={this.props.deleteBook}
        id={book._id}
        loggedIn={this.props.loggedIn}
        />

        <UpdateButton
          updateForm={this.props.updateForm}
          loggedIn={this.props.loggedIn}
          id={book._id}
          __v={bookd.__v}
        />
      </li>
    )
  })

    console.log(this.props.books);
    /* TODO: render user's books in a Carousel */
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      {this.props.books.length > 0 
      ?      

        <Carousel>
          {books}
        </Carousel>

      :
      <h3>No Books Found :(</h3>
      } 

      {this.props.books.length > 0 
      ?        

        <ul style={{width: 300}} >
          <h2>Manage Books</h2>
          {deleteButtons}
        </ul>

      :
      <h3>No Books Found :(</h3>
      } 

      </>
    )
  }
}

export default BestBooks;
