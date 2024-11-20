import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProgramModal = ({ isOpen, onClose, onSubmit, approvalData, onChange }) => {
  return (
    <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Approve Program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fmName">
            <Form.Label>Fitness Manager Name</Form.Label>
            <Form.Control
              type="text"
              name="fmName"
              value={approvalData.fmName}
              onChange={onChange}
              placeholder="Enter Fitness Manager Name"
            />
          </Form.Group>
          <Form.Group controlId="feedback" className="mt-3">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="feedback"
              value={approvalData.feedback}
              onChange={onChange}
              placeholder="Enter Feedback"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onSubmit}>
          Submit
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProgramModal;
