import React from 'react';
import Button from 'react-bootstrap/Button';

class UpdateButton extends React.Component {

  handleclick = () => {
    
  }

  render(){
    return (
      this.props.loggedIn
        ?
        <Button variant="dark" onClick={this.props.updateForm}>Update Book</Button>
        :
        ''
      
    ) 
  }
}

export default UpdateButton;