<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import CloseIcon from 'eXtern-OS/components/SVG/window-controls/CloseSVG.svelte';
  import GreenLight from 'eXtern-OS/components/SVG/window-controls/GreenLight.svelte';
  import MinimizeSvg from 'eXtern-OS/components/SVG/window-controls/MinimizeSVG.svelte';
  import { appsConfig } from 'eXtern-OS/configs/apps/apps-config';
  import type { AppID } from 'eXtern-OS/stores/apps.store';
  import { activeApp } from 'eXtern-OS/stores/apps.store';

  export let appID: AppID;

  const dispatch = createEventDispatcher();

  function closeApp() {
    dispatch('close-app');
  }

  function greenLightAction() {
    dispatch('maximize-click');
  }
</script>

<div class="container" class:unfocused={$activeApp !== appID}>
  <button class="minimize-window-btn"> </button>
  <button class="expand-window-btn" on:click={greenLightAction}>
  </button>
  <button class="close-window-btn" on:click={closeApp}> <CloseIcon /> </button>
</div>

<style lang="scss">
  .container {
    --button-size: 0.8rem;

    // pointer-events: none;

    display: grid;
    grid-template-columns: repeat(3, var(--button-size));
    align-items: center;
    gap: 0.6rem;

    height: 100%;

    &.unfocused button {
      --bgcolor: #ffffff00;
      --border-color: #ffffff40;
    }

    :global(svg) {
      opacity: 0;
    }

    &:hover {
      button {
        opacity: 0.1;
        //transform: scale(1.1);
        //--bgcolor: hsla(var(--system-color-dark-hsl), 0.8);
    //--border-color: hsla(var(--system-color-dark-hsl), 0.8);
      }

      :global(svg) {
        opacity: 0.5;
      }
    }
  }

  button {
    height: var(--button-size);
    width: var(--button-size);

    // pointer-events: initial;

    //transition: background-color 0.5s;
    background-color: var(--bgcolor);
    
    box-shadow: 0 0 0 0.5px var(--border-color);

    transition: transform 100ms ease-in, background-color 0.2s, opacity 0.2s;

    :global(svg) {
      transition: opacity 0.2s;
    }
  }

  .close-window-btn {
    --bgcolor: hsla(var(--system-color-dark-hsl), 0.2);
    --border-color: hsla(var(--system-color-dark-hsl), 0.2);
    border-radius: 50%;
    &:hover {
      //transform: scale(1.1);
      --bgcolor: rgb(255 0 0 / 60%);
      --border-color: gb(255 0 0 / 60%);
      opacity: 1 !important;
    }
    :global(svg) {
      filter: invert(100%);
    }
  }

  .expand-window-btn {
    --bgcolor: hsla(var(--system-color-dark-hsl), 0.2);
    --border-color: hsla(var(--system-color-dark-hsl), 0.2);

    &:hover {
      //transform: scale(1.1);
      --bgcolor: hsla(var(--system-color-primary-hsl), 0.7);
      --border-color: hsla(var(--system-color-primary-hsl), 0.7);
      opacity: 1 !important;
    }

    :global(svg) {
      transform: rotate(90deg);
    }
  }

  .minimize-window-btn {
    --bgcolor: hsla(var(--system-color-dark-hsl), 0.2);
    --border-color: hsla(var(--system-color-dark-hsl), 0.2);
    height: 0.2rem;

    &:hover {
      //transform: scale(1.1);
      --bgcolor: hsla(var(--system-color-primary-hsl), 0.7);
      --border-color: hsla(var(--system-color-primary-hsl), 0.7);
      opacity: 1 !important;
    }
  }
</style>
