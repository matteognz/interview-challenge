import { getMedicationById } from '../../../../services/medicationService';
import { Pill } from 'lucide-react';
import EditMedicationForm from './EditMedicationForm';

export default async function EditMedicationPage({ params }: { params: { id: string } }) {
  const id = parseInt(params?.id);
  const medication = await getMedicationById(id);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Pill className="w-6 h-6" />
        Edit medication
      </h1>
      {medication ? <EditMedicationForm medication={medication} /> : <p>Loading...</p>}
    </main>
  );
}
