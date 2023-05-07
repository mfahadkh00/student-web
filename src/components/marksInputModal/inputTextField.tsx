import React from "react";
import { Form } from "react-bootstrap";
interface ITextField {
    errors:any,
    fieldLabel:string,
    name:string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value:string | number,
    placeholder:string,
    type:string
}
const InputTextField: React.FC<ITextField> = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.name}>
      <Form.Label>{props.fieldLabel}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
      {props.errors[props.name] && (
        <Form.Text className="text-danger">
          {props.errors[props.name].message?.toString()}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default InputTextField;
