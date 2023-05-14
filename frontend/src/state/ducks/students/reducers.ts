import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import {
  IRegistrationRaw,
  IStudentState,
  StudentActionTypes,
} from "state/ducks/students/types";

export const initialState: IStudentState = {
  data: [],
  error: [],
  loading: false,
};

export const studentReducer = (
  state: IStudentState = initialState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, IRegistrationRaw | IRegistrationRaw[] | string>
): IStudentState => {
  switch (action.type) {
    case StudentActionTypes.FETCH_STUDENTS: {
      return { ...state, loading: true };
    }
    case StudentActionTypes.FETCH_STUDENTS_SUCCESS: {
      return { ...initialState, data: action.payload as IRegistrationRaw[] };
    }
    case StudentActionTypes.FETCH_STUDENTS_ERROR: {
      console.log("ERROR", action.payload);
      return {
        ...state,
      };
    }
    case StudentActionTypes.ADD_STUDENT: {
      return { ...state, loading: true };
    }
    case StudentActionTypes.ADD_STUDENT_SUCCESS: {
      const temp = [...state.data];
      temp.push(action.payload as IRegistrationRaw);
      return { ...initialState, data: temp };
    }
    case StudentActionTypes.ADD_STUDENT_ERROR: {
      console.log("ERROR", action.payload);
      return {
        ...state,
      };
    }
    case StudentActionTypes.UPDATE_STUDENT: {
      return {
        ...state,
        loading: true,
      };
    }
    case StudentActionTypes.UPDATE_STUDENT_SUCCESS: {
      const temp = [...state.data];
      const std = action.payload as IRegistrationRaw;
      temp.splice(
        temp.findIndex((itx) => itx._id === std._id),
        1,
        action.payload as IRegistrationRaw
      );

      return {
        ...state,
        loading: false,
        data: temp,
      };
    }
    case StudentActionTypes.UPDATE_STUDENT_ERROR: {
      console.log("ERROR", action.payload);
      return {
        ...state,
      };
    }
    case StudentActionTypes.DELETE_STUDENT: {
      return { ...state, loading: true };
    }
    case StudentActionTypes.DELETE_STUDENT_SUCCESS: {
      return {
        ...state,
        data: state.data,
        // .data.filter((itx) => itx._id !== action.payload),
        loading: false,
      };
    }

    case StudentActionTypes.DELETE_STUDENT_ERROR: {
      console.log("ERROR", action.payload);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
