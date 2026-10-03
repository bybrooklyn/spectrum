<script lang="ts">
  import type { TranslateFn } from '$lib/locale-types.js';

  export let t: TranslateFn;

  const year = new Date().getFullYear();
</script>

<style>
  footer {
    border-top: 1px solid var(--border);
    margin-top: 4rem;
    padding: 1.25rem 1rem 2rem;
    text-align: center;
    font-size: 0.85rem;
    color: var(--muted);
  }
  ul {
    list-style: none;
    margin: 0 0 0.5rem;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>

<footer>
  <ul>
    <li>
      <a href="https://github.com/bybrooklyn/spectrum" target="_blank" rel="noopener">
        {t('footer.source')}
      </a>
    </li>
    <li>
      <a href="https://oql.avris.it/license?c=Andrea%20Vos%7Chttps://avris.it" target="_blank" rel="noopener">
        OQL
      </a>
    </li>
  </ul>
  <p>© {year} bybrooklyn (is gay :3)</p>
</footer>
