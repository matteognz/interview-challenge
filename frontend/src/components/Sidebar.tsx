"use client";

import { useState } from "react";
import Link from "next/link";
import { UserCircle, Pill, ClipboardList, Menu, X } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded bg-blue-600 text-white md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-100 border-r border-gray-200 p-4 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:w-64`}
      >
        <h2 className="text-xl font-bold text-blue-700 mb-6">MediTracker</h2>
        <hr></hr>
        <nav className="mt-4 space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <UserCircle className="w-5 h-5" />
            Patients
          </Link>
          <Link
            href="/medications"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <Pill className="w-5 h-5" />
            Medications
          </Link>
          <Link
            href="/assignments"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <ClipboardList className="w-5 h-5" />
            Assignments
          </Link>
        </nav>
      </aside>
    </>
  );
}
