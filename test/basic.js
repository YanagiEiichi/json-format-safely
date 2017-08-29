const test = require('ava');
const jsonFormatSafely = require('..');

test('basic', t => {
  let json = '["23\\u1234",1.2,3.4,5.6,7.8,9.2,3.5,4e2,5e+3,6.6e-3,"my dot."]';
  let result = jsonFormatSafely(json);
  let lines = result.split('\n');
  t.is(lines[0], '[');
  t.is(lines[1], '  "23\\u1234",');
  t.is(lines[2], '  1.2,');
  t.is(lines[3], '  3.4,');
  t.is(lines[4], '  5.6,');
  t.is(lines[5], '  7.8,');
  t.is(lines[6], '  9.2,');
  t.is(lines[7], '  3.5,');
  t.is(lines[8], '  4e2,');
  t.is(lines[9], '  5e+3,');
  t.is(lines[10], '  6.6e-3,');
  t.is(lines[11], '  "my dot."');
  t.is(lines[12], ']');
  t.is(lines[13], void 0);
});

test('many float numbers', t => {
  let source = Array.from({ length: 1000 }, () => Math.random() * 100);
  let json = JSON.stringify(source);
  let result = jsonFormatSafely(json);
  t.is(JSON.stringify(source, null, 2), result);
});

test('keep big integer', t => {
  let json = '[1234567890123456789012345678901234567890]';
  let result = jsonFormatSafely(json);
  let lines = result.split('\n');
  t.is(lines[0], '[');
  t.is(lines[1], '  1234567890123456789012345678901234567890');
  t.is(lines[2], ']');
  t.is(lines[3], void 0);
});

test('keep big float', t => {
  let json = '[3.14159265358979323846264338327950288419716939937510]';
  let result = jsonFormatSafely(json);
  let lines = result.split('\n');
  t.is(lines[0], '[');
  t.is(lines[1], '  3.14159265358979323846264338327950288419716939937510');
  t.is(lines[2], ']');
  t.is(lines[3], void 0);
});

test('keep exponential', t => {
  let json = '[1E2,3e4,5e+6,7E-8]';
  let result = jsonFormatSafely(json);
  let lines = result.split('\n');
  t.is(lines[0], '[');
  t.is(lines[1], '  1E2,');
  t.is(lines[2], '  3e4,');
  t.is(lines[3], '  5e+6,');
  t.is(lines[4], '  7E-8');
  t.is(lines[5], ']');
  t.is(lines[6], void 0);
});

test('keep unicode', t => {
  let json = '["\\u1234\\u5678\\u90ab\\ucdef"]';
  let result = jsonFormatSafely(json);
  let lines = result.split('\n');
  t.is(lines[0], '[');
  t.is(lines[1], '  "\\u1234\\u5678\\u90ab\\ucdef"');
  t.is(lines[2], ']');
  t.is(lines[3], void 0);
});

test('keep encoded unicode', t => {
  let json = '["\\\\u1234\\\\u5678\\\\u90ab\\\\ucdef"]';
  let result = jsonFormatSafely(json);
  let lines = result.split('\n');
  t.is(lines[0], '[');
  t.is(lines[1], '  "\\\\u1234\\\\u5678\\\\u90ab\\\\ucdef"');
  t.is(lines[2], ']');
  t.is(lines[3], void 0);
});

test('keep number and unicode', t => {
  let json = '["1234\\u567890"]';
  let result = jsonFormatSafely(json);
  let lines = result.split('\n');
  t.is(lines[0], '[');
  t.is(lines[1], '  "1234\\u567890"');
  t.is(lines[2], ']');
  t.is(lines[3], void 0);
});

test('keep struct', t => {
  let source = { a: -1, b: 2, c: [ 1, 2, 3 ] };
  let json = JSON.stringify(source);
  let result = jsonFormatSafely(json);
  t.is(JSON.stringify(source, null, 2), result);
});
