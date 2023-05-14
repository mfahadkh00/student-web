import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IStudentRaw, IStudentState } from './types';

const initialState: IStudentState = {
  loading: false,
  error: null,
  data: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    fetchStudentsStart(state) {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    fetchStudentsSuccess(state, action: PayloadAction<IStudentRaw[]>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    fetchStudentsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload as string;
      state.data = [];
    },
  },
});

export const { fetchStudentsStart, fetchStudentsSuccess, fetchStudentsError } = studentSlice.actions;

export const fetchStudentsX = () => async (dispatch: any) => {
    try {
    dispatch(fetchStudentsStart());
    const response = await axios.get<IStudentRaw[]>(`${process.env.REACT_APP_BASE_URL}/students`);
    dispatch(fetchStudentsSuccess(response.data));
  } catch (e: any) {
    dispatch(fetchStudentsError(e?.message));
  }
};

export default studentSlice.reducer;
