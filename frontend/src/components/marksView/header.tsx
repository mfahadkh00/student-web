import React from "react";
import { Stack } from "react-bootstrap";

interface IHeaderProps {
  setShow: (x: boolean) => void;
}
const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <>
      {/* <div className="main-heading">Student Portal</div>
      <hr style={{ borderColor: "gray" }} /> */}
      <Stack
        direction="horizontal"
        style={{ justifyContent: "space-between", margin: "7px" }}
      >
        <div className="sub-heading">Student List</div>
        <div className="ml-auto">
          <button
            className="btn btn-border"
            style={{ float: "right", marginRight: "200px" }}
            onClick={() => props.setShow(true)}
          >
            + Add Registration
          </button>
        </div>
      </Stack>
    </>
  );
};

export default Header;
