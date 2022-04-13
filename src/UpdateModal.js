import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UpdateModal extends React.Component {


  
  handleSubmit = (e) => {
    e.preventDefault();
    let updatedBook = {
      title: e.target.title.value || this.props.book.title,
      description: e.target.description.value || this.props.book.description,
      status: e.target.status.checked || this.props.book.status,
      email: e.target.email.value || this.props.book.email,
      _id: this.props.book._id,
      __v: this.props.book.__v
    }
    this.props.updateBook(updatedBook);
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>
                Book Title
              </Form.Label>
              <Form.Control type="text"/>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>
                Book Description
              </Form.Label>
              <Form.Control type="text"/>
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Check type="checkbox" label="Read"/>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control type="email"/>
            </Form.Group>
            <Button type="submit" variant="dark">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpdateModal;