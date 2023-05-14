import React from "react";
import { connect } from "react-redux";
import { IApplicationState2 } from "state/ducks/index";
import { fetchRegistrations } from "state/ducks/students/actions";
// import { getSummaryData } from "state/ducks/students/reselectors";
import AttendanceView from "components/attendanceView";

const mapStateToProps = (state: IApplicationState2) => ({
  // loading: state.students.loading,
  // errors: state.students.error,
  // data: state.students.data,
  // dashboardData: getSummaryData(state),
});

const mapDispatchToProps = {
  // fetchRegistrations,
};

//  <h1>hello</h1>;
export default connect(mapStateToProps, mapDispatchToProps)(AttendanceView);
