import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UpdateModal extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let updatedBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked,
      email: e.target.email.value,
      id: this.props.id,
      v: this.props.v
    }
    this.props.updateBook(updatedBook);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.}>
            <Form.Group controlId="title">
              <Form.Label>
                Book Title
              </Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>
                Book Description
              </Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="read">
              <Form.Check type="checkbox" label="Read"/>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Button type="submit" variant="dark">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpdateModal;