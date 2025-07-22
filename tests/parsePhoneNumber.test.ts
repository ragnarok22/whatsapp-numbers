import { describe, expect, it } from 'vitest';
import { parsePhoneNumber } from '../src/components/WhatsappForm';

describe('parsePhoneNumber', () => {
  it('strips non-numeric characters and the plus-prefixed country code', () => {
    expect(parsePhoneNumber('+597-812-3456', '597')).toBe('8123456');
  });

  it('handles numbers with spaces', () => {
    expect(parsePhoneNumber('597 812 3456', '597')).toBe('8123456');
  });

  it('returns digits when no prefix is provided in the input', () => {
    expect(parsePhoneNumber('812-3456', '597')).toBe('8123456');
  });
});
