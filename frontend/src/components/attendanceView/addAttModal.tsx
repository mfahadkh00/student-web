import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { addAttendance } from "state/ducks/attendance/attendanceAction";
import { IRegistrationRaw, ISubjectRaw } from "state/ducks/students/types";
import { useAppDispatch } from "state/hooks";
import { subjects } from "utils";

interface IAttendanceModalProps {
  showModal: boolean;
  handleClose: () => void;
  registrationList: IRegistrationRaw[];
}

const AttendanceModal: React.FC<IAttendanceModalProps> = ({
  showModal,
  handleClose,
  registrationList,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [presentStudents, setPresentStudents] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubjectId(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const studentId = e.target.value;
    if (e.target.checked) {
      setPresentStudents((prevState) => [...prevState, studentId]);
    } else {
      setPresentStudents((prevState) =>
        prevState.filter((id) => id !== studentId)
      );
    }
  };
  const handleSubmit = () => {
    const present: string[] = [];
    const absent: string[] = [];
    filteredRegistrations.forEach((student) => {
      const isPresent = presentStudents.includes(student._id);
      isPresent
        ? present.push(student?.student?.roll_number)
        : absent.push(student?.student?.roll_number);
    });
    const attendanceRecord = {
      subject_id: selectedSubjectId,
      date: selectedDate,
      present: present,
      absent: absent,
    };
    dispatch(addAttendance(attendanceRecord));
    handleClose();
  };

  const filteredRegistrations = registrationList.filter(
    (registration) => registration.subject._id === selectedSubjectId
  );

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Attendance Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="formSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              as="select"
              onChange={handleSubjectChange}
              value={selectedSubjectId}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label style={{ marginTop: "10px" }}>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              onChange={handleDateChange}
              value={selectedDate}
            />
          </Form.Group>
          {filteredRegistrations.length > 0 && (
            <Form.Group>
              <Form.Label style={{ marginTop: "10px" }}>
                Registered Students
              </Form.Label>
              <div>
                {filteredRegistrations.map((registration) => (
                  <Form.Check
                    key={registration.student._id}
                    type="checkbox"
                    id={registration.student._id}
                    label={`${registration.student.name} (${registration.student.roll_number})`}
                    value={registration._id}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </div>
            </Form.Group>
          )}
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <Button
              className="btn-inputSuccess"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AttendanceModal;
