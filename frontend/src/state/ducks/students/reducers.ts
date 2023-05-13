import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import {
  IStudentRaw,
  IStudentState,
  StudentActionTypes,
} from "state/ducks/students/types";

export const initialState: IStudentState = {
  data: [],
  errors: [],
  loading: false,
};

export const studentReducer = (
  state: IStudentState = initialState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, IStudentRaw | IStudentRaw[] | string>
): IStudentState => {
  switch (action.type) {
    case StudentActionTypes.FETCH_STUDENTS: {
      return { ...state, loading: true };
    }
    case StudentActionTypes.FETCH_STUDENTS_SUCCESS: {
      return { ...initialState, data: action.payload as IStudentRaw[] };
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
      temp.push(action.payload as IStudentRaw);
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
      const std = action.payload as IStudentRaw;
      temp.splice(
        temp.findIndex((itx) => itx._id === std._id),
        1,
        action.payload as IStudentRaw
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
        data: state.data.filter((itx) => itx._id !== action.payload),
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
