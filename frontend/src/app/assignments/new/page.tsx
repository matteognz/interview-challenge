'use client';

import { useRouter } from 'next/navigation';
import { createAssignment } from '@/src/services/assignmentService';
import { useApi } from '@/src/hooks/useApi';
import EntityForm, { Field } from '../../../components/form/EntityForm';
import { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import Loader from '@/src/components/layout/Loader';
import Alert from '@/src/components/layout/Alert';
import { getPatients } from '@/src/services/patientService';
import { Patient } from '@/src/types/patient';
import { Medication } from '@/src/types/medication';
import { getAllMedications } from '@/src/services/medicationService';
import { CreateUpdateAssignment } from '@/src/types/createUpdateAssignment';

export default function NewAssignmentPage() {
  const router = useRouter();
  
  const [errorPage, setErrorPage] = useState<Error | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  // TODO: error and loading management to retrieve patient/medication list
  useEffect(() => {
    getPatients().then(data => setPatients(data));
    getAllMedications().then(data => setMedications(data));
  }, []);
  
  const { execute, loading, error } = useApi(createAssignment, false);

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

  const handleCreate = async (data: Partial<CreateUpdateAssignment>) => {
    try {
      console.log("SENDING ", data)
      await execute({
        ...data,
        patientId: Number(data.patientId),
        medicationId: Number(data.medicationId),
        numberOfDays: Number(data.numberOfDays)
      } as Omit<CreateUpdateAssignment, "id">);
      router.back();
    } catch {} finally {
      setErrorPage(error);
    };
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ClipboardList className="w-6 h-6" />
        Add new assignment
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
