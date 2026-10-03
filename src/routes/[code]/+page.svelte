<script lang="ts">
  import Slider from '$lib/components/Slider.svelte';
  import RadarChart from '$lib/components/RadarChart.svelte';
  import { axes } from '$lib/config.js';
  import { applySfw } from '$lib/share.js';
  import { translateFor } from '$lib/locale.js';
  import { locale } from '$lib/locale.js';
  import type { PageData } from './$types';

  export let data: PageData;

  $: t = (key: string) => translateFor($locale, key);
  $: valuesArray = axes.map(({ id }) => ({ axis: id, value: data.values[id] ?? 0 }));
  $: effectiveValues = applySfw(data.values, data.sfw);
  $: makeYoursHref = $locale === 'en' ? '/' : `/?l=${$locale}`;
</script>

<svelte:head>
  <title>{t('mine')}</title>
  <meta name="description" content={t('share.text')} />
  <meta property="og:title" content={t('mine')} />
  <meta property="og:description" content={t('share.text')} />
  <meta name="twitter:title" content={t('mine')} />
  <meta name="twitter:description" content={t('share.text')} />
</svelte:head>

<h2 class="title">{t('mine')}</h2>

{#if data.sfw}
  <p class="muted notice" role="note">{t('sfw.hiddenNotice')}</p>
{/if}

<ul class="axes">
  {#each valuesArray as { axis, value } (axis)}
    <li>
      <h3>{t(`axes.${axis}.label`)}</h3>
      <Slider min={1} max={9} value={value} disabled label={t(`axes.${axis}.label`)} />
      <div class="scale" aria-hidden="true">
        <span>{t(`axes.${axis}.farLeft`)}</span>
        <span class="mid">{t(`axes.${axis}.middle`)}</span>
        <span class="end">{t(`axes.${axis}.farRight`)}</span>
      </div>
    </li>
  {/each}
</ul>

<section class="card chart-card" aria-label={t('radar.title')}>
  <RadarChart values={effectiveValues} {t} />
</section>

<div class="jumbotron">
  <a class="btn big" href={makeYoursHref}> 💬 {t('generate')} </a>
</div>

<style>
  .title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    text-align: center;
    font-weight: 800;
    margin: 1rem 0 2rem;
  }
  .notice {
    text-align: center;
  }
  .chart-card {
    margin: 1rem 0;
  }
  .axes {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 3rem;
  }
  h3 {
    font-weight: 700;
    margin: 0 0 0.25rem;
  }
  .scale {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: var(--muted);
  }
  .scale .mid {
    text-align: center;
  }
  .scale .end {
    text-align: end;
  }
  .jumbotron {
    text-align: center;
  }
  .big {
    display: block;
    font-size: 1.15em;
  }
</style>
