'use client';

import { Medication } from '@/src/types/medication';
import EntityForm from '../../../components/form/EntityForm';
import { createMedication } from '../../../services/medicationService';
import { Pill } from 'lucide-react';
import { useApi } from '@/src/hooks/useApi';
import Alert from '@/src/components/layout/Alert';
import Loader from '@/src/components/layout/Loader';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewMedicationPage() {
  const router = useRouter();

  const fields = [
    { name: 'name', label: 'Medication Name', type: 'text' },
    { name: 'dosage', label: 'Dosage', type: 'number' },
    { name: 'frequency', label: 'Frequency', type: 'number' }
  ];
  const [errorPage, setErrorPage] = useState<Error | null>(null);

  const { execute, loading, error } = useApi(createMedication, false);
  
  const handleCreate = async (data: Partial<Medication>) => {
    try {
      await execute(data);
      router.back();
    } catch {} finally {
      setErrorPage(error);
    };
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Pill className="w-6 h-6" />
        Create new medication
      </h1>
      {errorPage && <Alert message={errorPage.message} key={errorPage.message} onClose={() => setErrorPage(null)}/>}
      {loading && <Loader />}
      <EntityForm
        onSubmit={handleCreate}
        fields={fields}
      />
    </main>
  );
}
