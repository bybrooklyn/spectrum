<script lang="ts">
  import { VERTEX_GROUPS, RINGS, computeVertices, vertexPoint, smoothPath, lerpVertices, formatVertexValue } from '$lib/radar.js';
  import type { Vertex } from '$lib/radar.js';
  import type { TranslateFn } from '$lib/locale-types.js';
  import { browser } from '$app/environment';
  import { onDestroy } from 'svelte';

  /** Axis values 0-9, ALREADY passed through applySfw() by the caller. */
  export let values: Record<string, number> = {};
  /** translateFor closure: (key) => string */
  export let t: TranslateFn = (key) => key;
  export let size: number = 300;

  const CX = 150;
  const CY = 150;
  const R = 100;
  const TOTAL = VERTEX_GROUPS.length;
  const MORPH_MS = 220;

  // Displayed vertices tween toward the target on every change so the blob
  // morphs instead of jumping. First render (incl. SSR) snaps instantly.
  let shown: Vertex[] = [];
  let initialized = false;
  let rafId = 0;

  function reduceMotion(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function morphTo(next: Vertex[]): void {
    if (!initialized || !browser || reduceMotion()) {
      initialized = true;
      shown = next;
      return;
    }
    const from = shown;
    const start = performance.now();
    const step = (now: number): void => {
      const t = Math.min((now - start) / MORPH_MS, 1);
      shown = lerpVertices(from, next, t);
      if (t < 1) rafId = requestAnimationFrame(step);
    };
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(step);
  }

  onDestroy(() => {
    // onDestroy also runs during SSR teardown, where rAF doesn't exist.
    if (browser) cancelAnimationFrame(rafId);
  });

  $: morphTo(computeVertices(values));

  function ringPoints(ringValue: number): string {
    return VERTEX_GROUPS.map((_, i) => {
      const p = vertexPoint(ringValue, i, TOTAL, R, CX, CY);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(' ');
  }

  function spokeEnd(i: number) {
    return vertexPoint(9, i, TOTAL, R, CX, CY);
  }

  function labelPos(i: number) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / TOTAL;
    const r = R * 1.3;
    return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
  }

  // Smooth blob through defined vertices only, in order. Unset vertices
  // create visible gaps (never connect through the center).
  $: segments = (() => {
    const defined = shown
      .map((v, i) => ({ v, i }))
      .filter(({ v }) => !v.unset);
    if (defined.length < 2) return [];
    const toPt = ({ v, i }: { v: Vertex; i: number }) => vertexPoint(v.value, i, TOTAL, R, CX, CY);
    // If every vertex is defined, close the blob.
    if (defined.length === TOTAL) {
      return [{ closed: true, d: smoothPath(defined.map(toPt), true) }];
    }
    // Build runs of consecutive defined vertices (by index) so gaps render.
    const runs = [];
    let run = [defined[0]];
    for (let k = 1; k < defined.length; k++) {
      if (defined[k].i === defined[k - 1].i + 1) {
        run.push(defined[k]);
      } else {
        runs.push(run);
        run = [defined[k]];
      }
    }
    runs.push(run);
    return runs
      .filter((r) => r.length >= 2)
      .map((r) => ({ closed: false, d: smoothPath(r.map(toPt), false) }));
  })();

  $: titleText = t('radar.title');
  $: descText = t('radar.hint');
  $: emptyText = t('radar.empty');
  $: allUnset = shown.every((v) => v.unset);
</script>

<style>
  .chart-wrap {
    max-width: 28rem;
    margin-inline: auto;
  }
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .grid-ring {
    fill: none;
    stroke: var(--border);
    stroke-width: 1;
  }
  .spoke {
    stroke: var(--border);
    stroke-width: 1;
  }
  .data-shape {
    fill: rgb(224 20 156 / 0.22);
    stroke: var(--primary);
    stroke-width: 3;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  .dot {
    fill: var(--primary);
    stroke: var(--surface);
    stroke-width: 1.5;
    transform-box: fill-box;
    transform-origin: center;
    animation: dot-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  }
  @keyframes dot-in {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .dot-unset {
    fill: transparent;
    stroke: var(--muted);
    stroke-width: 1.5;
    stroke-dasharray: 3 2;
  }
  .vertex-label {
    fill: var(--text);
    font-size: 11px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: middle;
  }
  .empty-text {
    fill: var(--muted);
    font-size: 13px;
    text-anchor: middle;
  }
  .legend {
    text-align: center;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  @media print {
    .chart-wrap {
      break-inside: avoid;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
</style>

<div class="chart-wrap">
  <svg
    viewBox="0 0 {size} {size}"
    role="img"
    aria-labelledby="radar-title radar-desc"
    focusable="false"
  >
    <title id="radar-title">{titleText}</title>
    <desc id="radar-desc">{descText}</desc>

    {#each RINGS as ring}
      <polygon class="grid-ring" points={ringPoints(ring)} />
    {/each}

    {#each VERTEX_GROUPS as _, i}
      {@const end = spokeEnd(i)}
      <line class="spoke" x1={CX} y1={CY} x2={end.x} y2={end.y} />
    {/each}

    {#each segments as seg}
      <path class="data-shape" d={seg.d} fill={seg.closed ? undefined : 'none'} />
    {/each}

    {#each shown as vertex, i}
      {@const center = vertexPoint(vertex.unset ? 0 : vertex.value, i, TOTAL, R, CX, CY)}
      {#if vertex.unset}
        <circle class="dot-unset" cx={CX} cy={CY} r="4">
          <title>{t(`radar.vertices.${vertex.key}.label`)}: {t('scale.unset')}</title>
        </circle>
      {:else}
        <circle class="dot" cx={center.x} cy={center.y} r="4" style="animation-delay: {i * 70}ms">
          <title
            >{t(`radar.vertices.${vertex.key}.label`)}: {formatVertexValue(vertex.value)}
            ({vertex.count}/{vertex.members.length})</title
          >
        </circle>
      {/if}
    {/each}

    {#each VERTEX_GROUPS as group, i}
      {@const lp = labelPos(i)}
      <text class="vertex-label" x={lp.x} y={lp.y}>
        {t(`radar.vertices.${group.key}.label`)}
      </text>
    {/each}

    {#if allUnset}
      <text class="empty-text" x={CX} y={CY - 14}>{emptyText}</text>
    {/if}
  </svg>

  <p class="legend muted">{descText}</p>

  <div class="sr-only">
    <table>
      <caption>{titleText}</caption>
      <tbody>
        {#each shown as vertex}
          <tr>
            <th scope="row">{t(`radar.vertices.${vertex.key}.label`)}</th>
            <td>
              {#if vertex.unset}
                {t('scale.unset')}
              {:else}
                {formatVertexValue(vertex.value)} ({vertex.count}/{vertex.members.length})
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
