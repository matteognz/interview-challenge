import { Medication } from '../types/medication';
import { Assignment } from '../types/assignment';
import { apiClient } from '../lib/axios';

export async function getAllMedications(): Promise<Medication[]> {
  const res = await apiClient.get('/medications');
  return res.data;
}

export async function getMedicationById(id: number): Promise<Medication | null> {
  const res = await apiClient.get(`/medications/${id}`);
  return res.data;
}

export async function createMedication(medication: Partial<Medication>): Promise<Medication> {
  const res = await apiClient.post('/medications', medication);
  return res.data;
}

export async function updateMedication(id: number, data: Partial<Medication>): Promise<Medication> {
  const res = await apiClient.put(`/medications/${id}`, data);
  return res.data;
}

export async function deleteMedication(id: number): Promise<void> {
  await apiClient.delete(`/medications/${id}`);
}

export async function getAssignmentsByMedicationId(id: number): Promise<Assignment[]> {
  const res = await apiClient.get(`/medications/${id}/assignments`);
  return res.data;
}
