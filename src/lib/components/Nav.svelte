<script lang="ts">
  import { locale, locales } from '$lib/locale.js';
  import { page } from '$app/stores';
  import type { TranslateFn } from '$lib/locale-types.js';

  export let t: TranslateFn;
  let menuShown = false;

  function hrefWithLocale(loc: string): string {
    const url = new URL($page.url);
    url.searchParams.set('l', loc);
    return url.pathname + url.search;
  }
</script>

<style>
  nav {
    border-bottom: 1px solid var(--border);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 50;
    background: var(--surface);
    box-shadow: 0 0.5rem 2rem 0 rgb(0 0 0 / 0.25);
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    max-width: 72rem;
    margin: 0 auto;
    padding: 0.6rem 1rem;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    font-weight: 800;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
  }
  .brand img {
    width: 1.75rem;
    height: 1.75rem;
  }
  .locales {
    display: flex;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .locales a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--muted);
    border: 1px solid transparent;
  }
  .locales a[aria-current='page'] {
    color: var(--primary-dark);
    border-color: var(--border);
    background: var(--primary-soft);
  }
  @media (prefers-color-scheme: dark) {
    /* Dark pink fails on the dark tint; use a light pink instead. */
    .locales a[aria-current='page'] {
      color: #f58ac4;
    }
  }
  .menu-btn {
    display: none;
  }
  @media (max-width: 640px) {
    .brand span {
      max-width: 12rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .menu-btn {
      display: inline-flex;
      align-items: center;
      min-height: 2.75rem;
      padding: 0.4rem 0.7rem;
    }
    .locales {
      display: none;
      position: absolute;
      top: 100%;
      inset-inline: 0;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 0.5rem 1rem 1rem;
      flex-wrap: wrap;
    }
    .locales.open {
      display: flex;
    }
  }
</style>

<nav aria-label="Main">
  <div class="container">
    <a class="brand" href={$locale === 'en' ? '/' : `/?l=${$locale}`}>
      <img src="/favicon.png" alt="" />
      <span>{t('title')}</span>
    </a>
    <button
      class="menu-btn btn-secondary btn"
      type="button"
      aria-expanded={menuShown}
      aria-controls="locale-menu"
      aria-label={t('menu')}
      on:click={() => (menuShown = !menuShown)}
    >
      <span aria-hidden="true">☰</span>
    </button>
    <ul class="locales" id="locale-menu" class:open={menuShown}>
      {#each Object.keys(locales) as loc}
        <li>
          <a
            href={hrefWithLocale(loc)}
            aria-current={loc === $locale ? 'page' : undefined}
            on:click={() => (menuShown = false)}
          >
            {loc.toUpperCase()}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
