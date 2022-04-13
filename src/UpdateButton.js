import React from 'react';
import Button from 'react-bootstrap/Button';

class UpdateButton extends React.Component {

  handleClick = () => {
    this.props.bookForUpdate(this.props.book);
    this.props.updateForm();
  }

  render(){
    return (
      this.props.loggedIn
        ?
        <Button variant="dark" onClick={this.handleClick}>Update Book</Button>
        :
        ''
      
    ) 
  }
}

export default UpdateButton;