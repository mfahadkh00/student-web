import { configureStore } from "@reduxjs/toolkit";
import "./global.d.ts";
import { IStudentState, RegistrationState } from "state/ducks/students/types.js";
import studentReducer from "state/ducks/students/studentSlice";
import registrationReducer, { IRegistrationState } from "state/ducks/registrations/registrationSlice";   

export interface IApplicationState {
  registrations: IRegistrationState;
  students: IStudentState;
  //   auth: AuthState;
  //   profile: ProfileState;
}

const store = configureStore({
  reducer: {
    registrations: registrationReducer,
    students:studentReducer
    // auth: authSlice,
    // profile: profileSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
