import React from "react";
import { connect } from "react-redux";
import MainView from "components/marksView";
import { fetchRegistrations } from "state/ducks/registrations/registrationActions";
import { IApplicationState } from "state/store";
// import { getSummaryData } from "state/ducks/students/reselectors";

const mapStateToProps = (state: IApplicationState) => ({
  loading: state.registrations?.loading,
  errors: state.registrations?.error,
  registrations: state.registrations?.registrations,
  // dashboardData: getSummaryData(state),
});

const mapDispatchToProps = {
  fetchRegistrations,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
