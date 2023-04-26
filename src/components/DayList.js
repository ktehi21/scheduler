import React from "react";

import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const dayArray = props.days;
  const daysList = dayArray.map((eachDay) => {
  return (
    <DayListItem
      key={eachDay.id}
      name={eachDay.name}
      spots={eachDay.spots}
      selected={eachDay.name === props.day}
      setDay={() => props.setDay(eachDay.name)}
    />)
  });

  return (
    <ul>
      {daysList}
    </ul>
  );

}

