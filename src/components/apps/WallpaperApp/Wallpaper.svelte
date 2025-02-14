<script lang="ts">
  import { elevation } from 'eXtern-OS/actions';
  import { wallpapersConfig } from 'eXtern-OS/configs/wallpapers/wallpaper.config';
  import { smallerClosestValue } from 'eXtern-OS/helpers/smaller-closest-value';
  import { createIntervalStore } from 'eXtern-OS/stores/interval.store';
  import { theme } from 'eXtern-OS/stores/theme.store';
  import { wallpaper } from 'eXtern-OS/stores/wallpaper.store';

  let visibleBackgroundImage = wallpapersConfig.fletschhorn.image;

  const interval = createIntervalStore(5 * 1000);

  $: {
    $interval;

    if (wallpapersConfig[$wallpaper.id].type === 'standalone') {
      $wallpaper.image = wallpapersConfig[$wallpaper.id].image;
      break $;
    }

    /** Only adaptive and light/dark wallpaper logic to tackle */
    // Now check if user really wants the change to happen.

    handleTheme();
    handleWallpaper();
  }

  function handleWallpaper() {
    const date = new Date();
    const hour = date.getHours();

    const wallpaperTimestampsMap = wallpapersConfig[$wallpaper.id].timestamps.wallpaper;
    const timestamps = Object.keys(wallpaperTimestampsMap);

    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);

    if (hour > maxTimestamp || hour < minTimestamp) {
      // Go for the min timestamp value
      if (wallpaperTimestampsMap[maxTimestamp]) {
        $wallpaper.image = wallpaperTimestampsMap[maxTimestamp];
      }

      return;
    }

    // Now set the right timestamp
    const chosenTimeStamp = smallerClosestValue(timestamps, hour);

    if (wallpaperTimestampsMap[chosenTimeStamp]) {
      $wallpaper.image = wallpaperTimestampsMap[chosenTimeStamp];
    }
  }

  function handleTheme() {
    if (!$wallpaper.canControlTheme) return;

    const date = new Date();
    const hour = date.getHours();

    const themeTimestampsMap = wallpapersConfig[$wallpaper.id].timestamps.theme;
    const timestamps = Object.keys(themeTimestampsMap);

    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);

    if (hour > maxTimestamp || hour < minTimestamp) {
      // Go for the min timestamp value
      $theme.scheme = 'dark';
      return;
    }

    // Now set the right timestamp
    const chosenTimeStamp = smallerClosestValue(timestamps, hour);
    $theme.scheme = themeTimestampsMap?.[chosenTimeStamp] || 'light';
  }

  function previewImageOnLoad() {
    visibleBackgroundImage = $wallpaper.image;
  }
</script>

<!-- Prefetch all wallpapers -->
<!-- <svelte:head>
  {#each Object.values(wallpapersConfig) as { thumbnail }}
    <link rel="prefetch" href={thumbnail} />
  {/each}
</svelte:head> -->

<!-- This preload and render the image for browser but invisible to user -->
<img src={$wallpaper.image} aria-hidden="true" alt="" on:load={previewImageOnLoad} />

<div
  class="background-cover"
  style:background-image="url({visibleBackgroundImage})"
  use:elevation={'wallpaper'}
/>

<style lang="scss">
  img {
    height: 1px;
    width: 1px;

    display: none;
  }

  .background-cover {
    height: 100%;
    width: 100%;

    position: fixed;
    top: 0;
    left: 0;

    will-change: background-image;

    transition: background-image 150ms ease-in;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>
