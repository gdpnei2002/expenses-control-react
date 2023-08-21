import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState([]);

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

  return (
    <div>
      <h2>Lista de Agendamentos Ordenados por Horário</h2>
      <ul>
        {appointments.map((appointment: any) => (
          <li key={appointment.id}>
            {appointment.fields.clientName} - {appointment.fields.date}{" "}
            {appointment.fields.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
