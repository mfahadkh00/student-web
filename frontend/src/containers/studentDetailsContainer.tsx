import React from "react";
import { connect } from "react-redux";
import { deleteStudent } from "state/ducks/students/actions";
import StudentDetails from "components/marksView/StudentDetails";
import { IApplicationState } from "state/store";

const mapStateToProps = (state: IApplicationState) => ({
  studentList: state?.registrations?.registrations,
});

const mapDispatchToProps = {
  deleteStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails);
