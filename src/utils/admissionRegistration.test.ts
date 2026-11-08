import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateApplicationNumber,
  formatReceiptDate,
  formatDOB,
  validateRegistrationData,
  getSampleRegistrationData,
  buildWhatsAppForwardMessage,
} from './admissionRegistration';

test('generateApplicationNumber produces NEST-YYYY-XXXX format', () => {
  const appNo = generateApplicationNumber(2026);
  assert.match(appNo, /^NEST-2026-\d{4}$/);
});

test('formatReceiptDate handles string ISO date correctly', () => {
  const result = formatReceiptDate('2026-07-15T10:30:00.000Z');
  assert.ok(result.length > 5);
});

test('formatDOB formats YYYY-MM-DD to DD/MM/YYYY', () => {
  assert.equal(formatDOB('1999-05-18'), '18/05/1999');
  assert.equal(formatDOB(''), '—');
});

test('validateRegistrationData detects missing required fields', () => {
  const validation = validateRegistrationData({});
  assert.equal(validation.isValid, false);
  assert.ok(validation.errors.fullName);
  assert.ok(validation.errors.phone);
  assert.ok(validation.errors.email);
  assert.ok(validation.errors.churchName);
  assert.ok(validation.errors.declarationAccepted);
});

test('validateRegistrationData passes with full sample data', () => {
  const sample = getSampleRegistrationData();
  const validation = validateRegistrationData(sample);
  assert.equal(validation.isValid, true);
  assert.deepEqual(validation.errors, {});
});

test('buildWhatsAppForwardMessage includes key applicant info and principal phone', () => {
  const sample = getSampleRegistrationData();
  const msg = buildWhatsAppForwardMessage(sample, '8880111763');
  assert.ok(msg.includes('NEST-2026-5821'));
  assert.ok(msg.includes('Jonathan David Samuel'));
  assert.ok(msg.includes('B.Th — Bachelor of Theology'));
  assert.ok(msg.includes('+91 8880111763'));
});
