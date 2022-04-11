import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO Clear state after modulating
      books: [],
      user: null,
      userName: null,
      email:this.props.auth0.user,
      loginForm: false,
      showBookForm: false,
      showUpdateForm: false,
      loggedIn: false,
    };
  }


  render() {

    console.log(this.state);
    console.log(this.props.auth0.user);
    console.log(this.props.user);
    return (
      <>
            {/* <BestBooks
              email={this.state.email}
              books={this.state.books}
              deleteBook={this.deleteBook}
              loggedIn={this.state.loggedIn}
              updateForm={this.updateForm}
              bookForUpdate={this.bookForUpdate}
            /> */}
            {/* <BookFormModal
              show={this.state.showBookForm}
              addBookRemove={this.addBookRemove}
              postBook={this.postBook}
            />
            <UpdateModal
              books={this.state.books}
              show={this.state.showUpdateForm}
              onHide={this.hideUpdateForm}
              updateBook={this.updateBook}
              book={this.state.book}
            />
            <AddBookButton addBookHandler={this.addBookHandler} /> */}
      </>
    );
  }
}

export default withAuth0(Main);
