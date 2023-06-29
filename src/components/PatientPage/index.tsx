import { useEffect, useState } from "react";

import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { useParams } from "react-router-dom";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  let { patientId } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const patient = await patientService.getOne(patientId);
        setPatient(patient);
      }
    };

    void fetchPatient();

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, [patientId]);

  const diagnosisDescription = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : "";
  }

  return (
    <div>
      <h2>{patient && patient.name}</h2>
      <p>
        Gender: {patient && patient.gender}<br/>
        Occupation: {patient && patient.occupation}<br/>
        SSN: {patient && patient.ssn}<br/>
        Date of birth: {patient && patient.dateOfBirth}<br/>
      </p>
      <h3>Entries</h3>
      {(patient && patient.entries.length !== 0) 
        ? <>
            {patient.entries.map(entry => 
              <div key={entry.id}>
                <p>{entry.date} <i>{entry.description}</i></p>
                {entry.diagnosisCodes && <ul>
                  {entry.diagnosisCodes.map(code => <li key={code}>
                    {code} {diagnosisDescription(code)}
                  </li>
                  )}
                </ul>}
              </div>
            )} 
          </>
        : 'Patient has no entries yet.'}
    </div>
  );
};

export default PatientPage;