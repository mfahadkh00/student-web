import StudentSummary from "components/attendanceView/StudentSummary";
import { useEffect, useState } from "react";
import React from "react";
import "components/marksView/styles.css";
import {
  IAttendanceRaw,
  IRegistrationRaw,
  IStudentState,
} from "state/ducks/students/types";
import Header from "components/attendanceView/header";
import { ActionType } from "typesafe-actions";
import { fetchRegistrations } from "state/ducks/registrations/registrationActions";
import { ISummaryData } from "utils";
import InputModalContainer from "containers/marksInputModalContainer";
import StudentAttendanceDetails from "components/marksView/StudentDetails";
import AttendanceList from "./attendanceList";
import { getAttendance } from "state/ducks/attendance/attendanceAction";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { fetchStudentsX } from "state/ducks/students/studentSlice";
import AttendanceModal from "./addAttModal";
import { OverlaySpinner } from "components/spinner";

// interface IProps extends IStudentState {
//   // fetchRegistrations: () => ActionType<typeof fetchRegistrations>;
//   // dashboardData?: ISummaryData;
//   data: IRegistrationRaw[];
// }

const AttendanceView: React.FC = () => {
  const [show, setShow] = useState(false);
  const [studentData, setStudentData] = useState<IAttendanceRaw | null>();
  // const data: IAttendanceRaw=[];
  const dispatch = useAppDispatch();

  // const data={}
  const attList = useAppSelector((state) => state.attendance.data);
  const studentList = useAppSelector((state) => state.students.data);
  const regList = useAppSelector((state) => state.registrations.registrations);
  const loading = useAppSelector((state) => state.attendance.isLoading);
  useEffect(() => {
    dispatch(getAttendance());
    dispatch(fetchStudentsX());
    dispatch(fetchRegistrations());
  }, []);

  return (
    <>
      <Header setShow={setShow} />
      {loading && <OverlaySpinner />}
      <AttendanceList
        setStudentData={setStudentData}
        setShow={setShow}
        attList={attList as any}
        studentList={studentList}
      />
      <AttendanceModal
        showModal={show}
        handleClose={() => setShow(false)}
        registrationList={regList}
      />
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
