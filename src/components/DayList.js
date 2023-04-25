import React from "react";

import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const daysList = props.days.map((eachDay) => {
    
    return (
    <DayListItem 
      key={eachDay.id} 
      name={eachDay.name} 
      spots={eachDay.spots}
      selected={eachDay.name === props.value}
      setDay={() => props.onChange(props.name)}  
    />)
  });  
  
  return (
    <ul>
      {daysList}
    </ul>
  );
}