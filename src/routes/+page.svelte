<script lang="ts">
  import Slider from '$lib/components/Slider.svelte';
  import RadarChart from '$lib/components/RadarChart.svelte';
  import { axes, DEFAULT_VALUE, UNSET_VALUE } from '$lib/config.js';
  import type { AxisValues } from '$lib/config.js';
  import { encodeValues } from '$lib/share.js';
  import { locale, translateFor } from '$lib/locale.js';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  $: t = (key: string) => translateFor($locale, key);

  let values: AxisValues = {};
  for (const { id } of axes) values[id] = DEFAULT_VALUE;

  let copied = false;
  let showChart = false;
  let chartSection: HTMLElement | undefined;

  onMount(() => {
    try {
      const storedValues = localStorage.getItem('spectrum-values');
      if (storedValues) {
        const parsed: unknown = JSON.parse(storedValues);
        if (typeof parsed === 'object' && parsed !== null) {
          const record = parsed as Record<string, unknown>;
          for (const { id } of axes) {
            const v = record[id];
            if (Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 9) {
              values[id] = v as number;
            }
          }
        }
      }
    } catch {}
  });

  $: if (browser) {
    try {
      localStorage.setItem('spectrum-values', JSON.stringify(values));
    } catch {}
  }

  $: code = encodeValues(values);

  // Clean share links: the locale param is only included when it carries
  // information (non-default locale), ha.mr-style.
  $: shareParams = $locale === 'en' ? '' : `?l=${$locale}`;
  $: shareUrl = browser ? `${$page.url.origin}/${code}${shareParams}` : `/${code}`;

  $: shareText = t('share.text');

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const el = document.getElementById('share-url') as HTMLInputElement | null;
      el?.select();
      document.execCommand?.('copy');
    }
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }

  async function nativeShare(): Promise<void> {
    try {
      await navigator.share({ title: t('title'), text: shareText, url: shareUrl });
    } catch {}
  }

  function clearAxis(id: string): void {
    values[id] = UNSET_VALUE;
  }

  function toggleChart(): void {
    showChart = !showChart;
    if (showChart && browser) {
      requestAnimationFrame(() => chartSection?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    }
  }
</script>

<svelte:head>
  <title>{t('title')}</title>
  <meta property="og:title" content={t('title')} />
  <meta property="og:description" content={t('description')} />
  <meta name="twitter:title" content={t('title')} />
  <meta name="twitter:description" content={t('description')} />
</svelte:head>

<h2 class="hero">
  {t('description')}
  <br />
  <small class="muted">{t('generateHelper')}</small>
</h2>

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
      <Slider min={1} max={9} bind:value={values[id]} label={t(`axes.${id}.label`)} />
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
    <button type="button" title={t('share.copy')} on:click={copy}>
      {copied ? t('share.copied') : '📋'}
    </button>
  </div>

  <div class="row share-row">
    {#if typeof navigator !== 'undefined' && 'share' in navigator}
      <button type="button" class="flex-1" on:click={nativeShare}>{t('share.native')}</button>
    {/if}
    <a
      class="btn btn-secondary flex-1"
      target="_blank"
      rel="noopener"
      href={`https://mastodonshare.com/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
    >
      {t('share.mastodon')}
    </a>
    <a
      class="btn btn-secondary flex-1"
      target="_blank"
      rel="noopener"
      href={`https://bsky.app/intent/compose?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
    >
      {t('share.bluesky')}
    </a>
    <a
      class="btn btn-secondary flex-1"
      target="_blank"
      rel="noopener"
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
    >
      {t('share.x')}
    </a>
  </div>
</div>

<div class="reveal">
  <button type="button" on:click={toggleChart} aria-expanded={showChart}>
    {showChart ? t('radar.hide') : t('radar.show')}
  </button>
</div>

{#if showChart}
  <section class="card chart-card reveal-in" aria-label={t('radar.title')} bind:this={chartSection}>
    <RadarChart values={values} {t} />
  </section>
{/if}

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
  .chart-card {
    margin-bottom: 1.5rem;
  }
  .reveal {
    text-align: center;
    margin: 2.5rem auto 0;
  }
  .reveal-in {
    animation: reveal-in 0.35s ease;
  }
  @keyframes reveal-in {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(8px);
    }
    to {
      opacity: 1;
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
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
  }
  .scale {
    display: flex;
    justify-content: space-between;
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
  }
  .share-row {
    display: flex;
    gap: 0.5rem;
  }
  .flex-1 {
    flex: 1 1 auto;
  }
</style>
