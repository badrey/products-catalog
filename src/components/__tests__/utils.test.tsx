import {toDisplayValue} from '../utils';

describe('components - utils', () => {
  it('toDisplayValue()', () => {
    expect(toDisplayValue(1)).toBe('1');
    expect(toDisplayValue(9)).toBe('9');
    expect(toDisplayValue(10)).toBe('10');
    expect(toDisplayValue(11)).toBe('10+');
    expect(toDisplayValue(20)).toBe('20');
    expect(toDisplayValue(55)).toBe('50+');
    expect(toDisplayValue(65)).toBe('60+');
    expect(toDisplayValue(100)).toBe('100');
    expect(toDisplayValue(101)).toBe('100+');
    expect(toDisplayValue(573)).toBe('500+');
    expect(toDisplayValue(1000)).toBe('1k');
    expect(toDisplayValue(1100)).toBe('1.1k');
    expect(toDisplayValue(1111)).toBe('1.1k+');
  });
});
