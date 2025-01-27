<script lang="ts">
  import { onMount } from 'svelte';
  import { quintInOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { elevation } from 'eXtern-OS/actions';
  import { fadeOut } from 'eXtern-OS/helpers/fade';
  import { waitFor } from 'eXtern-OS/helpers/wait-for'; 

  let hiddenSplashScreen = false;
  let progressVal = tweened(100, { duration: 3000, easing: quintInOut });

  onMount(async () => {
    $progressVal = 0;
    await waitFor(3000);
    hiddenSplashScreen = true;
  });
  //{#if !(hiddenSplashScreen || import.meta.env.DEV)}
</script>

{#if !(hiddenSplashScreen || import.meta.env.DEV)}
  <div out:fadeOut={{ duration: 500 }} class="splash-screen" use:elevation={'bootup-screen'}>
    <img src="/app-icons/eXtern-OS-logo.png" style="height: 120px; filter: contrast(0.5);" />

    <div
      class="progress"
      role="progressbar"
      aria-valuenow={100 - $progressVal}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext="Loading up eXtern OS Web"
    >
      <div class="indicator" style:transform="translateX(-{$progressVal}%)" />
    </div>
  </div>
{/if}

{#if import.meta.env.PROD}
  <iframe id="audio" src="/sounds/signed-in.mp3" allow="autoplay" title="hello" />
{/if}

<style lang="scss">
  .splash-screen {
    position: fixed;
    top: 0;
    bottom: 0;

    height: 100vh;
    width: 100vw;

    cursor: none;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    animation-fill-mode: forwards;

    background-color: #000;

    :global(svg) {
      font-size: 100px;
      color: white;
    }
  }

  .progress {
    border-radius: 50px;

    height: 4px;
    width: 150px;

    overflow-x: hidden;

    background-color: var(--system-color-grey-800);
  }

  .indicator {
    background-color: var(--system-color-grey-100);

    border-radius: inherit;

    width: 100%;
    height: 100%;

    transform: translateX(-0%);
    opacity: 0.2;
  }

  #audio {
    position: absolute;
    z-index: -9999;

    display: none;
  }
</style>
