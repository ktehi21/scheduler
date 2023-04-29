import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Error from "components/Appointment/Error";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = function () {
    transition(CREATE);
  };

  const onEdit = function () {
    transition(EDIT);
  };
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);

    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => {
        transition(ERROR_SAVE)
        console.log(error.message)
      });
  }

  const save_error = function () {
    transition(EDIT);
  };  

  const onDelete = function () {
    transition(CONFIRM);
  };

  const onConfirm = function () {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch(error => {
        transition(ERROR_DELETE, true)
        console.log(error.message)
      });
  };

  const delete_error = function () {
    transition(SHOW);
  };

  let interview = props.interview;
  if (interview == null) {
    interview = []
  }
  // console.log("Appointment.js props.interviewers: ", props.interviewers);
  // console.log("mode: ", mode);

  return (
    <section
      className="appointment"
    >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => onAdd()} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          interview={interview}
          onCancel={back}
          onSave={save}
        />
      }
      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          interview={interview}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          selected={props.selected}
          onCancel={back}
          onSave={save}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          onClose={save_error}
          message="Oops! something happen. Try it later"
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          onClose={delete_error}
          message="Oops! something happen. Try it later"
        />
      }
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure about delete interview?"
          onCancel={back}
          onConfirm={onConfirm}
        />
      }
      {mode === SAVING &&
        <Status message="Saving" />
      }
      {mode === DELETING &&
        <Status message="Deleting" />
      }
    </section>
  );
}
