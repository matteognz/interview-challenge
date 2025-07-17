export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('it-IT');
}

export function calculateEndDate(startDate: string, numberOfDays: number): string {
  const start = new Date(startDate);
  start.setDate(start.getDate() + numberOfDays);
  return start.toISOString();
}