import React from 'react';
import { Button } from 'react-bootstrap';

class AddBookButton extends React.Component{

  render(){
    return (
      <Button onClick={this.props.addBookHandler}>Add Book</Button>
    ) 
  }
}

export default AddBookButton;