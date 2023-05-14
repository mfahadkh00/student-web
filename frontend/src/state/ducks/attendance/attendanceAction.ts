import axios from "axios";
import {
  addAttendanceFailure,
  addAttendanceRequest,
  addAttendanceSuccess,
  getAttendanceFailure,
  getAttendanceRequest,
  getAttendanceSuccess,
} from "./attendanceSlice";
interface IAttendanceBatch {
  present: string[];
  absent: string[];
  subject_id: string;
  date: string;
}
export const addAttendance =
  (obj: IAttendanceBatch) => async (dispatch: any) => {
    try {
      dispatch(addAttendanceRequest());
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/attendance/batch`,
        obj
      );
      dispatch(addAttendanceSuccess(response.data));
      dispatch(getAttendance());
    } catch (error: any) {
      dispatch(addAttendanceFailure(error?.message));
    }
  };

export const getAttendance = () => async (dispatch: any) => {
  try {
    dispatch(getAttendanceRequest());
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/attendance`
    );
    dispatch(getAttendanceSuccess(response.data));
    //   dispatch(getAttendance());
  } catch (error: any) {
    dispatch(getAttendanceFailure(error?.message));
  }
};
