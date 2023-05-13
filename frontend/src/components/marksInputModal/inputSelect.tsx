// import React from "react";
import { Form } from "react-bootstrap";
interface ITextField {
  errors: any;
  fieldLabel: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  data: string[];
}
const InputSelectField: React.FC<ITextField> = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.name}>
      <Form.Label>{props.fieldLabel}</Form.Label>
      <Form.Select
        aria-label={`Select ${props.fieldLabel}`}
        onChange={props.onChange}
        value={props.value}
      >
        <option>{`Choose ${props.fieldLabel}`}</option>
        {props?.data?.map((sub, key) => {
          return (
            <option key={key} value={sub}>
              {sub}
            </option>
          );
        })}
      </Form.Select>
      {props.errors[props.name] && (
        <Form.Text className="text-danger">
          {props.errors[props.name].message?.toString()}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default InputSelectField;
