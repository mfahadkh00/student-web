import { configureStore } from "@reduxjs/toolkit";
import "./global.d.ts";
import {
  IStudentState,
  RegistrationState,
} from "state/ducks/students/types.js";
import studentReducer from "state/ducks/students/studentSlice";
import registrationReducer, {
  IRegistrationState,
} from "state/ducks/registrations/registrationSlice";
import attendanceReducer, { IAttendanceState } from "./ducks/attendance/attendanceSlice";

export interface IApplicationState {
  registrations: IRegistrationState;
  students: IStudentState;
  attendace: IAttendanceState;

}

const store = configureStore({
  reducer: {
    registrations: registrationReducer,
    students: studentReducer,
    attendance: attendanceReducer,
    // auth: authSlice,
    // profile: profileSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
