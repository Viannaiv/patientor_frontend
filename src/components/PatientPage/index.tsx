import { useEffect, useState } from "react";

import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  let { patientId } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const patient = await patientService.getOne(patientId);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [patientId]);

  return (
    <div>
      <h2>{patient && patient.name}</h2>
      <p>
        Gender: {patient && patient.gender}<br/>
        Occupation: {patient && patient.occupation}<br/>
        SSN: {patient && patient.ssn}<br/>
        Date of birth: {patient && patient.dateOfBirth}<br/>
      </p>
    </div>
  );
};

export default PatientPage;