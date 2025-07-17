"use client";

import Link from "next/link";
import { formatDate } from "../../utils/dateUtil";
import { Pill, PillBottle } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { getAllMedications } from "../../services/medicationService";

export default function MedicationsPage() {
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

  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="mb-8 flex items-center gap-4">
        <PillBottle className="text-blue-600 w-10 h-10" />
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Medication Management</h1>
          <p className="text-gray-600 text-sm">Overview of available medications and their details</p>
        </div>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
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
