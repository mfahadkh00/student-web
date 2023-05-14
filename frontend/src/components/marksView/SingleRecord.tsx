import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownMenu from "components/dropdownMenu/index";
import { IRegistrationRaw } from "state/ducks/students/types";
import { useAppDispatch } from "state/hooks";
import { deleteRegistration } from "state/ducks/registrations/registrationActions";

type SingleRecordProps = {
  student: IRegistrationRaw;
  handleEdit: () => void;
  // deleteStudent: (payload: string) => ActionType<typeof deleteStudent>;
};

const SingleRecord = ({
  student,
  handleEdit,
  // deleteStudent,
}: SingleRecordProps) => {
  const dispatch=useAppDispatch();
  return (
    <>
      <Row style={{ marginTop: "20px" }}>
        <Col> {student?.student?.name} </Col>
        <Col> {student?.student?.roll_number} </Col>
        <Col> {student?.subject?.name} </Col>
        <Col> {student?.grandTotal} </Col>
        <Col>
          <div className={`gradeBox grade${student.grade}`}>
            {student?.grade}
          </div>
        </Col>
        <Col>
          <DropdownMenu
            handleEdit={handleEdit}
            handleDelete={() => dispatch(deleteRegistration(student?._id))}
          />
        </Col>
      </Row>
      <hr style={{ borderColor: "gray" }} />
    </>
  );
};

export default SingleRecord;
