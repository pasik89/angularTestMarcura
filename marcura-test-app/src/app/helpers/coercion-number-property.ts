export function coerceNumberProperty(value: any): number;
export function coerceNumberProperty<D>(value: any, fallback: D): number | D;
export function coerceNumberProperty(value: any, fallbackValue = 0): number {
  return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export function _isNumberValue(value: any): boolean {
  return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
}
