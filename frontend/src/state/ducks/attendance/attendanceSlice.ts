import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAttendanceRaw } from "../students/types";

export interface IAttendanceState {
  data: IAttendanceRaw[];
  isLoading: boolean;
  error?: string;
}

const initialState: IAttendanceState = {
  data: [],
  isLoading: false,
  error: undefined,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    getAttendanceRequest(state) {
      state.isLoading = true;
      state.error = undefined;
    },
    getAttendanceSuccess(state, action: PayloadAction<IAttendanceRaw[]>) {
      state.data = action.payload;
      state.isLoading = false;
      state.error = undefined;
    },
    getAttendanceFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addAttendanceRequest(state) {
      state.isLoading = true;
      state.error = undefined;
    },
    addAttendanceSuccess(state, action: PayloadAction<IAttendanceRaw>) {
      state.data.push(action.payload);
      state.isLoading = false;
      state.error = undefined;
    },
    addAttendanceFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateAttendanceRequest(state) {
      state.isLoading = true;
      state.error = undefined;
    },
    updateAttendanceSuccess(
      state,
      action: PayloadAction<{ id: string; attendance: IAttendanceRaw }>
    ) {
      // const { id, attendance } = action.payload;
      // const index = state.data.findIndex((a) => a._id === id);
      // if (index !== -1) {
      //   state.data[index] = attendance;
      // }
      state.isLoading = false;
      state.error = undefined;
    },
    updateAttendanceFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAttendanceRequest,
  getAttendanceSuccess,
  getAttendanceFailure,
  addAttendanceRequest,
  addAttendanceSuccess,
  addAttendanceFailure,
  updateAttendanceRequest,
  updateAttendanceSuccess,
  updateAttendanceFailure,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
