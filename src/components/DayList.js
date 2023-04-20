import React from "react";

import "components/DayListItem.js";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const daysList = days.map((eachDay) => {
    return (
    <DayListItem 
      key={eachDay.id} 
      name={eachDay.name} 
      spots={eachDay.spots}
      selected={eachDay.name === props.day}
      setDay={props.setDay}  
    />)
  });  
  
  return (
    <ul>
      {daysList}
    </ul>
  );
}