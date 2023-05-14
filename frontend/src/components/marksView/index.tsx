import StudentSummary from "components/marksView/StudentSummary";
import { useEffect, useState } from "react";
import React from "react";
import "components/marksView/styles.css";
import { IRegistrationRaw } from "state/ducks/students/types";
import Header from "components/marksView/header";
import { ISummaryData } from "utils";
import InputModalContainer from "containers/marksInputModalContainer";
import StudentDetailsContainer from "containers/studentDetailsContainer";
import { useAppDispatch } from "state/hooks";
import { fetchRegistrations } from "state/ducks/registrations/registrationActions";
import { IRegistrationState } from "state/ducks/registrations/registrationSlice";
import { fetchStudentsX } from "state/ducks/students/studentSlice";
import ResultModal from "./marksModal";
interface IProps extends IRegistrationState {
  // fetchRegistrations: () => Promise<void>;
  dashboardData?: ISummaryData;
  error?: string | null;
}
// fetchRegistrations
const MainView: React.FC<IProps> = ({ dashboardData }) => {
  const [show, setShow] = useState(false);
  const [marksModal, setMarksModal] = useState(false);

  const dispatch = useAppDispatch();
  const [studentData, setStudentData] = useState<IRegistrationRaw | null>();
  console.log("studentData", studentData);
  useEffect(() => {
    dispatch(fetchRegistrations());
    dispatch(fetchStudentsX());
  }, []);

  return (
    <>
      <Header setShow={setShow} />
      <StudentSummary {...dashboardData} />
      <StudentDetailsContainer
        setStudentData={setStudentData}
        setShow={setShow}
        setMarksModal={setMarksModal}
      />
      <InputModalContainer
        visible={show}
        setVisible={setShow}
        setStudentData={setStudentData}
        studentData={studentData as IRegistrationRaw}
      />
      <ResultModal records={studentData as any} show={marksModal} setShow={setMarksModal} />
    </>
  );
};

export default MainView;
