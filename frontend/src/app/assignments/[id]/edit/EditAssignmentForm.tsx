"use client";

import EntityForm, { Field } from '../../../../components/form/EntityForm';
import { useRouter } from 'next/navigation';
import { useApi } from '@/src/hooks/useApi';
import { updateAssignment } from '@/src/services/assignmentService';
import { Assignment } from '@/src/types/assignment';
import { useEffect, useState } from 'react';
import { Patient } from '@/src/types/patient';
import { Medication } from '@/src/types/medication';
import { getPatients } from '@/src/services/patientService';
import { getAllMedications } from '@/src/services/medicationService';
import { CreateUpdateAssignment } from '@/src/types/createUpdateAssignment';

type EditAssignmentFormProps = {
  assignment: Assignment;
};

export default function EditAssignmentForm({ assignment }: EditAssignmentFormProps) {
  const router = useRouter();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  // TODO: error and loading management to retrieve patient/medication list
  useEffect(() => {
    getPatients().then(data => setPatients(data));
    getAllMedications().then(data => setMedications(data));
  }, []);

  const fields: Field[] = [
    {
      name: "patientId",
      label: "Patient",
      type: "select",
      options: patients.map((p) => ({ label: p.name, value: p.id }))
    },
    {
      name: "medicationId",
      label: "Medication",
      type: "select",
      options: medications.map((m) => ({ label: m.name, value: m.id }))
    },
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'numberOfDays', label: 'Number of Days', type: 'number' }
  ];

  const { execute, loading, error } = useApi(updateAssignment, false);

  const handleUpdate = async (data: Partial<CreateUpdateAssignment>) => {
    try{
        const payload = {
          patientId: Number(data?.patientId),
          medicationId: Number(data?.medicationId),
          startDate: data?.startDate,
          numberOfDays: Number(data.numberOfDays),
        };
        await execute(assignment.id, payload);
        router.push('/assignments');
    } catch {} finally {
        
    }
  };

  return (
    <EntityForm
      onSubmit={handleUpdate}
      fields={fields}
      initialData={{
        ...assignment,
        startDate: assignment.startDate ? assignment.startDate?.split('T')[0] : new Date(),
        patientId: assignment.patient.id, 
        medicationId: assignment.medication.id
      } as Record<string, unknown>}
    />
  );
}
