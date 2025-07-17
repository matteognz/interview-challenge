import { getPatientById } from '../../../services/patientService';
import { formatDate } from '../../../utils/dateUtil';
import { notFound } from 'next/navigation';

type PatientDetailPageProps = {
  params: { id: string };
};

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const id = parseInt(params?.id);
  const patient = await getPatientById(id);

  if (!patient) return notFound();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Patient Details</h1>
      <div className="bg-white shadow-md rounded-2xl border p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Name</h2>
          <p className="text-gray-900">{patient.name}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Date of Birth</h2>
          <p className="text-gray-900">{formatDate(patient.dateOfBirth)}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Created At</h2>
          <p className="text-gray-900">{formatDate(patient.createdAt)}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Updated At</h2>
          <p className="text-gray-900">{formatDate(patient.updatedAt)}</p>
        </div>
      </div>
    </main>
  );
}
