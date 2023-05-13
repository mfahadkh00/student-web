import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import { studentReducer } from "state/ducks/students/reducers";
import studentSaga from "state/ducks/students/sagas";
import { IStudentState } from "state/ducks/students/types";
export interface IApplicationState {
  students: IStudentState;
}
export interface IReducerAction<TPayload>
  extends Action<TypeConstant>,
    PayloadAction<TypeConstant, TPayload> {}
export const rootReducer = combineReducers<IApplicationState>({
  students: studentReducer,
});
export function* rootSaga() {
  yield all([fork(studentSaga)]);
}
