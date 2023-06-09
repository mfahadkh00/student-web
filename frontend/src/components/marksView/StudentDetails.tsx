import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IRegistrationRaw } from "state/ducks/students/types";
import SingleRecordContainer from "containers/singleRecordContainer";

type IProps = {
  setStudentData: (std: IRegistrationRaw) => void;
  setShow: (x: boolean) => void;
  studentList: IRegistrationRaw[];
  setMarksModal: (x: boolean) => void;
};
const StudentAttendanceDetails = (props: IProps) => {
  const handleEdit = (student: IRegistrationRaw) => {
    // props.setShow(true);
    props.setMarksModal(true);
    props.setStudentData(student);
  };

  return (
    <Container>
      <>
        <Row style={{ marginTop: "20px" }} className="text">
          <Col> Name </Col>
          <Col> Roll Number </Col>
          <Col> Subject </Col>
          <Col> Total Marks </Col>
          <Col> Grade </Col>
          <Col> Action </Col>
        </Row>
        <hr style={{ borderColor: "gray" }} />
        {props?.studentList?.map((student: IRegistrationRaw, key) => (
          <SingleRecordContainer
            student={student}
            key={key}
            handleEdit={() => handleEdit(student)}
          />
        ))}
      </>
    </Container>
  );
};

export default StudentAttendanceDetails;
