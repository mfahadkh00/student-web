import { action } from "typesafe-actions";
import { IStudentRaw, StudentActionTypes } from "state/ducks/students/types";

export const fetchStudents = () => {
  return action(StudentActionTypes.FETCH_STUDENTS, [], {
    method: "get",
    route: "/students",
  });
};
export const fetchStudentsSuccess = (data: IStudentRaw[]) =>
  action(StudentActionTypes.FETCH_STUDENTS_SUCCESS, data);
export const fetchStudentsError = (message: string) =>
  action(StudentActionTypes.FETCH_STUDENTS_ERROR, message);

export const addStudent = (payload: IStudentRaw) => {
  return action(StudentActionTypes.ADD_STUDENT, payload, {
    method: "post",
    route: "/students",
  });
};
export const addStudentSuccess = (data: IStudentRaw) =>
  action(StudentActionTypes.ADD_STUDENT_SUCCESS, data);
export const addStudentError = (message: string) =>
  action(StudentActionTypes.ADD_STUDENT_ERROR, message);

export const updateStudent = (data: IStudentRaw) => {
  return action(StudentActionTypes.UPDATE_STUDENT, data, {
    method: "put",
    route: `/students/${data?._id}`,
  });
};
export const updateStudentSuccess = (data: IStudentRaw) =>
  action(StudentActionTypes.UPDATE_STUDENT_SUCCESS, data);
export const updateStudentError = (message: string) =>
  action(StudentActionTypes.UPDATE_STUDENT_ERROR, message);

export const deleteStudent = (id: string) =>
  action(StudentActionTypes.DELETE_STUDENT, id, {
    method: "delete",
    route: `/students/${id}`,
  });
export const deleteStudentSuccess = (id: string) =>
  action(StudentActionTypes.DELETE_STUDENT_SUCCESS, id);
export const deleteStudentError = (message: string) =>
  action(StudentActionTypes.DELETE_STUDENT_ERROR, message);
