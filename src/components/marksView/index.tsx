import StudentSummary from "components/marksView/StudentSummary";
import { useEffect, useState } from "react";
import React from "react";
import "components/marksView/styles.css";
import { IStudentRaw, IStudentState } from "state/ducks/students/types";
import Header from "components/marksView/header";
import { ActionType } from "typesafe-actions";
import { fetchStudents } from "state/ducks/students/actions";
import { ISummaryData } from "utils";
import InputModalContainer from "containers/marksInputModalContainer";
import StudentDetailsContainer from "containers/studentDetailsContainer";
interface IProps extends IStudentState {
  fetchStudents: () => ActionType<typeof fetchStudents>;
  dashboardData: ISummaryData;
}

const MainView: React.FC<IProps> = ({ fetchStudents, dashboardData }) => {
  const [show, setShow] = useState(false);
  const [studentData, setStudentData] = useState<IStudentRaw | null>();
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <>
      <Header setShow={setShow} />
      <StudentSummary {...dashboardData} />
      <StudentDetailsContainer
        setStudentData={setStudentData}
        setShow={setShow}
      />
      <InputModalContainer
        visible={show}
        setVisible={setShow}
        setStudentData={setStudentData}
        studentData={studentData as IStudentRaw}
      />
    </>
  );
};

export default MainView;
