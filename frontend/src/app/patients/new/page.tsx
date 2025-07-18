'use client';

import { useRouter } from 'next/navigation';
import { createPatient } from '../../../services/patientService';
import EntityForm from '../../../components/form/EntityForm';
import { useApi } from '../../../hooks/useApi';
import { Patient } from '@/src/types/patient';
import { UserCircle } from 'lucide-react';
import { useState } from 'react';
import Loader from '@/src/components/layout/Loader';
import Alert from '@/src/components/layout/Alert';

export default function NewPatientPage() {
  const router = useRouter();

  const [errorPage, setErrorPage] = useState<Error | null>(null);
  
  const { execute, loading, error } = useApi(createPatient, false);

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'dateOfBirth', label: 'Birth Date', type: 'date' },
  ];
    
  const handleCreate = async (data: Partial<Patient>) => {
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
        <UserCircle className="w-6 h-6" />
        Add new medication
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
