import { useEffect, useState } from "react";

import { Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";

const EntryInfo = ({entry} : {entry: Entry}) => (
  <>
    <p>{entry.date} <i>{entry.description}</i></p>
    {entry.diagnosisCodes && <ul> 
        {entry.diagnosisCodes.map(code => <li key={code}>{code}</li>)} 
      </ul>
    }
  </>
)

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
      <h3>Entries</h3>
      {(patient && patient.entries.length !== 0) 
        ? <>
            {patient.entries.map(item => <EntryInfo key={item.id} entry={item} />)} 
          </>
        : 'Patient has no entries yet.'}
    </div>
  );
};

/*

<>{patient.entries.map(entry => {
            <P>{entry.}</P>
          })}
          </>*/

export default PatientPage;