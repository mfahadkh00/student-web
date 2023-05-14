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
import { IRegistrationRaw, IStudentRaw } from "state/ducks/students/types";
import { ActionType } from "typesafe-actions";
import { addStudent, updateStudent } from "state/ducks/students/actions";
import { addRegistration } from "state/ducks/registrations/registrationActions";
import { useAppDispatch } from "state/hooks";
interface IModalProps {
  visible: boolean;
  setVisible: (x: boolean) => void;
  addStudent: (payload: IRegistrationRaw) => ActionType<typeof addStudent>;
  updateStudent: (
    payload: IRegistrationRaw
  ) => ActionType<typeof updateStudent>;
  studentData: IRegistrationRaw;
  setStudentData: (std: IRegistrationRaw | null) => void;
  students: IStudentRaw[];
}

const StudentInputModal: React.FC<IModalProps> = (props) => {
  const blankForm = {
    // title: "",
    // singleMark: 0,
    // totalMarks: 0,
    singleSubject: "",
    // grade: "",
    roll_number: "",
  };

  const modalType = MODAL_TYPE.ADD;
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IRegistrationRaw>({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return props.studentData || blankForm;
    }, [props.studentData]),
  });
  // console.log(errors);

  useEffect(() => {
    reset(props.studentData);
  }, [props.studentData]);

  const onSubmit = (values: IRegistrationRaw) => {
    reset(blankForm);
    console.log("values", values);

    const subjID = subjects.find((s) => s.name === values.singleSubject)?._id;
    const student = props.students.find(
      (s) => s.roll_number === values.roll_number
    )?._id;
    dispatch(addRegistration(student, subjID));

    // props.addStudent({
    //   ...values,
    //   // date: formattedDate, time: formattedTime
    // });

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
          <Modal.Title>{modalType} Student Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <InputTextField
                  {...field}
                  fieldLabel="Roll Number"
                  errors={errors}
                  placeholder="Enter Roll Number"
                  type="text"
                />
              )}
            /> */}
            <Controller
              control={control}
              name="roll_number"
              render={({ field }) => (
                <InputSelectField
                  {...field}
                  fieldLabel="Roll Number"
                  errors={errors}
                  data={
                    props.students?.map((itx) => itx.roll_number) as string[]
                  }
                />
              )}
            />
            {/* <Controller
              control={control}
              name="singleMark"
              render={({ field }) => (
                <InputTextField
                  {...field}
                  fieldLabel="Marks"
                  errors={errors}
                  placeholder="Enter marks obtained"
                  type="number"
                />
              )}
            /> */}

            <Controller
              control={control}
              name="singleSubject"
              render={({ field }) => (
                <InputSelectField
                  {...field}
                  fieldLabel="Subject"
                  errors={errors}
                  data={subjects.map((itx) => itx.name)}
                />
              )}
            />

            {/* <Controller
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
            /> */}
            <FormButtonGroup mode={modalType} handleClose={handleClose} />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StudentInputModal;
