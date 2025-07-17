import { notFound } from 'next/navigation';
import { getAssignmentsByPatientId } from '../../../../services/assignmentService';
import { formatDate } from '../../../../utils/dateUtil';
import { ClipboardList, Pill } from 'lucide-react';
import Link from 'next/link';

type PatientAssignmentsProps = {
  params: { id: string };
};

function calculateEndDate(startDate: string, numberOfDays: number): string {
  const start = new Date(startDate);
  start.setDate(start.getDate() + numberOfDays);
  return start.toISOString();
}

export default async function PatientAssignmentsPage({ params }: PatientAssignmentsProps) {
  const id = parseInt(params?.id);
  const assignments = await getAssignmentsByPatientId(id);

  if (!assignments || assignments.length === 0) return notFound();

  const patientName = assignments[0].patient?.name || 'Unknown';

  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="mb-8 flex items-center gap-4">
        <ClipboardList className="text-blue-600 w-10 h-10" />
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Assignments for {patientName}</h1>
          <p className="text-gray-600 text-sm">List of treatments assigned to this patient</p>
        </div>
      </header>

      <section className="bg-white border border-blue-100 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm md:text-base">
            <thead className="bg-blue-50 text-blue-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Medication</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Start Date</th>
                <th className="px-4 py-3 text-center font-semibold border-b border-blue-200">Number of Days</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">End Date</th>
                <th className="px-4 py-3 text-center font-semibold border-b border-blue-200">Remaining Days</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, idx) => {
                const endDate = calculateEndDate(assignment.startDate, assignment.numberOfDays);
                return (
                  <tr
                    key={assignment.id}
                    className={idx % 2 === 0 ? 'bg-blue-50/20' : 'bg-white'}
                  >
                    <td className="px-4 py-3 border-b text-gray-800">
                      <Link
                          href={`/medications/${assignment.medication.id}`}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition cursor-pointer"
                          title="View medication details"
                        >
                          <Pill className="w-7 h-7" />
                          <span>{assignment.medication.name}</span>
                        </Link>
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700">{formatDate(assignment.startDate)}</td>
                    <td className="px-4 py-3 text-center border-b">{assignment.numberOfDays}</td>
                    <td className="px-4 py-3 border-b text-gray-700">{formatDate(endDate)}</td>
                    <td className="px-4 py-3 text-center border-b">{assignment.remainingDays}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
