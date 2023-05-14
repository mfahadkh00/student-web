import StudentSummary from "components/attendanceView/StudentSummary";
import { useEffect, useState } from "react";
import React from "react";
import "components/marksView/styles.css";
import { IRegistrationRaw, IStudentState } from "state/ducks/students/types";
import Header from "components/attendanceView/header";
import { ActionType } from "typesafe-actions";
import { fetchRegistrations } from "state/ducks/students/actions";
import { ISummaryData } from "utils";
import InputModalContainer from "containers/marksInputModalContainer";
import StudentAttendanceDetails from "components/marksView/StudentDetails";
interface IProps extends IStudentState {
  // fetchRegistrations: () => ActionType<typeof fetchRegistrations>;
  dashboardData?: ISummaryData;
  data: IRegistrationRaw[];
}

const AttendanceView: React.FC<IProps> = ({ dashboardData, data }) => {
  const [show, setShow] = useState(false);
  const [studentData, setStudentData] = useState<IRegistrationRaw | null>();
  // useEffect(() => {
    // fetchRegistrations();
  // }, [fetchRegistrations]);

  return (
    <>
      <Header setShow={setShow} />
      {/* <StudentSummary {...dashboardData} /> */}
      {/* <StudentAttendanceDetails 
      // setStudentData={setStudentData} 
      setShow={setShow} studentList={data}/> */}

      {/* <StudentDetailsContainer
        setStudentData={setStudentData}
        setShow={setShow}
      /> */}
      {/* <InputModalContainer
        visible={show}
        setVisible={setShow}
        setStudentData={setStudentData}
        // studentData={studentData as IRegistrationRaw}
      /> */}
    </>
  );
};

export default AttendanceView;
