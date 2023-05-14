export const grades = ["A", "B", "C", "D", "F"];
export const subjects = [
  {
    _id: "645f7cfbfe14fbd367d33239",
    name: "Computer",
  },
  {
    _id: "645fa80c120e92db30cd6508",
    name: "Math",
  },
  {
    _id: "645fa810120e92db30cd650a",
    name: "English",
  },
  {
    _id: "645fa81a120e92db30cd650c",
    name: "Science",
  },
];
export const evaluations=["Quiz","Assignment", "Midterm", "Final"]
export const EDIT_ICON =
  "https://cdn-icons-png.flaticon.com/512/1828/1828911.png";
export const DELETE_ICON =
  "https://cdn-icons-png.flaticon.com/512/1214/1214428.png";
export type ISummaryData = {
  topGrade?: string;
  minGrade?: string;
  maxPass?: string;
  maxFail?: string;
};
