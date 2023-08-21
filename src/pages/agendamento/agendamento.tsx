import React, { useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [medic, setMedic] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newAppointment = {
      fields: {
        clientName: clientName,
        date: date,
        time: time,
        medic: medic,
      },
    };

    try {
      const response = await axios.post(
        "https://api.airtable.com/v0/appafi3FiS8TEtgKo/Appointments",
        newAppointment,
        {
          headers: {
            Authorization: 'Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077',
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Appointment created:", response.data);
      setClientName("");
      setDate("");
      setTime("");
      setMedic("");
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div>
      <h2>Agendar Novo Evento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Cliente:
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>
        <label>
          Nome do Médico:
          <input
            type="text"
            value={medic}
            onChange={(e) => setMedic(e.target.value)}
          />
        </label>
        <br />
        <label>
          Data:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Hora:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
