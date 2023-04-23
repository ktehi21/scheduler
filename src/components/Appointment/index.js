import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";

export default function Appointment(props) {
  return (
    <section className="appointment">
      <Header />
      <Empty />
      <Confirm />
      <Status />
    </section>
  );
}
