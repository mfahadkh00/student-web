import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IStudentRaw } from "state/ducks/students/types";
import SingleRecordContainer from "containers/singleRecordContainer";

type IProps = {
  setStudentData: (std: IStudentRaw) => void;
  setShow: (x: boolean) => void;
  studentList: IStudentRaw[];
};
const StudentDetails = (props: IProps) => {
  const handleEdit = (student: IStudentRaw) => {
    props.setShow(true);
    props.setStudentData(student);
  };

  return (
    <Container>
      <>
        <Row style={{ marginTop: "20px" }} className="text">
          <Col> Name </Col>
          <Col> Subject </Col>
          <Col> Date </Col>
          <Col> Status </Col>
          <Col> Action </Col>
        </Row>
        <hr style={{ borderColor: "gray" }} />
        {/* {props?.studentList?.map((student: IStudentRaw, key) => (
          <SingleRecordContainer
            student={student}
            key={key}
            // handleEdit={() => handleEdit(student)}
          />
        ))} */}
      </>
    </Container>
  );
};

export default StudentDetails;
