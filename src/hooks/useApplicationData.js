import { useEffect, useState } from "react";
import axios from 'axios'; // npm install axios@0.20.0

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
        // const days = bookSpots();
        setState({
          ...state,
          appointments: appointments,
          days: state.days.map(day => {
            if (day.name === state.day) {
              return bookSpots();
            }
            return day;
          })
        })
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
}