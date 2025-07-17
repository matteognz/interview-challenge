"use client";

import Link from "next/link";
import { ClipboardList, Pill, UserCircle } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { getAllAssignments } from "../../services/assignmentService";
import { calculateEndDate, formatDate } from "../../utils/dateUtil";
import { RemainingDays } from "@/src/components/RemainingDays";

export default function AssignmentsPage() {
  const {
    data: assignments,
    loading,
    error,
  } = useApi(getAllAssignments, true);

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
        <ClipboardList className="text-blue-600 w-10 h-10" />
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Assignment Management</h1>
          <p className="text-gray-600 text-sm">All active and historical treatment assignments</p>
        </div>
      </header>

      <section className="bg-white border border-blue-100 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm md:text-base">
            <thead className="bg-blue-50 text-blue-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Patient</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Medication</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">Start Date</th>
                <th className="px-4 py-3 text-left font-semibold border-b border-blue-200">End Date</th>
                <th className="px-4 py-3 text-center font-semibold border-b border-blue-200">Days Left</th>
              </tr>
            </thead>
            <tbody>
              {assignments && assignments.length > 0 ? (
                assignments.map((assignment, idx) => {
                  const endDate = calculateEndDate(assignment.startDate, assignment.numberOfDays);
                  return (
                   <tr
                    key={assignment.id}
                    className={idx % 2 === 0 ? "bg-blue-50/20" : "bg-white"}
                   >
                    <td className="px-4 py-3 border-b text-gray-800">
                      <Link
                        href={`/patients/${assignment.patient.id}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition cursor-pointer"
                      >
                        <UserCircle className="w-7 h-7" />
                        <span>{assignment.patient.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700">
                      <Link
                        href={`/medications/${assignment.medication.id}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition cursor-pointer"
                      >
                        <Pill className="w-7 h-7" />
                        <span>{assignment.medication.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700">
                      {formatDate(assignment.startDate)}
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700">
                      {formatDate(endDate)}
                    </td>
                    <td className="px-4 py-3 border-b text-center">
                      <RemainingDays assignmentId={assignment.id} />
                    </td>
                   </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No assignments found
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
