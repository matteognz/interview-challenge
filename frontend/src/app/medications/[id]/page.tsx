import { notFound } from 'next/navigation';
import { getMedicationById, getAssignmentsByMedicationId } from '../../../services/medicationService';
import { ClipboardPen, Pill } from 'lucide-react';
import { RemainingDays } from '@/src/components/RemainingDays';

type MedicationDetailPageProps = {
  params: { id: string };
};

export default async function MedicationDetailPage({ params }: MedicationDetailPageProps) {
  const id = parseInt(params?.id);
  const medication = await getMedicationById(id);

  if (!medication) return notFound();

  const assignments = await getAssignmentsByMedicationId(id);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Pill className="w-6 h-6" />
        Medication Details
      </h1>
      <div className="bg-white border border-gray-200 rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium text-gray-900">{medication.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dosage</p>
            <p className="text-lg font-medium text-gray-900">{medication.dosage}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Frequency (per day)</p>
            <p className="text-lg font-medium text-gray-900">{medication.frequency}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="text-lg font-medium text-gray-900">
              {new Date(medication.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-lg font-medium text-gray-900">
              {new Date(medication.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <ClipboardPen className="w-5 h-5" />
        Related Assignments
      </h2>
      {assignments.length === 0 ? (
        <p className="text-gray-600">No assignments found for this medication</p>
      ) : (
        <div className="grid gap-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm"
            >
              <p className="text-gray-700">
                <span className="font-semibold">Patient:</span> {assignment.patient.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Start Date:</span>{' '}
                {new Date(assignment.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Duration:</span> {assignment.numberOfDays} days
              </p>
              <div className="text-gray-700 flex items-center gap-2">
                <span className="font-semibold">Remaining Days:</span>
                <RemainingDays assignmentId={assignment.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
