import { createSelector } from "reselect";
import { ISummaryData, subjects } from "utils";
import { IApplicationState } from "..";
import { IStudentRaw } from "./types";

const getStudent = (state: IApplicationState) => state.students.data;
export const getSummaryData = createSelector(
  getStudent,
  (data: IStudentRaw[]) => {
    let result = {} as ISummaryData;
    const sortedGrades = data.map((itx) => itx.grade).sort();

    result.topGrade = sortedGrades[0];
    result.minGrade = sortedGrades[sortedGrades.length - 1];

    //initialize hash-map for passed and fail counter by subject <subject, count>
    const passed = new Map();
    const failed = new Map();
    subjects.forEach((x) => {
      passed.set(x, 0);
      failed.set(x, 0);
    });

    data.forEach((std) => {
      if (std?.grade !== "F") {
        passed.set(std?.subject, passed.get(std?.subject) + 1);
      } else {
        failed.set(std?.subject, failed.get(std?.subject) + 1);
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
    return result;
  }
);
