import React from "react";
import "components/dropdownMenu/styles.css";
import { ActionType } from "typesafe-actions";
import { deleteStudent } from "state/ducks/students/actions";
import { DELETE_ICON, EDIT_ICON } from "utils";
type SingleRecordProps = {
  handleEdit: () => void;
  handleDelete: () => ActionType<typeof deleteStudent>;
};

const DropdownMenu = ({ handleEdit, handleDelete }: SingleRecordProps) => {
  return (
    <div className="dropdown dropdown ms-5">
      <button
        className="rounded-circle btn btn-light "
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <div>
          <div className="dropdown-item" onClick={() => handleEdit()}>
            <img src={EDIT_ICON} alt="Edit Student" className="img-icon" />
            Edit
          </div>
          <div className="dropdown-item" onClick={() => handleDelete()}>
            <img src={DELETE_ICON} className="img-icon" alt="Delete Student" />
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
