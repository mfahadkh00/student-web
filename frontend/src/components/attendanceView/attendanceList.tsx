import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IAttendanceRaw, IStudentRaw } from "state/ducks/students/types";
import SingleAttRecord from "./singleAttRecord";


type IProps = {
  setStudentData: (std: IAttendanceRaw) => void;
  setShow: (x: boolean) => void;
  attList: IAttendanceRaw[];
  studentList: IStudentRaw[];
};
const AttendanceList = (props: IProps) => {
  const handleEdit = (student: IAttendanceRaw) => {
    props.setShow(true);
    props.setStudentData(student);
  };


  return (
    <>
      <Container>
        <>
          <Row style={{ marginTop: "20px" }} className="text">
            <Col> Roll Number </Col>
            <Col> Name </Col>
            <Col> Subject </Col>
            <Col> Date </Col>
            <Col> Status </Col>
            {/* <Col> Action </Col> */}
          </Row>
          <hr style={{ borderColor: "gray" }} />
          {props?.attList?.map((att: IAttendanceRaw, key) => {
            // const obj = props.studentList.find(
            //   (std) => std._id === att.student_id
            // );
            // const newStd = { ...att, ...obj };
            return (
              <SingleAttRecord
                student={att}
                key={key}
                handleEdit={() => handleEdit(att)}
              />
            );
          })}
        </>
      </Container>
    </>
  );
};

export default AttendanceList;
