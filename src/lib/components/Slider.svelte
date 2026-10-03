<script lang="ts">
  export let value: number = 5;
  export let min: number = 1;
  export let max: number = 9;
  export let disabled: boolean = false;
  export let label: string = 'value';
  export let valuetext: string = '';

  function activate(): void {
    if (value === 0) value = 5;
  }
</script>

<style>
  input[type='range'] {
    width: 100%;
    height: 2.5rem;
    accent-color: var(--primary);
    cursor: ew-resize;
    background: transparent;
    margin: 0;
  }
  input[type='range'].empty {
    opacity: 0.45;
  }
  input[type='range']:disabled {
    cursor: not-allowed;
  }
</style>

<input
  type="range"
  {min}
  {max}
  step="1"
  bind:value
  {disabled}
  class:empty={value === 0}
  aria-label={label}
  aria-valuetext={valuetext || undefined}
  on:pointerdown={activate}
  on:mousedown={activate}
  on:keydown={(e) => {
    if (value === 0 && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
      e.preventDefault();
      value = 5;
    }
  }}
/>
