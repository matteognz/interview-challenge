"use client";

import { Medication } from '@/src/types/medication';
import EntityForm from '../../../../components/form/EntityForm';
import { useRouter } from 'next/navigation';
import { updateMedication } from '../../../../services/medicationService';
import { useApi } from '@/src/hooks/useApi';

type EditMedicationFormProps = {
  medication: Medication;
};

export default function EditMedicationForm({ medication }: EditMedicationFormProps) {
  const router = useRouter();

  const fields = [
    { name: 'name', label: 'Medication Name', type: 'text' },
    { name: 'dosage', label: 'Dosage', type: 'number' },
    { name: 'frequency', label: 'Frequency', type: 'number' }
  ];

  const { execute, loading, error } = useApi(updateMedication, false);

  const handleUpdate = async (data: Partial<Medication>) => {
    try{
        await execute(medication.id, data);
        router.push('/medications');
    } catch {} finally {
        
    }
  };

  return (
    <EntityForm
      onSubmit={handleUpdate}
      fields={fields}
      initialData={medication as unknown as Record<string, unknown>}
    />
  );
}
