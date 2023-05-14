import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRegistrationRaw } from '../students/types';


export interface IRegistrationState {
  registrations: IRegistrationRaw[];
  loading: boolean;
  error?: string | null;
}

const initialState: IRegistrationState = {
  registrations: [],
  loading: false,
  error: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    fetchRegistrationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRegistrationsSuccess(state, action: PayloadAction<IRegistrationRaw[]>) {
      state.registrations = action.payload;
      state.loading = false;
    },
    fetchRegistrationsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addRegistrationStart(state) {
      state.loading = true;
      state.error = null;
    },
    addRegistrationSuccess(state, action: PayloadAction<IRegistrationRaw>) {
      state.registrations.push(action.payload);
      state.loading = false;
    },
    addRegistrationError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateRegistrationStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateRegistrationSuccess(state, action: PayloadAction<IRegistrationRaw>) {
      const index = state.registrations.findIndex(
        (r) => r._id === action.payload._id
      );
      if (index !== -1) {
        state.registrations[index] = action.payload;
      }
      state.loading = false;
    },
    updateRegistrationError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteRegistrationStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteRegistrationSuccess(state, action: PayloadAction<string>) {
      state.registrations = state.registrations.filter(
        (r) => r._id !== action.payload
      );
      state.loading = false;
    },
    deleteRegistrationError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchRegistrationsStart,
  fetchRegistrationsSuccess,
  fetchRegistrationsError,
  addRegistrationStart,
  addRegistrationSuccess,
  addRegistrationError,
  updateRegistrationStart,
  updateRegistrationSuccess,
  updateRegistrationError,
  deleteRegistrationStart,
  deleteRegistrationSuccess,
  deleteRegistrationError,
} = registrationSlice.actions;

export default registrationSlice.reducer;
