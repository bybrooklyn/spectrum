/**
 * Hexagon radar helpers (pure, SSR-safe, no dependencies).
 *
 * Groups the 11 spectrum axes into 6 hexagon vertices. A vertex value is the
 * mean of its set (non-zero) member axes; 0 = unset and is excluded. A vertex
 * with no set members is unset (value 0) and rendered as a gap, never as a
 * line to the center.
 *
 * Callers pass values that have ALREADY been through applySfw() — user-cleared
 * 0 and SFW-forced 0 are indistinguishable by design (the share code carries
 * no NSFW information in SFW mode either).
 */

export interface VertexGroup {
  readonly key: string;
  readonly members: string[];
}

export const VERTEX_GROUPS: VertexGroup[] = [
  { key: 'genderSelf', members: ['genderIdentity', 'genderComfort'] },
  { key: 'expression', members: ['genderExpression'] },
  { key: 'orientation', members: ['sexualOrientation', 'romanticOrientation'] },
  { key: 'desire', members: ['sexualAttraction', 'sexualDrive', 'romanticDesire'] },
  { key: 'relationships', members: ['relationshipAttitude'] },
  { key: 'kink', members: ['kinkRole', 'sexualExploration'] }
];

/** Grid rings drawn at these axis values (min / neutral / max). */
export const RINGS: number[] = [1, 5, 9];

export const MAX_VALUE = 9;

export interface Point {
  x: number;
  y: number;
}

export interface Vertex {
  key: string;
  members: string[];
  /** Mean of set members, or 0 when unset. */
  value: number;
  count: number;
  unset: boolean;
}

/**
 * @param effectiveValues axisId -> 0-9 (post-applySfw)
 * @returns vertices with unrounded means, or unset markers
 */
export function computeVertices(effectiveValues: Record<string, number>): Vertex[] {
  return VERTEX_GROUPS.map(({ key, members }) => {
    const set = members
      .map((id) => effectiveValues[id] ?? 0)
      .filter((v) => Number.isInteger(v) && v >= 1 && v <= MAX_VALUE);
    if (set.length === 0) {
      return { key, members, value: 0, count: 0, unset: true };
    }
    const sum = set.reduce((a, b) => a + b, 0);
    return { key, members, value: sum / set.length, count: set.length, unset: false };
  });
}

/**
 * Polar position of a vertex value on a hexagon.
 * Vertex 0 sits at 12 o'clock, subsequent vertices go clockwise.
 *
 * @param value 0-9 (0 = center)
 * @param index vertex index 0..total-1
 */
export function vertexPoint(value: number, index: number, total = 6, R = 100, cx = 150, cy = 150): Point {
  const clamped = Math.min(Math.max(value, 0), MAX_VALUE);
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  const r = (R * clamped) / MAX_VALUE;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

/** Format a vertex value for display (1 decimal, integers stay clean). */
export function formatVertexValue(value: number): string {
  if (!value) return '0';
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

/**
 * Interpolate between two vertex snapshots (chart morphing).
 * Unset endpoints count as 0 so shapes grow/shrink through the center;
 * at t >= 1 the target snapshot is adopted exactly (including unset flags).
 */
export function lerpVertices(from: Vertex[], to: Vertex[], t: number): Vertex[] {
  if (t >= 1) return to.map((tv) => ({ ...tv }));
  const eased = 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
  return to.map((tv, i) => {
    const fv = from[i];
    const a = fv && !fv.unset ? fv.value : 0;
    const b = tv.unset ? 0 : tv.value;
    return { ...tv, value: a + (b - a) * eased, unset: a === 0 && b === 0 };
  });
}

const fmt = (n: number): string => (Math.round(n * 10) / 10).toString();

/**
 * How strongly smooth edges sag toward the center (0 = plain Catmull-Rom
 * which bows outward into a circle, 1 = control points fully centered).
 * Gentle by design: hexagonal character, never a circle, never a star.
 */
export const SAG_TENSION = 0.3;

/**
 * Smooth path through points using Catmull-Rom → cubic Bézier conversion,
 * with control points pulled toward the centroid so edges sag gently
 * inward instead of bowing outward into a circle.
 * Only ever called with consecutive defined vertices — gaps for unset
 * vertices are preserved by the caller (see RadarChart segments).
 *
 * @param {Array<{x: number, y: number}>} pts
 * @param {boolean} closed - true for a full loop, false for an open run
 * @param {number} tension - inward pull 0-1 (defaults to SAG_TENSION)
 * @returns {string} SVG path data ('' when there is nothing to draw)
 */
export function smoothPath(pts: Point[], closed: boolean, tension = SAG_TENSION): string {
  if (pts.length === 0) return '';
  if (pts.length === 1) return '';
  if (pts.length === 2) {
    const [a, b] = pts;
    return `M${fmt(a.x)},${fmt(a.y)}L${fmt(b.x)},${fmt(b.y)}`;
  }
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  const pull = (p: Point): Point => ({ x: p.x + (cx - p.x) * tension, y: p.y + (cy - p.y) * tension });
  const get = (i: number): Point =>
    closed ? pts[(i + pts.length) % pts.length] : pts[Math.min(Math.max(i, 0), pts.length - 1)];
  let d = `M${fmt(pts[0].x)},${fmt(pts[0].y)}`;
  const last = closed ? pts.length : pts.length - 1;
  for (let i = 0; i < last; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    const c1 = pull({ x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 });
    const c2 = pull({ x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 });
    d += `C${fmt(c1.x)},${fmt(c1.y)} ${fmt(c2.x)},${fmt(c2.y)} ${fmt(p2.x)},${fmt(p2.y)}`;
  }
  return closed ? `${d}Z` : d;
}
