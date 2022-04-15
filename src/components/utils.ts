export function toDisplayValue(value: number) {
  if (value <= 10) {
    return String(value);
  }
  if (value < 1000) {
    const divider = Math.pow(10, String(value).length - 1);
    const reminder = value % divider;
    return `${value - reminder}${reminder ? '+' : ''}`;
  }
  const reminder = value % 100;
  return `${(value - (value % 100)) / 1000}k${reminder ? '+' : ''}`;
}
