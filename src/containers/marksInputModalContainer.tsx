import React from "react";
import { connect } from "react-redux";
import { addStudent, updateStudent } from "state/ducks/students/actions";
import StudentInputModal from "components/marksInputModal";

const mapDispatchToProps = {
  addStudent,
  updateStudent,
};

export default connect(null, mapDispatchToProps)(StudentInputModal);
