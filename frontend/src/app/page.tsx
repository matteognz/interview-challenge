"use client"

import { formatDate } from '../utils/dateUtil';
import { getPatientsWithAssignmentCount } from '../services/patientService';
import { useApi } from '../hooks/useApi';

export default function Home() {
  const {
    data: patients,
    loading,
    error,
  } = useApi(getPatientsWithAssignmentCount, true);

  if (loading) return <div className="p-6 text-blue-500 text-center text-lg">Loading patients...</div>;
  if (error) return <div className="p-6 text-red-600 text-center text-lg">Error: {error.message}</div>;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-1">Patient Management</h1>
        <p className="text-gray-600">Overview of registered patients and their assigned treatments.</p>
      </header>
      <section className="bg-white border rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full table-auto border-collapse text-sm md:text-base">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Name</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Date of Birth</th>
              <th className="px-4 py-3 text-center font-semibold border-b border-blue-200">Assignments</th>
            </tr>
          </thead>
          <tbody>
          { patients && patients.length > 0 ?
              patients?.map((patient, idx) => (
                <tr
                  key={patient.id}
                  className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-4 py-3 border-b">{patient.name}</td>
                  <td className="px-4 py-3 border-b">{formatDate(patient.dateOfBirth)}</td>
                  <td className="px-4 py-3 text-center border-b">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {patient.assignmentCount}
                    </span>
                  </td>
                </tr>
              ))
            : <tr>
                <td colSpan={3} className="px-4 py-3 text-center border-b">No patients registered</td>
              </tr>
          }
          </tbody>
        </table>
      </section>
    </main>
  );
}
