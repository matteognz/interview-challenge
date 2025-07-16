import { Patient } from "./patient";

export interface PatientWithAssignmentCount extends Omit<Patient, 'assignments'> {
  assignmentCount: number;
}