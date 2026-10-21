// PV.spring / PV.springTo: a seek-safe spring. Each target change is one closed-form step, summed,
// so a frame depends only on lt and the same lt twice matches.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function load() {
  const ctx = { rough: { generator: () => ({}) }, CSS: { supports: () => false } };
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(new URL('../runtime/core.js', import.meta.url), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(new URL('../runtime/live.js', import.meta.url), 'utf8'), ctx);
  return ctx.PV;
}

test('a spring rests at 0 until it is released, overshoots a little, and is resting by dur', () => {
  const { spring } = load();
  const at = 1.5, dur = 0.7;
  assert.equal(spring(at - 0.2, at, dur), 0);
  assert.equal(spring(at, at, dur), 0);
  assert.equal(spring(at + dur, at, dur), spring(at + dur, at, dur));
  let peak = 0;
  for (let i = 1; i <= 80; i++) peak = Math.max(peak, spring(at + dur * i / 40, at, dur));
  assert.ok(peak > 1.02 && peak < 1.08, `overshoot ${peak}`);
  assert.ok(Math.abs(spring(at + dur, at, dur) - 1) < 0.04);
  assert.ok(Math.abs(spring(at + dur * 3, at, dur) - 1) < 1e-3);
  assert.equal(spring(at + 1, at, 0), 1);
});

test('retargeting sums one spring per change and stays put at the instant of a change', () => {
  const { springTo } = load();
  const keys = [[0, 10], [1, 40], [1.25, 16]];
  assert.equal(springTo(-1, keys, 0.7), 10);
  assert.equal(springTo(0, keys, 0.7), 10);
  const atChange = springTo(1.25, keys, 0.7);
  assert.equal(atChange, springTo(1.25, keys.slice(0, 2), 0.7));
  assert.ok(Math.abs(atChange - 10) > 1, 'the first spring is still in flight');
  assert.ok(Math.abs(springTo(8, keys, 0.7) - 16) < 1e-3);
  assert.equal(springTo(2, [], 0.7), 0);
  assert.equal(springTo(2, null, 0.7), 0);
});
