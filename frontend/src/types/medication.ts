import { Assignment } from "./assignment";

export interface Medication {
  id: number;
  name: string;
  dosage: number;
  frequency: number;
  assignments?: Assignment[];
  createdAt: string;
  updatedAt: string;
}
