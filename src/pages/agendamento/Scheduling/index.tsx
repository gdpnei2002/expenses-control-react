import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-modal';

interface Appointment {
  id: string;
  fields: {
    "8h": boolean;
    "9h": boolean;
    "10h": boolean;
    "11h": boolean;
  };
}
const AppointmentForm = () => {
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [medic, setMedic] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    getHours()
  }, [])

  async function getHours() {
    try {
      const response = await axios.get(
        "https://api.airtable.com/v0/appafi3FiS8TEtgKo/Appointments",
        {
          headers: {
            Authorization: 'Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077',
          },
        }
      );
  
      const fetchedAppointments = response.data.records;
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Erro ao buscar os compromissos:", error);
    }
  }

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <button onClick={openModal} type="submit">Agendar</button>
      </form>

      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment.id}>
              <strong>ID: {appointment.id}</strong>
              <ul>
                <li>8h: {appointment.fields["8h"] ? "Checked" : "Unchecked"}</li>
                <li>9h: {appointment.fields["9h"] ? "Checked" : "Unchecked"}</li>
                <li>10h: {appointment.fields["10h"] ? "Checked" : "Unchecked"}</li>
                <li>11h: {appointment.fields["11h"] ? "Checked" : "Unchecked"}</li>
              </ul>
            </li>
          ))
        ) : (
          <li>Nenhum compromisso encontrado.</li>
        )}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Exemplo de Modal"
      >
        <h2>Meu Modal</h2>
        <p>Conteúdo do modal...</p>
        <button onClick={closeModal}>Fechar Modal</button>
      </Modal>
    </div>
  );
};

export default AppointmentForm;
