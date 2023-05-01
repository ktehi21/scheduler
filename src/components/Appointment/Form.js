import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

// Form.propTypes = {
//   student: PropTypes.string.isRequired
// };

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setStudent("");
    setError("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

// Validate that the input does not include integers
  function numberInName(student) {
    const numRegEx = /\d/;
    const numInName = student.search(numRegEx);
    return !(numInName === -1);
  }

  function validate() {
    if (numberInName(student)) {
      setError("Your name must only contain letters");
      return;
    }

    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    props.onSave(student, interviewer);
  }
  // const save = () => {
  //   props.onSave(student,interviewer);
  // }
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
          {/* <Button confirm onClick={validate}  disabled={!student || !interviewer}>Save</Button> */}
        </section>
      </section>
    </main>
  );
}
