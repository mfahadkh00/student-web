import axios from "axios";
import {
  fetchRegistrationsStart,
  fetchRegistrationsSuccess,
  fetchRegistrationsError,
  addRegistrationStart,
  addRegistrationSuccess,
  addRegistrationError,
  updateRegistrationStart,
  updateRegistrationSuccess,
  updateRegistrationError,
} from "./registrationSlice";

export const fetchRegistrations = () => async (dispatch: any) => {
  try {
    dispatch(fetchRegistrationsStart());
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/registration`
    );
    dispatch(fetchRegistrationsSuccess(response.data));
  } catch (e: any) {
    dispatch(fetchRegistrationsError(e?.message));
  }
};

export const addRegistration =
  (student_id: string, subject_id: string | undefined) =>
  async (dispatch: any) => {
    try {
      dispatch(addRegistrationStart());
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/registration`,
        { student: student_id, subject: subject_id }
      );
      dispatch(addRegistrationSuccess(response.data));
      dispatch(fetchRegistrations());
    } catch (error: any) {
      dispatch(addRegistrationError(error?.message));
    }
  };
export const updateRegistration =
  (id: string|undefined, title: string, obtainedMarks: number, totalMarks: number) =>
  async (dispatch: any) => {
    try {
      dispatch(updateRegistrationStart());
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/registration/marks`,
        {
          title: title,
          registrationId: id,
          obtainedMarks: obtainedMarks,
          totalMarks: totalMarks,
        }
      );
      dispatch(updateRegistrationSuccess(response.data));
      dispatch(fetchRegistrations());
    } catch (error: any) {
      dispatch(updateRegistrationError(error?.message));
    }
  };
export const deleteRegistration =
  (student_id: string) => async (dispatch: any) => {
    try {
      dispatch(addRegistrationStart());
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/registration/${student_id}`
      );
      dispatch(addRegistrationSuccess(response.data));
      dispatch(fetchRegistrations());
    } catch (error: any) {
      dispatch(addRegistrationError(error?.message));
    }
  };
