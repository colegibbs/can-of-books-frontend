import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UpdateModal extends React.Component {


  
  handleSubmit = (e) => {
    e.preventDefault();
    let updatedBook = {
      title: e.target.title.value || this.props.currentBook.title,
      description: e.target.description.value || this.props.currentBook.description,
      status: e.target.status.checked || this.props.currentBook.status,
      email: this.props.currentBook.email,
      author: this.props.currentBook.author,
      canonicalVolumeLink: this.props.currentBook.canonicalVolumeLink,
      _id: this.props.currentBook._id,
      __v: this.props.currentBook.__v
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
            <Form.Group controlId="title" >
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control type="text" placeholder={this.props.currentBook.title}/>
            </Form.Group>

            <Form.Group controlId="author" >
              <Form.Label>
                Author
              </Form.Label>
              <Form.Control type="text" placeholder={this.props.currentBook.author}/>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>
                Book Description
              </Form.Label>
              <Form.Control type="text" placeholder={this.props.currentBook.description}/>
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Check type="checkbox" label="Read"/>
            </Form.Group>

            <Button type="submit" variant="dark">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpdateModal;