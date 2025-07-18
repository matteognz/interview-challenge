export interface CreateUpdateAssignment {
  id: number;
  patientId: number;
  medicationId: number;
  startDate: string;
  numberOfDays: number;
}