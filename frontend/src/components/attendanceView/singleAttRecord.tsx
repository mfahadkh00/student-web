import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownMenu from "components/dropdownMenu/index";
import { IAttendanceRaw } from "state/ducks/students/types";
import { useAppDispatch } from "state/hooks";
import { deleteRegistration } from "state/ducks/registrations/registrationActions";

type SingleRecordProps = {
  student: IAttendanceRaw;
  handleEdit: () => void;
  // deleteStudent: (payload: string) => ActionType<typeof deleteStudent>;
};

const SingleAttRecord = ({
  student,
  handleEdit,
}: // deleteStudent,
SingleRecordProps) => {
  console.log("🚀 ~ file: singleAttRecord.tsx:20 ~ student:", student)

  const dispatch = useAppDispatch();

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  return (
    <>
      <Row style={{ marginTop: "20px" }}>
        <Col> {student?.roll_no?.name} </Col>
        <Col> {student?.roll_no?.roll_number} </Col>
        <Col> {student?.subject_id?.name} </Col>
        <Col> {formatDate(student?.date)} </Col>
        {/* <Col> {student?.is_present ? "Present" : "Absent"} </Col> */}
        <Col>
          <div
            className={`gradeBox ${
              student?.is_present ? "present" : "absent"
            }`}
          >
            {student?.is_present ? "P" : "A"}
          </div>
        </Col>
        {/* <Col>
          <DropdownMenu
            handleEdit={handleEdit}
            handleDelete={() => dispatch(deleteRegistration(student?._id))}
          />
        </Col> */}
      </Row>
      <hr style={{ borderColor: "gray" }} />
    </>
  );
};

export default SingleAttRecord;
