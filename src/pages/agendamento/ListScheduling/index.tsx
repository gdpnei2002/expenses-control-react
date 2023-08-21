import React, { useState, useEffect } from "react";
import axios from "axios";

interface Appointment {
  id: string;
  fields: {
    clientName: string;
    date: string;
    time: string;
  };
}

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const getStartOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    const diff = date.getDate() - day;
    const startOfWeek = new Date(date.setDate(diff)).toISOString().split("T")[0];
    return startOfWeek;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.airtable.com/v0/appafi3FiS8TEtgKo/Appointments",
          {
            headers: {
                Authorization: 'Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077',
            },
          }
        );

        const sortedAppointments = response.data.records.sort(
          (a: any, b: any) => (a.fields.time > b.fields.time ? 1 : -1)
        );

        setAppointments(sortedAppointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const groupedAppointments: { [weekStart: string]: Appointment[] } = {};

  appointments.forEach((appointment) => {
    const weekStart = getStartOfWeek(appointment.fields.date);
    if (!groupedAppointments[weekStart]) {
      groupedAppointments[weekStart] = [];
    }
    groupedAppointments[weekStart].push(appointment);
  });

  return (
    <div>
      <h2>Lista de Agendamentos Agrupados por Semana</h2>
      {Object.entries(groupedAppointments).map(([weekStart, appointments]) => (
        <div key={weekStart}>
          <h3>Semana de {weekStart}</h3>
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                {appointment.fields.clientName} - {appointment.fields.date}{" "}
                {appointment.fields.time}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
