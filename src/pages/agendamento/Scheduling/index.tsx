import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

interface Appointment {
  id: string;
  fields: {
    "8h": boolean;
    "9h": boolean;
    "10h": boolean;
    "11h": boolean;
  };
}

interface Medic {
  id: string;
  fields: {
    name: string;
  };
}

type FieldsKey = keyof Appointment["fields"];

const AppointmentForm = () => {
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [medic, setMedic] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedic, setSelectedMedic] = useState<Medic | null>(null);
  const [medics, setMedics] = useState<Medic[]>([]);
  useEffect(() => {
    getHours();
    getMedics();
  }, []);

  async function getMedics() {
    try {
      const response = await axios.get(
        "https://api.airtable.com/v0/appafi3FiS8TEtgKo/Medic",
        {
          headers: {
            Authorization:
              "Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077",
          },
        }
      );

      const fetchedMedics = response.data.records as Medic[];
      setMedics(fetchedMedics);
    } catch (error) {
      console.error("Erro ao buscar os médicos:", error);
    }
  }

  async function getHours() {
    try {
      const response = await axios.get(
        "https://api.airtable.com/v0/appafi3FiS8TEtgKo/Appointments",
        {
          headers: {
            Authorization:
              "Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077",
          },
        }
      );

      const fetchedAppointments = response.data.records as Appointment[];
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Erro ao buscar os compromissos:", error);
    }
  }

  const selectHour = async (e: any) => {
    e.preventDefault();

    const checkedFields = {} as Record<FieldsKey, boolean>;

    (["8h", "9h", "10h", "11h"] as FieldsKey[]).forEach((fieldName) => {
      checkedFields[fieldName] = appointments.some(
        (appointment) => appointment.fields[fieldName]
      );
    });

    const newAppointment = {
      fields: {
        clientName: clientName,
        date: date,
        medic: [selectedMedic ? selectedMedic.id : ""],
        ...checkedFields,
      },
    };

    try {
      const response = await axios.post(
        "https://api.airtable.com/v0/appafi3FiS8TEtgKo/Appointments",
        newAppointment,
        {
          headers: {
            Authorization:
              "Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Appointment created:", response.data);
      setClientName("");
      setDate("");
      setMedic("");
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const handleCheckboxChange = (
    appointmentId: string,
    fieldName: FieldsKey
  ) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === appointmentId) {
        return {
          ...appointment,
          fields: {
            ...appointment.fields,
            [fieldName]: !appointment.fields[fieldName],
          },
        };
      }
      return appointment;
    });

    setAppointments(updatedAppointments);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Agendar Novo Evento</h2>
      <form onSubmit={selectHour}>
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
          <select
            value={selectedMedic ? selectedMedic.id : ""}
            onChange={(e) => {
              const selectedMedicId = e.target.value;
              const medic =
                medics.find((m) => m.id === selectedMedicId) || null;
              setSelectedMedic(medic);
            }}
          >
            <option value="">Selecione um médico</option>
            {medics.map((medic) => (
              <option key={medic.id} value={medic.id}>
                {medic.fields.name}
              </option>
            ))}
          </select>
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
        <button onClick={openModal} type="submit">
          Agendar
        </button>
      </form>

      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <li key={appointment.id}>
              <strong>ID: {appointment.id}</strong>
              <ul>
                {(["8h", "9h", "10h", "11h"] as FieldsKey[]).map(
                  (fieldName) => (
                    <li key={fieldName}>
                      {fieldName}:{" "}
                      {appointment.fields[fieldName] ? "Checked" : "Unchecked"}
                      <input
                        type="checkbox"
                        checked={appointment.fields[fieldName]}
                        onChange={() =>
                          handleCheckboxChange(appointment.id, fieldName)
                        }
                      />
                    </li>
                  )
                )}
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
