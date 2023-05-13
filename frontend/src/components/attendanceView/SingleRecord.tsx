import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownMenu from "components/dropdownMenu/index";
import { IStudentRaw } from "state/ducks/students/types";
import { deleteStudent } from "state/ducks/students/actions";
import { ActionType } from "typesafe-actions";

type SingleRecordProps = {
  student: IStudentRaw;
  handleEdit: () => void;
  deleteStudent: (payload: string) => ActionType<typeof deleteStudent>;
};

const SingleRecord = ({
  student,
  handleEdit,
  deleteStudent,
}: SingleRecordProps) => {
  return (
    <>
      <Row style={{ marginTop: "20px" }}>
        <Col> {student?.name} </Col>
        <Col> {student?.subject} </Col>
        <Col> {student?.date} </Col>
        <Col>
          <div className={`gradeBox grade${student.status}`}>
            {student?.status}
          </div>
        </Col>
        <Col>
          <DropdownMenu
            handleEdit={handleEdit}
            handleDelete={() => deleteStudent(student?._id)}
          />
        </Col>
      </Row>
      <hr style={{ borderColor: "gray" }} />
    </>
  );
};

export default SingleRecord;
