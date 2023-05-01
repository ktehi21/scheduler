
export function getAppointmentsForDay(state, day) {
  // state.days.name === day // return it by {}
  // state.days.appointments.map => state.appintments.key 
  // return [1,2,3] ===> state.days.name
  const filteredDays = state.days.find(ii => ii.name === day);
  if (!filteredDays || state.days.length === 0) {
    return [];
  }
  const filteredDaysAppointments = filteredDays.appointments;
  const result = Object.values(state.appointments).filter(appointment => filteredDaysAppointments.includes(appointment.id));
  return result
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(obj => {
    return obj.name === day;
  });

  if (!dayObj || state.days.length === 0) {
    return [];
  }

  const interviewersArr = dayObj.interviewers;
  const interviewers = interviewersArr.map(id => {

    return state.interviewers[id];
  });

  return interviewers;
}

// state 
//interview = state.appointments.interview;
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const id = interview.interviewer;
  const interviewer = state.interviewers[id];

  return {
    ...interview, interviewer
  };
}


/*
{
  "id":1,
  "time":"12pm",
  "interview": {
    "student": "Lydia Miller-Jones",
    "interviewer": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    }
  }
}

state.appointments
{
  "id":1,
  "time":"12pm",
  "interview": {
    "student": "Lydia Miller-Jones",
    "interviewer": 1 <-------- 이 부분 바꾸기
  }
}

state.interviewers
{
  "id": 1,
  "name": "Sylvia Palmer",
  "avatar": "https://i.imgur.com/LpaY82x.png"
}
*/