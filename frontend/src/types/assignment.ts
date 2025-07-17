import { Patient } from './patient';
import { Medication } from './medication';

export interface Assignment {
  id: number;
  patient: Patient;
  medication: Medication;
  startDate: string;
  numberOfDays: number;
  createdAt: string;
  updatedAt: string;
}
