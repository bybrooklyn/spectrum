<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { locale, translateFor, isRtl } from '$lib/locale.js';
  import { browser } from '$app/environment';

  export let data: { locale: string; sfw: boolean };

  $: if (data?.locale) {
    locale.set(data.locale);
    if (browser) {
      try {
        const stored = localStorage.getItem('spectrum-locale');
        if (!stored && data.locale) localStorage.setItem('spectrum-locale', data.locale);
      } catch {}
    }
  }

  $: t = (key: string) => translateFor($locale, key);

  // <html lang dir> can't be set from Svelte markup: keep it in sync
  // with the active locale so screen readers use the right voice.
  $: if (browser) {
    document.documentElement.lang = $locale;
    document.documentElement.dir = isRtl($locale) ? 'rtl' : 'ltr';
  }

  function unblockFonts(event: Event): void {
    const link = event.currentTarget as HTMLLinkElement | null;
    if (link) link.media = 'all';
  }
  $: dir = isRtl($locale) ? 'rtl' : 'ltr';
</script>

<svelte:head>
  <meta name="description" content={t('description')} />
  <meta name="keywords" content={t('keywords')} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="/image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="/image.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    rel="preload"
    as="style"
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
    rel="stylesheet"
    media="print"
    on:load={unblockFonts}
  />
</svelte:head>

<div dir={$locale && isRtl($locale) ? 'rtl' : 'ltr'} style="display: contents">
  <a class="skip-link" href="#main">{t('skip')}</a>
  <Nav {t} />
  <main id="main" tabindex="-1">
    <slot />
  </main>
  <Footer {t} />
</div>

<style>
  main {
    position: relative;
    max-width: 56em;
    width: calc(100% - 2rem);
    padding: 2rem clamp(1rem, 3vw, 2rem);
    margin: 5rem auto 0 auto;
  }
</style>
