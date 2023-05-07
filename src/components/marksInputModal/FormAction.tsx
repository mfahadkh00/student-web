import React from "react";
import { Button } from "react-bootstrap";
import "components/marksInputModal/styles.css";
import { MODAL_TYPE } from "utils/enums";
interface IFormButtonProps {
  handleClose: () => void;
  mode: MODAL_TYPE;
}

const FormButtonGroup: React.FC<IFormButtonProps> = (props) => {
  return (
    <div className="input-form-btn-group">
      <Button className="btn-inputCancel" onClick={() => props.handleClose()}>
        Close
      </Button>
      <Button className="btn-inputSuccess" type="submit">
        {props?.mode}
      </Button>
    </div>
  );
};

export default FormButtonGroup;
