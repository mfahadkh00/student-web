import StudentSummary from "components/marksView/StudentSummary";
import { useEffect, useState } from "react";
import React from "react";
import "components/marksView/styles.css";
import { IRegistrationRaw } from "state/ducks/students/types";
import Header from "components/marksView/header";
import { ISummaryData, subjects } from "utils";
import InputModalContainer from "containers/marksInputModalContainer";
import StudentDetailsContainer from "containers/studentDetailsContainer";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { fetchRegistrations } from "state/ducks/registrations/registrationActions";
import { IRegistrationState } from "state/ducks/registrations/registrationSlice";
import { fetchStudentsX } from "state/ducks/students/studentSlice";
import ResultModal from "./marksModal";
import { OverlaySpinner } from "components/spinner";
interface IProps extends IRegistrationState {
  // fetchRegistrations: () => Promise<void>;
  dashboardData?: ISummaryData;
  error?: string | null;
  registrations: IRegistrationRaw[];
}
// fetchRegistrations
const MainView: React.FC<IProps> = ({ registrations }) => {
  const [show, setShow] = useState(false);
  const [marksModal, setMarksModal] = useState(false);
  const loading = useAppSelector((state) => state.registrations.loading);

  const dispatch = useAppDispatch();
  const [studentData, setStudentData] = useState<IRegistrationRaw | null>();
  const [summaryData, setSummaryData] = useState<ISummaryData>();
  useEffect(() => {
    dispatch(fetchRegistrations());
    dispatch(fetchStudentsX());
  }, []);

  useEffect(() => {
    summaryCalculator();
  }, [registrations]);

  function summaryCalculator() {
    let result = {} as ISummaryData;
    const sortedGrades = registrations
      .filter((itx) => itx.grade !== undefined)
      .map((itx) => itx.grade)
      .sort();

    result.topGrade = sortedGrades[0];
    result.minGrade = sortedGrades[sortedGrades.length - 1];

    //initialize hash-map for passed and fail counter by subject <subject, count>
    const passed = new Map();
    const failed = new Map();
    subjects.forEach((x) => {
      passed.set(x.name, 0);
      failed.set(x.name, 0);
    });

    registrations.forEach((std) => {
      if (std?.grade !== "F") {
        passed.set(std?.subject?.name, passed.get(std?.subject?.name) + 1);
      } else {
        failed.set(std?.subject?.name, failed.get(std?.subject?.name) + 1);
      }
    });

    //convert to array and sort to get subject which has highest ocunt of passed and failed
    const sortedPassed = Array.from(passed).sort((a, b) => b[1] - a[1]);
    const sortedFailed = Array.from(failed).sort((a, b) => b[1] - a[1]);

    if (sortedPassed[0][1] !== 0) {
      result.maxPass = sortedPassed[0][0];
    } else {
      result.maxPass = "";
    }

    if (sortedFailed[0][1] !== 0) {
      result.maxFail = sortedFailed[0][0];
    } else {
      result.maxFail = "";
    }
    setSummaryData(result);
  }

  return (
    <>
      {loading && <OverlaySpinner />}

      <Header setShow={setShow} />
      <StudentSummary {...summaryData} />
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
      <ResultModal
        records={studentData as any}
        show={marksModal}
        setShow={setMarksModal}
      />
    </>
  );
};

export default MainView;
