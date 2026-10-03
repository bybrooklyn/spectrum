<script lang="ts">
  import { page } from '$app/stores';
  import { locale, translateFor } from '$lib/locale.js';

  $: t = (key: string) => translateFor($locale, key);
</script>

<svelte:head>
  <title>{$page.status} · {t('title')}</title>
</svelte:head>

<h1>{$page.status}</h1>

<p>{$page.error?.message}</p>

<p>
  <a class="btn" href="/">← {t('title')}</a>
</p>

<style>
  h1 {
    text-align: center;
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 800;
    margin: 2rem 0 1rem;
  }
  p {
    text-align: center;
  }
  .btn {
    display: inline-block;
    margin-top: 1rem;
  }
</style>
