import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  function formatSpots(spots) {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spots remaining";
    } else {
      return `${spots} spots remaining`;
    }
  }

  return (
    <li 
      onClick={() => props.setDay(props.name)}
      className={dayClass}
      selected={props.selected}
      spots={props.spots}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}