import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class BookFormModal extends React.Component{

  handleNewBook = (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked,
      email: e.target.email.value,
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
                Book Title
              </Form.Label>
              <Form.Control type="text" placeholder="Book Title"/>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>
                Book Description
              </Form.Label>
              <Form.Control type="text" placeholder="Book Description"/>
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Check type="checkbox" label="Read"/>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>
                Your Email
              </Form.Label>
              <Form.Control type="email" placeholder="Your Email"/>
            </Form.Group>
            <Button type="submit" variant="dark">Create Book</Button>
          </Form>
        </Modal.Body>
      </Modal>

    )
  }
}

export default BookFormModal;