"use client";

import { Medication } from '@/src/types/medication';
import EntityForm from '../../../../components/form/EntityForm';
import { useRouter } from 'next/navigation';
import { updateMedication } from '../../../../services/medicationService';

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

  const handleUpdate = async (data: Partial<Medication>) => {
    await updateMedication(medication.id, data);
    router.push('/medications');
  };

  return (
    <EntityForm
      onSubmit={handleUpdate}
      fields={fields}
      initialData={medication as unknown as Record<string, unknown>}
    />
  );
}
