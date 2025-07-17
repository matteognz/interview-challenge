"use client";

import { formatDate } from '../utils/dateUtil';
import { getPatientsWithAssignmentCount } from '../services/patientService';
import { useApi } from '../hooks/useApi';
import { ClipboardPen, Stethoscope, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const {
    data: patients,
    loading,
    error,
  } = useApi(getPatientsWithAssignmentCount, true);

  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-blue-600 text-lg animate-pulse">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600 text-lg font-medium">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="mb-8 flex items-center gap-4">
        <Stethoscope className="text-blue-600 w-10 h-10" />
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Patient Management</h1>
          <p className="text-gray-600 text-sm">Overview of registered patients and assigned treatments</p>
        </div>
      </header>

      <section className="bg-white border border-blue-100 rounded-2xl shadow-md overflow-hidden">
        <table className="w-full table-auto border-collapse text-sm md:text-base">
          <thead className="bg-blue-50 text-blue-800">
            <tr>
              <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Name</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Date of Birth</th>
              <th className="px-4 py-3 text-center font-semibold border-b border-blue-200">Assignments</th>
            </tr>
          </thead>
          <tbody>
            {patients && patients.length > 0 ? (
              patients.map((patient, idx) => (
                <tr
                  key={patient.id}
                  className={idx % 2 === 0 ? 'bg-blue-50/20' : 'bg-white'}
                >
                  <td className="px-4 py-3 border-b text-gray-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/patients/${patient.id}`)}
                        className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        title="View patient details"
                      >
                        <UserCircle className="w-7 h-7" />
                      </button>
                      <span onClick={() => router.push(`/patients/${patient.id}`)}>{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">{formatDate(patient.dateOfBirth)}</td>
                  <td className="px-4 py-3 text-center border-b">
                    <button
                      onClick={() => console.log(`Clicked on patient ${patient.id}`)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition cursor-pointer"
                      title="View patient assignments"
                    >
                      <ClipboardPen className="w-6 h-6" />
                      {patient.assignmentCount}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">No patients registered</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
