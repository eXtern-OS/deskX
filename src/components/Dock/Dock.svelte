<script lang="ts">
  import { elevation } from 'eXtern-OS/actions';
  import { appsConfig } from 'eXtern-OS/configs/apps/apps-config';
  import { appsInFullscreen } from 'eXtern-OS/stores/apps.store';
  import { systemNeedsUpdate } from 'eXtern-OS/stores/system.store';
  import { isDockHidden } from 'eXtern-OS/stores/dock.store';
  import DockItem from './DockItem.svelte';
  import DockTime from './DockTime.svelte';
    import { formatRelative } from 'date-fns';
    import DockBattery from './DockBattery.svelte';
    import SystemDialog from '../SystemUI/SystemDialog.svelte';
    import ActionCenter from './ActionCenter.svelte'
    import Hub from './Hub.svelte'
    import { fadeIn, fadeOut } from 'eXtern-OS/helpers/fade';
    import Drvies from './Drives.svelte'

  let dockMouseX: number | null = null;
  let visible = false;
  let hubIsVisible = false
  let ignoreNextClickEvent = false;
  let ignoreNextClickEventForHub = false;

    /* LOGIC FOR THEME SWITCHING WHEN IT ISN'T ALLOWED */
    let isThemeWarningDialogOpen = false;
  $: isThemeWarningDialogOpen && themeWarningDialog.open();

  let themeWarningDialog: SystemDialog;

  const HIDDEN_DOCK_THRESHOLD = 30;
  let bodyHeight = 0;
  let mouseY = 0;

  let dockContainerEl: HTMLElement;

  $: {
    // Due to how pointer-events: none works, if dock auto opens, you move away, it won't close automatically.
    // So close it manually if mouse pointer goes out of the dock area.
    if (Math.abs(mouseY - bodyHeight) > dockContainerEl?.clientHeight) {
      dockMouseX = null;
    }

    /**
     * if mouseX != null then show the dock. No matter what
     * When it becomes null, Then use the mouseY and bodyHeight to determine if the dock should be hidden
     */
    if (dockMouseX !== null) {
      $isDockHidden = false;
      break $;
    }

    if (!Object.values($appsInFullscreen).some(Boolean)) {
      $isDockHidden = false;
      break $;
    }

    $isDockHidden = Math.abs(mouseY - bodyHeight) > HIDDEN_DOCK_THRESHOLD;
  }

  const toggleActionCenter = () => {
    visible = !visible;
  }

  const hideActionCenter = () => {
    if (!ignoreNextClickEvent) visible = false;
    ignoreNextClickEvent = false;
    hideHub();
  }

  const toggleHub = () => {
    hubIsVisible = !hubIsVisible;
  }

  const hideHub = () => {
    if (!ignoreNextClickEventForHub) hubIsVisible = false;
    ignoreNextClickEventForHub = false;
  }

  const preventNextClickEvent = () => {
    ignoreNextClickEvent = true;
    ignoreNextClickEventForHub = true;
  }
  
</script>

<svelte:body on:mousemove={({ y }) => (mouseY = y)} on:click={hideActionCenter} />

<svelte:window bind:innerHeight={bodyHeight} />

<section
  class="dock-container"
  class:dock-hidden={$isDockHidden}
  bind:this={dockContainerEl}
  use:elevation={'dock'}
  on:click={preventNextClickEvent}
>
  <div
    class="dock-el"
    class:hidden={$isDockHidden}
    on:mousemove={(event) => (dockMouseX = event.x)}
    on:mouseleave={() => (dockMouseX = null)}
  >
  {#if hubIsVisible}
    <div in:fadeIn out:fadeOut class="hub-menu-parent" use:elevation={'menubar-menu-parent'}>
      <Hub bind:isThemeWarningDialogOpen on:hide={hideHub}  />
    </div>
  {/if}
  {#if visible}
    <div in:fadeIn out:fadeOut class="menu-parent" use:elevation={'menubar-menu-parent'}>
      <ActionCenter bind:isThemeWarningDialogOpen />
    </div>
  {/if}
  <img
      width="38"
      height="38"
      id="extern-hub"
      src="/dock/system-overview.svg"
      alt="Hub"
      draggable="false"
      style="opacity: 0.8 !important; margin-bottom: 3px;"
      on:click={() => toggleHub()} 
    />
    <div class="divider" aria-hidden="true" />
    {#each Object.entries(appsConfig) as [appID, config]}
      {#if config.dockBreaksBefore}
        <div class="divider" aria-hidden="true" />
      {/if}
      <DockItem mouseX={dockMouseX} {appID} needsUpdate={$systemNeedsUpdate} />
      {#if appID === 'files'}
      <Drvies mouseX={dockMouseX} {appID} needsUpdate={$systemNeedsUpdate} /> 
      {/if}
    {/each}
    <div class="divider" aria-hidden="true" />
    <img
      width="18"
      height="18"
      src="/dock/prev.svg"
      alt="Previous"
      draggable="false"
      style="opacity: 0.8 !important; margin-right: 5px; margin-bottom: 11.5px; margin-left: 10px;"
    />
    <img
      width="38"
      height="38"
      src="/dock/play.svg"
      alt="Play"
      draggable="false"
      style="opacity: 0.8 !important; margin-bottom: 2.5px;"
    />
    <img
      width="18"
      height="18"
      src="/dock/next.svg"
      alt="Next"
      draggable="false"
      style="opacity: 0.8 !important; margin-right: 10px; margin-bottom: 11.5px; margin-left: 10px;"
    />
    <div class="divider" aria-hidden="true" />
    <img
      width="38"
      height="38"
      src="/dock/speaker1.svg"
      alt="Bluetooth"
      draggable="false"
      style="opacity: 0.8 !important; margin-bottom: 2.5px;"
    />
    <DockBattery/>
    <img
      width="38"
      height="38"
      src="/dock/bluetooth.svg"
      alt="Bluetooth"
      draggable="false"
      style="opacity: 0.8 !important; margin-bottom: 2.5px;"
    />
    <img
      width="38"
      height="38"
      src="/dock/wifi1.svg"
      alt="WiFi"
      draggable="false"
      style="opacity: 0.8 !important; margin-bottom: 2.5px;"
    />
    <div class="divider" aria-hidden="true" />
    <DockTime/>
    <img
    class={visible ? "action-center-opened" : ""}
      width="38"
      height="38"
      src="/dock/up-arrow.svg"
      alt="More"
      draggable="false"
      style="opacity: 0.8; margin-left: 5px; margin-bottom: 2.5px; transition: transform 0.5s ease, opacity 0.1s ease;"
      on:click={() => toggleActionCenter()} 
    />
  </div>
</section>


<style lang="scss">
  .action-center-opened {
    transform: rotate(180deg);
    opacity: 0.1 !important;
  }

  .action-center-closed {
    transform: rotate(0deg);
    transition: transform 0.3s;
  }
  #op
  #extern-hub:hover {
    opacity: 1 !important;
  }
  .dock-container {
    padding-bottom: 0.7rem;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 4rem;

    padding: 0.4rem;
    margin-bottom: 20px;

    display: flex;
    justify-content: center;

    &:not(.dock-hidden) {
      pointer-events: none;
    }
  }

  .menu-parent {
      position: absolute;
      margin-bottom: 50px;
    position: absolute;
    right: 0;
    }

    .hub-menu-parent {
      margin-bottom: 50px;
    position: absolute;
    left: 0;
    left: -220px;
    margin-bottom: 80px;
    }

  .dock-hub {
    position: absolute;
    bottom: calc(10px + 5rem);
    height: 80%;
    width: calc(100% - 10px);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(20px);
    background-color: hsla(var(--system-color-dark-contrast), 1);
    background-color: #ffffff1f;
    left: 5px;
    border-radius: 10px;
    display: none;
    box-shadow: inset 0 0 0 0.2px hsla(var(--system-color-grey-100-hsl), 0.1),
      0 0 0 0.2px hsla(var(--system-color-grey-900-hsl), 0.1), hsla(0, 0%, 0%, 0.3) 2px 5px 19px 7px;
  }

  .dock-el {
    /*background-color: hsla(var(--system-color-dark-contrast), 0.4);*/
    background-color: hsla(var(--system-color-light-hsl), 0.15);

    box-shadow: inset 0 0 0 0.2px hsla(var(--system-color-grey-100-hsl), 0.1),
      0 0 0 0.2px hsla(var(--system-color-grey-900-hsl), 0.1), hsla(0, 0%, 0%, 0.1) 2px 5px 19px 7px;

    /*box-shadow: inset 0 0 0 0.2px hsla(var(--system-color-grey-100-hsl), 0.1),
      0 0 0 0.2px hsla(var(--system-color-grey-900-hsl), 0.1), hsla(0, 0%, 0%, 0.3) 2px 5px 19px 7px; */

    position: relative;

    padding: 0.3rem;

    /*border-radius: 1.2rem;*/

    border-radius: 0.8rem;

    height: 100%;

    display: flex;
    align-items: flex-end;

    transition: transform 0.3s ease;

    &:not(.hidden) {
      pointer-events: auto;
    }

    &.hidden {
      transform: translate3d(0, 200%, 0);

      &::before {
        width: calc(100% - 2px);
        height: calc(100% - 2px);

        margin-top: 1px;
        margin-left: 1px;
      }
    }

    &::before {
      content: '';

      border-radius: 20px;

      width: 100%;
      height: 100%;

      border: inherit;

      backdrop-filter: blur(10px);

      position: absolute;
      top: 0;
      left: 0;

      z-index: -1;
    }
  }

  .divider {
    height: 100%;
    width: 0.2px;

    background-color: hsla(var(--system-color-dark-hsl), 0.3);

    margin: 0 4px;
  }
</style>
