// get the appointments for each day
// get the day then return correct appointments only
export function getAppointmentsForDay(state, day) {
  
  const filteredDays = state.days.find(ii => ii.name === day);
  if (!filteredDays || state.days.length === 0) {
    return [];
  }
  const filteredDaysAppointments = filteredDays.appointments;
  const result = Object.values(state.appointments).filter(appointment => filteredDaysAppointments.includes(appointment.id));
  return result
}

// get the interviewers for day
// each day has available interviewers 
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

// if each appointments has interview modify the data 
// no interview = null, interview: {student, interviewer:id} has only id (number)
// match the interviewer's id then attach as interview.interviewer value
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
