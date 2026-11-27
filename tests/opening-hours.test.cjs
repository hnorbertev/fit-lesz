const { test } = require('node:test');
const assert = require('node:assert/strict');
const { opening } = require('../data.js');
const { status, holidays, schedule } = require('../opening-hours.js');
test('Budapesti helyi idő, nyitási és zárási határok', () => {
  assert.equal(status(new Date('2026-11-27T04:59:00Z'), opening).text, 'Zárva · Nyitás ma 06:00-kor');
  assert.equal(status(new Date('2026-11-27T05:00:00Z'), opening).text, 'Nyitva · 22:00-ig');
  assert.equal(status(new Date('2026-11-27T21:00:00Z'), opening).text, 'Zárva · Nyitás holnap 08:00-kor');
  assert.equal(status(new Date('2026-11-29T17:00:00Z'), opening).text, 'Zárva · Nyitás holnap 06:00-kor');
});
test('Nyári időszámítás és hétvégi óraátállítás', () => {
  assert.equal(status(new Date('2026-07-06T04:00:00Z'), opening).open, true);
  assert.equal(status(new Date('2026-03-29T06:00:00Z'), opening).text, 'Nyitva · 18:00-ig');
  assert.equal(status(new Date('2026-10-25T07:00:00Z'), opening).text, 'Nyitva · 18:00-ig');
});
test('Fix és mozgó ünnepnapok több évben', () => {
  ['2026-04-03','2026-04-05','2026-04-06','2026-05-24','2026-05-25','2026-12-25'].forEach(d => assert.ok(holidays(2026).has(d), d));
  ['2027-03-26','2027-03-28','2027-03-29','2027-05-17'].forEach(d => assert.ok(holidays(2027).has(d), d));
  assert.equal(status(new Date('2026-04-06T10:59:00Z'), opening).text, 'Nyitva · 13:00-ig');
  assert.equal(status(new Date('2026-04-06T11:00:00Z'), opening).text, 'Zárva · Nyitás holnap 06:00-kor');
  assert.equal(status(new Date('2026-12-31T22:30:00Z'), opening).text, 'Zárva · Nyitás holnap 08:00-kor');
});
test('Kivételek felülírják az ünnepi rendet; több zárt nap átlépése', () => {
  const config = { ...opening, exceptions: { '2026-12-25': null, '2026-12-26': null, '2026-12-27': ['10:00','12:00'] } };
  assert.equal(schedule(new Date('2026-12-25'), config).hours, null);
  assert.equal(status(new Date('2026-12-24T21:00:00Z'), config).text, 'Zárva · Nyitás vasárnap 10:00-kor');
  assert.equal(status(new Date('2026-12-27T09:00:00Z'), config).open, true);
});
