import { apiClient } from '../lib/axios';
import { Patient } from '../types/patient';
import { PatientWithAssignmentCount } from '../types/patientWithAssignmentCount';

export async function getPatients(): Promise<Patient[]> {
  const response = await apiClient.get('/patients');
  return response.data;
}

export async function getPatientById(id: number): Promise<Patient | null> {
  const response = await apiClient.get(`/patients/${id}`);
  return response.data;
}

export async function getPatientsWithAssignmentCount(): Promise<PatientWithAssignmentCount[]> {
  const response = await apiClient.get('/patients/withAssignmentCount');
  return response.data;
}

export async function createPatient(patient: Partial<Patient>): Promise<Patient> {
  const response = await apiClient.post('/patients', patient);
  return response.data;
}

export async function updatePatient(id: number, patient: Partial<Patient>): Promise<Patient> {
  const response = await apiClient.put(`/patients/${id}`, patient);
  return response.data;
}

export async function deletePatient(id: number): Promise<void> {
  await apiClient.delete(`/patients/${id}`);
}