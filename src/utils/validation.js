export function localToday() {
  const now = new Date();
  const pad = (number) => String(number).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export const validPhone = (value) => /^[0-9]{10}$/.test(value);
export const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const validGuestCount = (value) => /^[0-9]+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) > 0;

export function validEventDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < localToday()) return false;
  const date = new Date(value + "T00:00:00Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
