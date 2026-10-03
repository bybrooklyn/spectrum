import { describe, test, expect } from 'bun:test';
import {
  VERTEX_GROUPS,
  RINGS,
  computeVertices,
  vertexPoint,
  smoothPath,
  SAG_TENSION,
  lerpVertices,
  formatVertexValue
} from '../src/lib/radar.js';
import { axisIds } from '../src/lib/config.js';
import { applySfw } from '../src/lib/share.js';
import type { Vertex } from '../src/lib/radar.js';

const all = (v: number): Record<string, number> => Object.fromEntries(axisIds.map((id) => [id, v]));

function vertex(vertices: Vertex[], key: string): Vertex {
  const found = vertices.find((v) => v.key === key);
  if (!found) throw new Error(`missing vertex ${key}`);
  return found;
}

describe('radar groups', () => {
  test('six groups cover all 11 axes exactly once', () => {
    expect(VERTEX_GROUPS).toHaveLength(6);
    const covered = VERTEX_GROUPS.flatMap((g) => g.members).sort();
    expect(covered).toEqual([...axisIds].sort());
  });

  test('rings are at min/neutral/max', () => {
    expect(RINGS).toEqual([1, 5, 9]);
  });
});

describe('computeVertices', () => {
  test('all-default values give 5 everywhere with full counts', () => {
    const vs = computeVertices(all(5));
    expect(vs).toHaveLength(6);
    for (const v of vs) {
      expect(v.value).toBe(5);
      expect(v.unset).toBe(false);
      expect(v.count).toBe(v.members.length);
    }
  });

  test('unset (0) members are excluded from the mean', () => {
    const values = all(5);
    values.sexualDrive = 0;
    values.sexualAttraction = 0;
    // desire = sexualAttraction(0) + sexualDrive(0) + romanticDesire(5) -> 5, count 1
    const desire = vertex(computeVertices(values), 'desire');
    expect(desire.value).toBe(5);
    expect(desire.count).toBe(1);
    expect(desire.unset).toBe(false);
  });

  test('averages mixed members without rounding', () => {
    const values = all(0);
    values.sexualAttraction = 8;
    values.sexualDrive = 7;
    values.romanticDesire = 6;
    const desire = vertex(computeVertices(values), 'desire');
    expect(desire.value).toBeCloseTo(7);
    expect(desire.count).toBe(3);
  });

  test('fully unset group is unset (gap, never center line)', () => {
    const values = all(5);
    values.kinkRole = 0;
    values.sexualExploration = 0;
    const kink = vertex(computeVertices(values), 'kink');
    expect(kink.value).toBe(0);
    expect(kink.count).toBe(0);
    expect(kink.unset).toBe(true);
  });

  test('SFW-forced zeros behave exactly like user-unset zeros', () => {
    const values = all(7);
    const viaSfw = computeVertices(applySfw(values, true));
    const viaManualUnset = computeVertices({
      ...values,
      sexualOrientation: 0,
      sexualAttraction: 0,
      sexualDrive: 0,
      kinkRole: 0,
      sexualExploration: 0
    });
    expect(viaSfw).toEqual(viaManualUnset);
    // NSFW members forced to 0: orientation falls back to romantic only,
    // desire falls back to romantic only, kink is fully unset.
    const orientation = vertex(viaSfw, 'orientation');
    expect(orientation.value).toBe(7);
    expect(orientation.count).toBe(1);
    const desire = vertex(viaSfw, 'desire');
    expect(desire.value).toBe(7);
    expect(desire.count).toBe(1);
    const kink = vertex(viaSfw, 'kink');
    expect(kink.unset).toBe(true);
  });
});

describe('vertexPoint', () => {
  test('value 9 lands on the outer ring', () => {
    for (let i = 0; i < 6; i++) {
      const p = vertexPoint(9, i, 6, 100, 150, 150);
      const dist = Math.hypot(p.x - 150, p.y - 150);
      expect(dist).toBeCloseTo(100, 5);
    }
  });

  test('value 0 is the center', () => {
    const p = vertexPoint(0, 3, 6, 100, 150, 150);
    expect(p.x).toBeCloseTo(150, 5);
    expect(p.y).toBeCloseTo(150, 5);
  });

  test('vertex 0 is at 12 o’clock', () => {
    const p = vertexPoint(9, 0, 6, 100, 150, 150);
    expect(p.x).toBeCloseTo(150, 5);
    expect(p.y).toBeCloseTo(50, 5);
  });
});

describe('formatVertexValue', () => {
  test('integers stay clean, floats get one decimal', () => {
    expect(formatVertexValue(0)).toBe('0');
    expect(formatVertexValue(5)).toBe('5');
    expect(formatVertexValue(7)).toBe('7');
    expect(formatVertexValue(6.5)).toBe('6.5');
    expect(formatVertexValue(7.666)).toBe('7.7');
  });
});

describe('lerpVertices', () => {
  const from = computeVertices(all(3));
  const to = computeVertices(all(7));

  test('t >= 1 adopts the target exactly', () => {
    expect(lerpVertices(from, to, 1)).toEqual(to);
    expect(lerpVertices(from, to, 2)).toEqual(to);
  });

  test('t = 0 keeps the start values', () => {
    const mid = lerpVertices(from, to, 0);
    for (const v of mid) expect(v.value).toBe(3);
  });

  test('midpoints ease toward the target', () => {
    // easeOutCubic at t=0.5 -> 0.875
    const mid = lerpVertices(from, to, 0.5);
    for (const v of mid) {
      expect(v.value).toBeCloseTo(3 + (7 - 3) * 0.875, 5);
      expect(v.unset).toBe(false);
    }
  });

  test('unset endpoints count as 0 and flags settle at t = 1', () => {
    const zeros = computeVertices(all(0));
    const growing = lerpVertices(zeros, to, 0.5);
    for (const v of growing) {
      expect(v.value).toBeGreaterThan(0);
      expect(v.value).toBeLessThan(7);
    }
    expect(lerpVertices(zeros, to, 1)).toEqual(to);
    const shrinking = lerpVertices(to, zeros, 1);
    for (const v of shrinking) expect(v.unset).toBe(true);
  });
});

describe('smoothPath', () => {
  const hex = [0, 1, 2, 3, 4, 5].map((i) => vertexPoint(9, i, 6, 100, 150, 150));

  test('closed loop starts with M, uses curves, ends with Z', () => {
    const d = smoothPath(hex, true);
    expect(d.startsWith('M')).toBe(true);
    expect(d).toContain('C');
    expect(d.endsWith('Z')).toBe(true);
  });

  test('open run is not closed', () => {
    const d = smoothPath(hex.slice(0, 4), false);
    expect(d.startsWith('M')).toBe(true);
    expect(d).toContain('C');
    expect(d.endsWith('Z')).toBe(false);
  });

  test('two points give a straight line', () => {
    const d = smoothPath(hex.slice(0, 2), false);
    expect(d).toContain('L');
    expect(d).not.toContain('C');
  });

  test('fewer than two points give nothing to draw', () => {
    expect(smoothPath([], true)).toBe('');
    expect(smoothPath(hex.slice(0, 1), false)).toBe('');
  });

  test('closed curve passes through every vertex', () => {
    const d = smoothPath(hex, true);
    for (const p of hex) {
      expect(d).toContain(`${Math.round(p.x * 10) / 10},${Math.round(p.y * 10) / 10}`);
    }
  });

  test('default tension sags gently inward (bounded)', () => {
    expect(SAG_TENSION).toBeGreaterThan(0);
    expect(SAG_TENSION).toBeLessThan(0.5);
    expect(smoothPath(hex, true)).toBe(smoothPath(hex, true, SAG_TENSION));
  });

  test('tension pulls controls toward centroid, endpoints untouched', () => {
    const plain = smoothPath(hex, true, 0);
    const sagged = smoothPath(hex, true, SAG_TENSION);
    const controls = (d: string): [{ x: number; y: number }, { x: number; y: number }] => {
      const m = d.match(/C([-\d.]+),([-\d.]+) ([-\d.]+),([-\d.]+)/);
      if (!m) throw new Error('no curve found');
      return [
        { x: Number(m[1]), y: Number(m[2]) },
        { x: Number(m[3]), y: Number(m[4]) }
      ];
    };
    const [c1, c2] = controls(plain);
    const [s1, s2] = controls(sagged);
    // Same endpoints (curves still pass through vertices).
    const start = plain.match(/M([-\d.,]+)/);
    if (!start) throw new Error('no start found');
    expect(sagged).toContain(start[0]);
    for (const [a, b] of [
      [c1, s1],
      [c2, s2]
    ]) {
      const distA = Math.hypot(a.x - 150, a.y - 150);
      const distB = Math.hypot(b.x - 150, b.y - 150);
      // Gentle: pulled inward, but retains most of its radius.
      // (precision 2: path coords are rounded to 1 decimal)
      expect(distB).toBeLessThan(distA);
      expect(distB / distA).toBeCloseTo(1 - SAG_TENSION, 2);
    }
  });
});
