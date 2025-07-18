import { ClipboardList } from 'lucide-react';
import EditAssignmentForm from './EditAssignmentForm';
import { getAssignmentById } from '@/src/services/assignmentService';

export default async function EditAssignmentPage({ params }: { params: { id: string } }) {
  const id = parseInt(params?.id);
  const assignment = await getAssignmentById(id);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ClipboardList className="w-6 h-6" />
        Edit assignment
      </h1>
      {assignment ? <EditAssignmentForm assignment={assignment} /> : <p>Loading...</p>}
    </main>
  );
}
