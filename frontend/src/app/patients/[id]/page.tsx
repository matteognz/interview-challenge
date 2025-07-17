import { getPatientById } from '../../../services/patientService';
import { formatDate } from '../../../utils/dateUtil';
import { notFound } from 'next/navigation';
import { UserCircle } from 'lucide-react';

type PatientDetailPageProps = {
  params: { id: string };
};

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const id = parseInt(params?.id);
  const patient = await getPatientById(id);

  if (!patient) return notFound();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <UserCircle className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-blue-700">Patient Details</h1>
      </div>

      <div className="bg-white shadow-md rounded-2xl border p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Name</h2>
            <p className="text-lg text-gray-700">{patient.name}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Date of Birth</h2>
            <p className="text-lg text-gray-700">{formatDate(patient.dateOfBirth)}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Created At</h2>
            <p className="text-lg text-gray-700">{formatDate(patient.createdAt)}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Updated At</h2>
            <p className="text-lg text-gray-700">{formatDate(patient.updatedAt)}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
