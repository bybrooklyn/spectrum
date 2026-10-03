<script lang="ts">
  import Slider from '$lib/components/Slider.svelte';
  import { axes, DEFAULT_VALUE, MIN_VALUE, MAX_VALUE, UNSET_VALUE } from '$lib/config.js';
  import type { AxisValues } from '$lib/config.js';
  import { encodeValues } from '$lib/share.js';
  import { locale, translateFor, axisValueText } from '$lib/locale.js';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { onMount, onDestroy } from 'svelte';

  $: t = (key: string) => translateFor($locale, key);

  let values: AxisValues = {};
  for (const { id } of axes) values[id] = DEFAULT_VALUE;

  let copied = false;
  let copyTimer = 0;
  let saveTimer = 0;

  /** Stored slider state carries a version so old shapes never load. */
  const STORAGE_VERSION = 1;

  function readStoredValues(): void {
    try {
      const raw = localStorage.getItem('spectrum-values');
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null) return;
      const record = parsed as { version?: unknown; values?: unknown };
      if (record.version !== STORAGE_VERSION || typeof record.values !== 'object' || record.values === null) return;
      const stored = record.values as Record<string, unknown>;
      for (const { id } of axes) {
        const v = stored[id];
        if (Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 9) {
          values[id] = v as number;
        }
      }
    } catch {}
  }

  function saveValuesSoon(): void {
    if (!browser) return;
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      try {
        localStorage.setItem('spectrum-values', JSON.stringify({ version: STORAGE_VERSION, values }));
      } catch {}
    }, 300);
  }

  onMount(() => {
    readStoredValues();
    return () => {
      window.clearTimeout(saveTimer);
      window.clearTimeout(copyTimer);
    };
  });

  $: {
    // Persist slider state, debounced: slider drags fire many updates.
    // Referencing `values` here re-runs this block on every change.
    void values;
    saveValuesSoon();
  }

  $: code = encodeValues(values);

  // Clean share links: the locale param is only included when it carries
  // information (non-default locale), ha.mr-style.
  $: shareParams = $locale === 'en' ? '' : `?l=${$locale}`;
  $: shareUrl = browser ? `${$page.url.origin}/${code}${shareParams}` : `/${code}`;

  async function copy(): Promise<void> {
    let ok = false;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        ok = true;
      }
    } catch {}
    if (!ok) {
      try {
        const el = document.getElementById('share-url') as HTMLInputElement | null;
        el?.select();
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
    }
    // Report success honestly: no checkmark on failure.
    if (!ok) return;
    copied = true;
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => (copied = false), 2000);
  }

  function clearAxis(id: string): void {
    values[id] = UNSET_VALUE;
  }
</script>

<svelte:head>
  <title>{t('title')}</title>
  <meta property="og:title" content={t('title')} />
  <meta property="og:description" content={t('description')} />
  <meta name="twitter:title" content={t('title')} />
  <meta name="twitter:description" content={t('description')} />
</svelte:head>

<h1 class="hero">
  {t('description')}
  <br />
  <small class="muted">{t('generateHelper')}</small>
</h1>

<ul class="axes">
  {#each axes as { id } (id)}
    <li>
      <h3>
        {t(`axes.${id}.label`)}
        {#if values[id] > 0}
          <button
            type="button"
            class="btn-clear"
            aria-label={`${t('scale.unset')}: ${t(`axes.${id}.label`)}`}
            on:click={() => clearAxis(id)}>✕</button
          >
        {/if}
      </h3>
      <Slider
        min={MIN_VALUE}
        max={MAX_VALUE}
        bind:value={values[id]}
        label={t(`axes.${id}.label`)}
        valuetext={axisValueText(t, id, values[id])}
      />
      <div class="scale" aria-hidden="true">
        <span>{t(`axes.${id}.farLeft`)}</span>
        <span class="mid">{t(`axes.${id}.middle`)}</span>
        <span class="end">{t(`axes.${id}.farRight`)}</span>
      </div>
    </li>
  {/each}
</ul>

<div class="jumbotron">
  <label class="muted small" for="share-url">{t('generate')}</label>
  <div class="input-group">
    <input readonly value={shareUrl} id="share-url" on:click={(e) => e.currentTarget.select()} />
    {#key copied}
      <button
        type="button"
        class="copy-btn"
        class:pop={copied}
        title={t('share.copy')}
        aria-label={copied ? t('share.copied') : t('share.copy')}
        on:click={copy}
      >
        <span aria-hidden="true">{copied ? '✓' : '📋'}</span>
        <span class="sr-only" role="status">{copied ? t('share.copied') : ''}</span>
      </button>
    {/key}
  </div>
</div>

<style>
  .hero {
    font-size: clamp(1.5rem, 3vw, 2rem);
    text-align: center;
    margin: 1rem 0 2rem;
    font-weight: 800;
  }
  .hero small {
    font-size: 1rem;
    font-weight: 400;
  }
  .copy-btn.pop {
    animation: copy-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes copy-pop {
    0% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.12);
    }
    100% {
      transform: scale(1);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .copy-btn.pop {
      animation: none;
      transition: none;
      transform: none;
    }
  }
  .small {
    font-size: 0.875rem;
  }
  .axes {
    padding: 0;
    margin: 0;
    display: grid;
    gap: 3rem;
    list-style: none;
  }
  .axes > li {
    list-style-type: none;
  }
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }
  .btn-clear {
    margin-inline-start: auto;
    background: transparent;
    border: none;
    box-shadow: none;
    color: var(--muted);
    padding: 0.25rem;
    min-width: 2.75rem;
    min-height: 2.75rem;
    font-size: 1rem;
  }
  .scale {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--muted);
    margin-top: 0.15rem;
  }
  .scale .mid {
    text-align: center;
  }
  .scale .end {
    text-align: end;
  }
  .input-group {
    display: flex;
    width: 100%;
    margin: 0.5rem 0 1rem;
  }
  .input-group input {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
  .input-group button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
    white-space: nowrap;
    min-width: 3rem;
  }
</style>
