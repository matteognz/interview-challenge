"use client";

import { formatDate } from '../utils/dateUtil';
import { deletePatient, getPatientsWithAssignmentCount } from '../services/patientService';
import { useApi } from '../hooks/useApi';
import { ClipboardPen, Edit, PlusCircle, Stethoscope, Trash2, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function useDeletePatient() {
  const { execute, loading, error } = useApi(deletePatient, false);
  const deletePat = async (id: number) => {
      await execute(id);
  };
  return { deletePat, loading, error };
}

export default function Home() {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { deletePatient, loading: deleting, error: deleteError } = useDeletePatient();

  const {
    data: patients,
    loading,
    error,
  } = useApi(getPatientsWithAssignmentCount, true);

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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;
    setDeletingId(id);
    try {
      await deletePatient(id);
      window.location.reload();
    } catch {
      alert("Failed to delete patient: "+ deleteError?.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="mb-8 flex items-center gap-4">
        <Stethoscope className="text-blue-600 w-10 h-10" />
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Patient Management</h1>
          <p className="text-gray-600 text-sm">Overview of registered patients and assigned treatments</p>
        </div>
        <Link
            href="/patients/new"
            className="ml-auto flex items-center gap-2 border border-green-600 text-green-600 hover:bg-green-100 px-4 py-2 rounded-full transition shadow-sm"
            title="Add new patient"
        >
            <PlusCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-600">Add</span>
        </Link>
      </header>
      <section className="bg-white border border-blue-100 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm md:text-base">
            <thead className="bg-blue-50 text-blue-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Name</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Date of Birth</th>
                <th className="px-4 py-3 text-center font-semibold border-b border-blue-200">Assignments</th>
                <th className="px-2 py-3 text-center font-semibold border-b border-blue-200 w-24">Actions</th>
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
                        <Link
                          href={`/patients/${patient.id}`}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition cursor-pointer"
                          title="View patient details"
                        >
                          <UserCircle className="w-7 h-7" />
                          <span>{patient.name}</span>
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700">{formatDate(patient.dateOfBirth)}</td>
                    <td className="px-4 py-3 text-center border-b">
                      <Link
                        href={`/assignments/patient/${patient.id}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition cursor-pointer"
                        title="View patient assignments"
                      >
                        <ClipboardPen className="w-6 h-6" />
                        {patient.assignmentCount}
                      </Link>
                    </td>
                    <td className="px-2 py-3 border-b text-gray-800 text-center w-24">
                      <div className="flex items-center justify-center gap-4">
                      <Link
                        href={`/patients/${patient.id}/edit`}
                        className="flex items-center gap-2 text-yellow-500 hover:text-yellow-500 transition cursor-pointer"
                        title="Edit patient"
                      >
                        <Edit className="w-6 h-6 text-yellow-800" />
                      </Link>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        disabled={deleting && deletingId === patient.id}
                        title="Delete patient"
                        className="text-red-600 hover:text-red-800 transition cursor-pointer"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">No patients registered</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
