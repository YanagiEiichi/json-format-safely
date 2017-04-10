#!/usr/bin/env node

let Capacitance = require('capacitance');
let jsonFormatSafely = require('.');

process.stdin.pipe(new Capacitance()).then(jsonFormatSafely).then(result => {
  console.log(result);
  process.exit(0);
}, error => {
  console.error(error);
  process.exit(1);
});
