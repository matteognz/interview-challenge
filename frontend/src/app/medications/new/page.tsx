'use client';

import { Medication } from '@/src/types/medication';
import EntityForm from '../../../components/form/EntityForm';
import { createMedication } from '../../../services/medicationService';
import { Pill } from 'lucide-react';

export default function NewMedicationPage() {
  const fields = [
    { name: 'name', label: 'Medication Name', type: 'text' },
    { name: 'dosage', label: 'Dosage', type: 'number' },
    { name: 'frequency', label: 'Frequency', type: 'number' }
  ];

  const handleCreate = async (data: Partial<Medication>) => {
    await createMedication(data);
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Pill className="w-6 h-6" />
        Create new medication
      </h1>
      <EntityForm
        onSubmit={handleCreate}
        fields={fields}
      />
    </main>
  );
}
