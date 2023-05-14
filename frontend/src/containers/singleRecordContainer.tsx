import React from "react";
import { connect } from "react-redux";
import { deleteStudent } from "state/ducks/students/actions";
import SingleRecord from "components/marksView/SingleRecord";

const mapDispatchToProps = {
  // deleteStudent,
};

export default connect(null, mapDispatchToProps)(SingleRecord);
