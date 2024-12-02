export function dateToISO(date: Date | null): string | null {
  if (!date) return null;
  return date.toISOString();
}
export function ISOtoDate(str: string | null | undefined): Date | null {
  if (!str) return null;
  return new Date(str);
}
