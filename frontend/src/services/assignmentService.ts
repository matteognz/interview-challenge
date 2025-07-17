import { Assignment } from '../types/assignment';
import { apiClient } from '../lib/axios';
import { AssignmentWithRemainingDays } from '../types/assignmentWithRemainingDays';

export async function getAllAssignments(): Promise<Assignment[]> {
  const response = await apiClient.get('/assignments');
  return response.data;
}

export async function getAssignmentById(id: number): Promise<Assignment | null> {
  const response = await apiClient.get(`/assignments/${id}`);
  return response.data;
}

export async function getAssignmentsByPatientId(patientId: number): Promise<AssignmentWithRemainingDays[]> {
  const response = await apiClient.get(`/assignments/patient/${patientId}`);
  return response.data;
}

export async function createAssignment(data: Omit<Assignment, 'id'>): Promise<Assignment> {
  const response = await apiClient.post('/assignments', data);
  return response.data;
}

export async function updateAssignment(id: number, data: Omit<Assignment, 'id'>): Promise<Assignment> {
  const response = await apiClient.put(`/assignments/${id}`, data);
  return response.data;
}

export async function deleteAssignment(id: number): Promise<void> {
  await apiClient.delete(`/assignments/${id}`);
}

export async function getRemainingDays(id: number): Promise<number> {
  const response = await apiClient.get(`/assignments/${id}/remainingDays`);
  return response.data;
}
