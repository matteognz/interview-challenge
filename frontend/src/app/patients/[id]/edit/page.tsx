import { UserCircle } from 'lucide-react';
import { getPatientById } from '@/src/services/patientService';
import EditPatientForm from './EditPatientForm';

export default async function EditPatientPage({ params }: { params: { id: string } }) {
  const id = parseInt(params?.id);
  const patient = await getPatientById(id);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <UserCircle className="w-6 h-6" />
        Edit patient
      </h1>
      {patient ? <EditPatientForm patient={patient} /> : <p>Loading...</p>}
    </main>
  );
}
