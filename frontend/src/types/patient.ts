import { Assignment } from './assignment';

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  assignments: Assignment[];
  createdAt: string;
  updatedAt: string;
}
