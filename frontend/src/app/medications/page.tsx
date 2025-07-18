"use client";

import Link from "next/link";
import { formatDate } from "../../utils/dateUtil";
import { Edit, Pill, PillBottle, PlusCircle, Trash2 } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { deleteMedication, getAllMedications } from "../../services/medicationService";
import { useState } from "react";

//TODO: separate hooks from page component 
function useDeleteMedication() {
    const { execute, loading, error } = useApi(deleteMedication, false);
    const deleteMed = async (id: number) => {
        await execute(id);
    };
    return { deleteMed, loading, error };
}

export default function MedicationsPage() {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { deleteMed, loading: deleting, error: deleteError } = useDeleteMedication();
  
  const {
    data: medications,
    loading,
    error,
  } = useApi(getAllMedications, true);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-blue-600 text-lg animate-pulse">Loading...</div>
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
    if (!confirm("Are you sure you want to delete this medication?")) return;
    setDeletingId(id);
    try {
      await deleteMed(id);
      window.location.reload();
    } catch {
      alert("Failed to delete medication: "+ deleteError?.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="mb-8 flex items-center gap-4">
        <PillBottle className="text-blue-600 w-10 h-10" />
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Medication Management</h1>
          <p className="text-gray-600 text-sm">Overview of available medications and their details</p>
        </div>
        <Link
            href="/medications/new"
            className="ml-auto flex items-center gap-2 border border-green-600 text-green-600 hover:bg-green-100 px-4 py-2 rounded-full transition shadow-sm"
            title="Add new medication"
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
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Dosage</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Frequency</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Created</th>
                <th className="px-2 py-3 text-center font-semibold border-b border-blue-200 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medications && medications.length > 0 ? (
                medications.map((med, idx) => (
                  <tr
                    key={med.id}
                    className={idx % 2 === 0 ? "bg-blue-50/20" : "bg-white"}
                  >
                    <td className="px-4 py-3 border-b text-gray-800">
                      <Link
                        href={`/medications/${med.id}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        title="View medication details"
                      >
                        <Pill className="w-7 h-7" />
                        <span>{med.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700">{med.dosage}</td>
                    <td className="px-4 py-3 border-b text-gray-700">{med.frequency}</td>
                    <td className="px-4 py-3 border-b text-gray-700">{formatDate(med.createdAt)}</td>
                    <td className="px-2 py-3 border-b text-gray-800 text-center w-24">
                      <div className="flex items-center justify-center gap-4">
                      <Link
                        href={`/medications/${med.id}/edit`}
                        className="flex items-center gap-2 text-yellow-500 hover:text-yellow-500 transition cursor-pointer"
                        title="Edit medication"
                      >
                        <Edit className="w-6 h-6 text-yellow-800" />
                      </Link>
                      <button
                        onClick={() => handleDelete(med.id)}
                        disabled={deleting && deletingId === med.id}
                        title="Delete medication"
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
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No medications available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
