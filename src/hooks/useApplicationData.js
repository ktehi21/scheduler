import { useEffect, useState } from "react";
import axios from "axios"; // npm install axios@0.20.0

export default function useApplication(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const setDay = day => setState(prev => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const bookSpots = function () {
      const daysObj = state.days.find(day => day.name === state.day);
      const selectedAppointments = daysObj.appointments;

      let spots = 0;
      for (const id of selectedAppointments) {
        if (!appointments[id].interview) {
          spots++;
        }

      }
      const day = { ...daysObj, spots };
      return day
    }

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(function (resolve) {
        setState({
          ...state,
          appointments,
          days: state.days.map(day => {
            if (day.name === state.day) {
              return bookSpots();
            }
            return day;
          }),
        });

      })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const cancelSpots = function () {
      const daysObj = state.days.find(day => day.name === state.day);
      const selectedAppointments = daysObj.appointments;

      let spots = 0;
      for (const id of selectedAppointments) {
        if (!appointments[id].interview) {
          spots++;
        }

      }
      const day = { ...daysObj, spots };
      return day
    }

    return axios.delete(`/api/appointments/${id}`, {
      interview
    })
      .then(function (resolve) {
        setState({
          ...state,
          appointments,
          days: state.days.map(day => {
            if (day.name === state.day) {
              return cancelSpots();
            }
            return day;
          })
        })
      })
  }

  return { state, setDay, bookInterview, cancelInterview }

  //   const dayObj = state.days.find(d => d.name === state.day);
  //   const daysObj = state.days.find(day => day.name === state.day);
  //   // const daysAppointment = state.appointments;
  //   // const selectedAppointments = daysObj.appointments;
  // // console.log(daysObj?.appointments); // ?. prevent crashing just retrun falsy value

  //   // const oldAppointment = state.appointments[id];
  //   // const newAppointment = appointments[id];

  //   let spots = 0;
  //   for (const id of dayObj.appointments) {
  //     if(!appointments[id].interview) {
  //       spots++;
  //     }   
  //   }

  //   const day = {...dayObj, spots};
  //   return state.days.map(d => d.name === state.day ? day : d);
  //return should be number
}

// 콘솔로그 써보고 데이터 확인해보고 
// 가이드라인 확인하고 , 카운팅하고 업데이트 스팟, 
// 렝뜨 오브 interview: null
// 
  // set the spots/ setSpots
  // find appointments (days.appointments = appointments.id)
  // counting appointments.interview = null
  // days.appointments.length - (appointments.interview=null).length
  // update days.spots
  // booking => spots - 1 / deleting => spots + 1
  // give the props for DaysList



  // const [spot, setSpot] = useState(initial);

  // function booked(initial) {
  //   setSpot(initial - 1);
  // }

  // function canceled(initial) {
  //   setSpot(initial + 1);
  // }

  // return { spot, booked, canceled };

