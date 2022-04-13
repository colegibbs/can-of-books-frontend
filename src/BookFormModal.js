import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class BookFormModal extends React.Component{

  handleNewBook = (e) => {
    console.log(e.target.title.value);
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked,
      email: this.props.email,
      author: e.target.author.value,
      

    }
    this.props.postBook(newBook);
  }

  render(){
    return(
      <Modal show={this.props.show} onHide={this.props.addBookRemove}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleNewBook}>
            <Form.Group controlId="title">
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control type="text" placeholder="Book Title"/>
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>
                Author
              </Form.Label>
              <Form.Control type="text" placeholder="Author(s) of Book"/>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>
                Book Description
              </Form.Label>
              <Form.Control type="text" placeholder="Short Description of Book"/>
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Check type="checkbox" label="Read"/>
            </Form.Group>

           <Button type="submit" variant="dark">Create Book</Button>
          </Form>
        </Modal.Body>
      </Modal>

    )
  }
}

export default BookFormModal;