import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

Form.propTypes = {
  student: PropTypes.string.isRequired
};

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    props.onCancel();
  }

  const save = () => {
    props.onSave(student,interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={e => setStudent(e.target.value)}
            value={student}
            required
          />
          
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          value={interviewer}
          onChange={setInterviewer}
          required
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}  disabled={!student || !interviewer}>Save</Button>
        </section>
      </section>
    </main>
  );
}
