import React from 'react';
import { Button } from 'react-bootstrap';

class DeleteBookButton extends React.Component{

  handleDelete = () => {
    this.props.deleteBook(this.props.id);
    console.log(this.props.id);
  }

  render(){

    return (
      this.props.loggedIn
        ?
        <Button variant="danger" onClick={this.handleDelete}>Delete a Book</Button>
        :
        ''
      
    ) 
  }
}

export default DeleteBookButton;