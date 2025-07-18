"use client";

import EntityForm from '../../../../components/form/EntityForm';
import { useRouter } from 'next/navigation';
import { updateMedication } from '../../../../services/medicationService';
import { useApi } from '@/src/hooks/useApi';
import { Patient } from '@/src/types/patient';

type EditPatientFormProps = {
  patient: Patient;
};

export default function EditPatientForm({ patient }: EditPatientFormProps) {
  const router = useRouter();

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'dateOfBirth', label: 'Birth Date', type: 'date' },
  ];

  const { execute, loading, error } = useApi(updateMedication, false);

  const handleUpdate = async (data: Partial<Patient>) => {
    try{
        await execute(patient.id, data);
        router.push('/');
    } catch {} finally {
        
    }
  };

  return (
    <EntityForm
      onSubmit={handleUpdate}
      fields={fields}
      initialData={{
        ...patient,
        dateOfBirth: patient.dateOfBirth?.split('T')[0],
      } as Record<string, unknown>}
    />
  );
}
