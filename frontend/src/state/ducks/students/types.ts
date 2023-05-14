export interface IStudentState {
  data: IRegistrationRaw[] | IStudentRaw[]; //TODO: change to IStudentRaw[]
  loading: boolean;
  error: string | null | string[];
}
export type ApiResponse = Record<string, any>;
export interface IStudentRaw extends ApiResponse {
  // _id: string | null;
  name?: string;
  roll_number?: string;
  email?: string;
  phone?: string;
  // timestamp: string | null;
}
export type RegistrationState = {
  data: IRegistrationRaw[];
  loading: boolean;
  errors: string[];
};

// export interface IMarks{
//   title?: string;
//   marks?: number;
//   totalMarks?: number;
//   grade?: string;
//   subject?: string;
//   _id?: string;
// }

export interface IMark {
  title: "Quiz" | "Midterm" | "Assignment" | "Final";
  obtainedMarks?: number;
  totalMarks?: number;
}
export interface IRegistrationRaw {
  student?: IStudentRaw;
  subject?: ISubjectRaw;
  marks: IMark[] | undefined;
  //  {
  //   title: "Quiz" | "Midterm" | "Assignment" | "Final";
  //   obtainedMarks?: number;
  //   totalMarks?: number;
  // }[];
  grade?: string;
  grandTotal?: number;
  // _id: string;
  title?: string;
  singleMark?: number;
  totalMarks?: number;
  // grade?: string;
  singleSubject?: string;
  _id: string;
  roll_number?: string;
}

export interface ISubjectRaw {
  name: string;
  _id: string;
}
export const StudentActionTypes = {
  FETCH_STUDENTS: "@@student/FETCH_STUDENTS",
  FETCH_STUDENTS_SUCCESS: "@@student/FETCH_STUDENTS_SUCCESS",
  FETCH_STUDENTS_ERROR: "@@student/FETCH_STUDENTS_ERROR",

  ADD_STUDENT: "@@student/ADD_STUDENT",
  ADD_STUDENT_SUCCESS: "@@student/ADD_STUDENT_SUCCESS",
  ADD_STUDENT_ERROR: "@@student/ADD_STUDENT_ERROR",

  UPDATE_STUDENT: "@@student/UPDATE_STUDENT",
  UPDATE_STUDENT_SUCCESS: "@@student/UPDATE_STUDENT_SUCCESS",
  UPDATE_STUDENT_ERROR: "@@student/UPDATE_STUDENT_ERROR",

  DELETE_STUDENT: "@@student/DELETE_STUDENT",
  DELETE_STUDENT_SUCCESS: "@@student/DELETE_STUDENT_SUCCESS",
  DELETE_STUDENT_ERROR: "@@student/DELETE_STUDENT_ERROR",
};
