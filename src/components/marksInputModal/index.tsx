/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import FormButtonGroup from "components/marksInputModal/FormAction";
import { schema } from "utils/inputFormSchema";
import { MODAL_TYPE } from "utils/enums";
import InputTextField from "components/marksInputModal/inputTextField";
import InputSelectField from "components/marksInputModal/inputSelect";
import { grades, subjects } from "utils/index";
import { IStudentRaw } from "state/ducks/students/types";
import { ActionType } from "typesafe-actions";
import { addStudent, updateStudent } from "state/ducks/students/actions";
interface IModalProps {
  visible: boolean;
  setVisible: (x: boolean) => void;
  addStudent: (payload: IStudentRaw) => ActionType<typeof addStudent>;
  updateStudent: (payload: IStudentRaw) => ActionType<typeof updateStudent>;
  studentData: IStudentRaw;
  setStudentData: (std: IStudentRaw | null) => void;
}

const StudentInputModal: React.FC<IModalProps> = (props) => {
  const blankForm = {
    name: "",
    marks: 0,
    subject: "",
    grade: "",
  };

  const modalType = props?.studentData?._id ? MODAL_TYPE.EDIT : MODAL_TYPE.ADD;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IStudentRaw>({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return props.studentData || blankForm;
    }, [props.studentData]),
  });

  useEffect(() => {
    reset(props.studentData);
  }, [props.studentData]);

  const onSubmit = (values: IStudentRaw) => {
    reset(blankForm);
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    if (modalType === MODAL_TYPE.EDIT) {
      props.updateStudent({
        ...values,
        _id: props?.studentData._id,
        date: formattedDate,
        time: formattedTime,
      });
    } else {
      props.addStudent({ ...values, date: formattedDate, time: formattedTime });
    }
    props.setStudentData(null);
    props.setVisible(false);
  };

  const handleClose = () => {
    props.setVisible(false);
    props.setStudentData(null);
    reset(blankForm);
  };

  return (
    <>
      <Modal
        show={props.visible}
        onHide={() => {
          handleClose();
        }}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalType} Student Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <InputTextField
                  {...field}
                  fieldLabel="Name"
                  errors={errors}
                  placeholder="Enter name"
                  type="text"
                />
              )}
            />

            <Controller
              control={control}
              name="marks"
              render={({ field }) => (
                <InputTextField
                  {...field}
                  fieldLabel="Marks"
                  errors={errors}
                  placeholder="Enter marks obtained"
                  type="number"
                />
              )}
            />

            <Controller
              control={control}
              name="subject"
              render={({ field }) => (
                <InputSelectField
                  {...field}
                  fieldLabel="Subject"
                  errors={errors}
                  data={subjects}
                />
              )}
            />

            <Controller
              control={control}
              name="grade"
              render={({ field }) => (
                <InputSelectField
                  {...field}
                  fieldLabel="Grade"
                  errors={errors}
                  data={grades}
                />
              )}
            />
            <FormButtonGroup mode={modalType} handleClose={handleClose} />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StudentInputModal;
