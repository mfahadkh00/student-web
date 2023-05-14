import React, { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { updateRegistration } from "state/ducks/registrations/registrationActions";
import { IMark, IRegistrationRaw } from "state/ducks/students/types";
import { useAppDispatch } from "state/hooks";
import { evaluations, subjects } from "utils";

interface IModalProps {
  records: IRegistrationRaw | undefined;
  show: boolean;
  setShow: (x: boolean) => void;
}

const ResultModal: React.FC<IModalProps> = ({ records, show, setShow }) => {
  //   const [show, setShow] = useState(true);
  const dispatch = useAppDispatch();

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const [title, setTitle] = useState("");
  const [obtainedMarks, setObtainedMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    dispatch(
      updateRegistration(records?._id, title, obtainedMarks, totalMarks)
    );
    handleClose();
    setTitle("");
    setObtainedMarks(0);
    setTotalMarks(0);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Evaluation Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Obtained Marks</th>
                  <th>Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {records?.marks?.map((record: IMark) => (
                  <tr>
                    <td>{record.title}</td>
                    <td>{record.obtainedMarks}</td>
                    <td>{record.totalMarks}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Form.Group controlId="title">
              <Form.Label>Evaluation Type</Form.Label>
              <Form.Control
                as="select"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="">Select Evaluation Type</option>
                {evaluations?.map((itx) => (
                  <option value={itx}>{itx}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="obtainedMarks">
              <Form.Label>Obtained Marks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter obtained marks"
                value={obtainedMarks}
                onChange={(e) => setObtainedMarks(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="totalMarks">
              <Form.Label>Total Marks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total marks"
                value={totalMarks}
                onChange={(e) => setTotalMarks(parseInt(e.target.value))}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "space-between" }}>
            <Button variant="success" type="submit">
              Add Mark
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ResultModal;
