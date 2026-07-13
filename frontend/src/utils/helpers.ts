export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

export const toNumber = (value: string, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
