import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import apiCaller from "state/utils/apiCaller";
import { ActionType } from "typesafe-actions";
import {
  addStudent,
  addStudentError,
  addStudentSuccess,
  deleteStudent,
  deleteStudentError,
  deleteStudentSuccess,
  fetchRegistrations,
  fetchStudentsError,
  fetchStudentsSuccess,
  updateStudent,
  updateStudentError,
  updateStudentSuccess,
} from "state/ducks/students/actions";
import { IRegistrationRaw, StudentActionTypes } from "state/ducks/students/types";

function* handleStudentFetch(
  action: ActionType<typeof fetchRegistrations>
): Generator {
  try {
    const res: IRegistrationRaw[] | any = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route
    );

    yield put(fetchStudentsSuccess(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchStudentsError(err.stack!));
    } else {
      yield put(fetchStudentsError("An unknown error occured."));
    }
  }
}
function* handleStudentDelete(
  action: ActionType<typeof deleteStudent>
): Generator {
  try {
    yield call(apiCaller, action.meta.method, action.meta.route);

    yield put(deleteStudentSuccess(action.payload));
  } catch (err) {
    if (err instanceof Error) {
      yield put(deleteStudentError(err.stack!));
    } else {
      yield put(deleteStudentError("An unknown error occured."));
    }
  }
}
function* handleStudentAdd(action: ActionType<typeof addStudent>): Generator {
  try {
    const res: IRegistrationRaw | any = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route,
      action.payload
    );

    yield put(addStudentSuccess(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(addStudentError(err.stack!));
    } else {
      yield put(addStudentError("An unknown error occured."));
    }
  }
}
function* handleStudentUpdate(
  action: ActionType<typeof updateStudent>
): Generator {
  try {
    const payload = { ...action.payload };
    // delete payload._id;
    yield call(apiCaller, action.meta.method, action.meta.route, payload);

    yield put(updateStudentSuccess(action.payload));
  } catch (err) {
    if (err instanceof Error) {
      yield put(updateStudentError(err.stack!));
    } else {
      yield put(updateStudentError("An unknown error occured."));
    }
  }
}

function* watchFetchRequest(): Generator {
  yield takeLatest(StudentActionTypes.FETCH_STUDENTS, handleStudentFetch);
}
function* watchAddRequest(): Generator {
  yield takeEvery(StudentActionTypes.ADD_STUDENT, handleStudentAdd);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(StudentActionTypes.DELETE_STUDENT, handleStudentDelete);
}
function* watchUpdateRequest(): Generator {
  yield takeEvery(StudentActionTypes.UPDATE_STUDENT, handleStudentUpdate);
}

export default function* studentSaga() {
  yield all([fork(watchAddRequest)]);
  yield all([fork(watchDeleteRequest)]);
  yield all([fork(watchFetchRequest)]);
  yield all([fork(watchUpdateRequest)]);
}
