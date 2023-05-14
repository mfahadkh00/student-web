import React from "react";
import { connect } from "react-redux";
import { addStudent, updateStudent } from "state/ducks/students/actions";
import StudentInputModal from "components/marksInputModal";
import { IApplicationState } from "state/store";

const mapDispatchToProps = {
  addStudent,
  updateStudent,
};
const mapStateToProps = (state: IApplicationState) => ({
  students: state.students?.data,
  // dashboardData: getSummaryData(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(StudentInputModal);
