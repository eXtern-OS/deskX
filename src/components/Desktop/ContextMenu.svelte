<script lang="ts">
  import { elevation } from 'eXtern-OS/actions';
  import { contextMenuConfig } from 'eXtern-OS/configs/menu/context.menu.config';
  import { fadeOut } from 'eXtern-OS/helpers/fade';
  import { theme } from 'eXtern-OS/stores/theme.store';

  export let targetElement: HTMLElement;

  let xPos = 0;
  let yPos = 0;
  let isMenuVisible = false;

  function handleContextMenu(e: MouseEvent) {
    if (!targetElement?.contains(e.target as HTMLElement)) return (isMenuVisible = false);

    let x = e.pageX;
    let y = e.pageY;

    // Open to other side if rest of space is too small
    if (window.innerWidth - x < 250) x -= 250;
    if (window.innerHeight - y < 300) y -= 250;

    xPos = x;
    yPos = y;

    isMenuVisible = true;
  }

  function hideMenu() {
    isMenuVisible = false;
  }
</script>

<svelte:body on:contextmenu|preventDefault={handleContextMenu} on:click={hideMenu} />

{#if isMenuVisible}
  <div
    class="container"
    class:dark={$theme.scheme === 'dark'}
    style:transform="translate({xPos}px, {yPos}px)"
    out:fadeOut
    use:elevation={'context-menu'}
  >
    {#each Object.values(contextMenuConfig.default) as contents}
      <button class="menu-item">{contents.title}</button>

      {#if contents.breakAfter}
        <div class="divider" />
      {/if}
    {/each}
  </div>
{/if}

<style lang="scss">
  .container {
    --additional-shadow: 0 0 0 0 white;
    display: block;
    max-width: 200px;

    min-width: 16rem;

    padding: 0.5rem;

    position: fixed;
    top: 0;
    left: 0;

    -webkit-font-smoothing: antialiased;
    user-select: none;

    background-color: hsla(var(--system-color-light-hsl), 0.3);

    border-radius: 0.5rem;

    box-shadow: hsla(0, 0%, 0%, 0.3) 0px 0px 11px 0px, var(--additional-shadow);

    &.dark {
      --additional-shadow: 0 1px 5px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.1);

      &::before {
        transform: scale(0.99);
      }
    }

    &::before {
      content: '';

      width: 100%;
      height: 100%;

      border-radius: inherit;

      position: absolute;
      left: 0;
      top: 0;

      transform: scale(0.996);

      z-index: -1;
      backdrop-filter: blur(15px);
    }

    * {
      -webkit-font-smoothing: antialiased;
    }
  }

  .menu-item {
    --alpha: 1;

    display: flex;
    justify-content: flex-start;

    width: 100%;

    padding: 0.3rem 0.4rem;
    margin: 0.2rem 0;

    letter-spacing: 0.4px;
    font-weight: 400;
    font-size: 0.9rem;

    border-radius: 0.3rem;

    backface-visibility: hidden;
    transition: none;

    color: hsla(var(--system-color-dark-hsl), var(--alpha));

    &:hover,
    &:focus-visible {
      background-color: hsla(var(--system-color-primary-hsl), 0.75);
      color: var(--system-color-primary-contrast);
    }
  }

  .divider {
    width: 100%;
    height: 0.2px;

    background-color: hsla(var(--system-color-dark-hsl), 0.2);

    margin: 2px 0;
  }
</style>
