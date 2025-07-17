import { Assignment } from "./assignment";

export interface AssignmentWithRemainingDays extends Assignment {
  remainingDays: number;
}