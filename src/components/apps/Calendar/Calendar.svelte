<script lang="ts">
  import { addMonths, format } from 'date-fns';
  import { theme } from 'eXtern-OS/stores/theme.store';
  import LeftArrow from '~icons/ic/round-chevron-left';
  import RightArrow from '~icons/ic/round-chevron-right';
  import MonthView from './MonthView.svelte';

  export let view: 'year' | 'month' | 'week' | 'day' = 'month';

  let selectedDate = new Date();

  function goToToday() {
    selectedDate = new Date();
  }

  function goPreviousMonth() {
    selectedDate = addMonths(selectedDate, -1);
  }

  function goNextMonth() {
    selectedDate = addMonths(selectedDate, 1);
  }
</script>

<section class="container" class:dark={$theme.scheme === 'dark'}>
  <header class="app-window-drag-handle titlebar" />

  <section class="main-area">
    <div class="calendar-header">
      <div class="control-buttons">
        <button style="box-shadow: none; --bgcolor: hsla(var(--system-color-dark-hsl), 0);" on:click={goPreviousMonth}>
          <LeftArrow />
        </button>
        <button on:click={goToToday}>Today</button>
        <button style="box-shadow: none; --bgcolor: hsla(var(--system-color-dark-hsl), 0);" on:click={goNextMonth}>
          <RightArrow />
        </button>
      </div>

      <div style="float: right;">
        <span class="month">{format(selectedDate, 'MMMM')}</span>
        <span class="year">{format(selectedDate, 'yyyy')}</span>
      </div>
    </div>

    {#if view === 'year'}
      <div />
    {:else if view === 'month'}
      <MonthView {selectedDate} />
    {:else if view === 'week'}
      <div />
    {:else}
      <div />
    {/if}
  </section>
</section>

<style lang="scss">
  .container {
    background-color: hsla(var(--system-color-light-hsl), 0.3);
    //background-color: var(--system-color-light);

    /*backdrop-filter: blur(40px);*/

    border-radius: inherit;
    max-width: 100%;

    overflow: hidden;

    &.dark {
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.1);
    }
  }

  $title-bar-height: 2.5rem;

  .titlebar {
    padding: 1rem 1rem;

    width: 100%;
    height: $title-bar-height;

    position: absolute;
    top: 0;
    left: 0;
  }

  .main-area {
    //color: var(--system-color-light-contrast);
    color: hsla(var(--system-color-dark-hsl), 0.9);

    margin-top: $title-bar-height;

    height: calc(100% - #{$title-bar-height});
    width: 100%;

    overflow: hidden;

    display: flex;
    flex-direction: column;
  }

  .calendar-header {
    padding: 10px;
  }

  .month {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .year {
    font-size: 1.5rem;
  }

  .control-buttons {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: absolute;
    width: 100%;


    button {
      --bgcolor: hsla(var(--system-color-light-hsl), 0.2);

      border-radius: 0.375rem;
      //box-shadow: hsla(var(--system-color-dark-hsl), 0.4) 0px 0.5px 2px;

      background-color: var(--bgcolor);

      /*color: var(--system-color-dark);
      fill: var(--system-color-dark);*/
      font-weight: bold;

      padding: 0.2rem 0.5rem;
      margin: 0 0.05rem;

      height: 1.3rem;

      :global(svg) {
        font-size: 1.2rem;
      }

      :global(body.dark) & {
        --bgcolor: var(--system-color-grey-800);
        box-shadow: 0 0 white;
        --bgcolor: hsla(var(--system-color-dark-hsl), 0.2);
        color: hsla(var(--system-color-dark-hsl), 0.7);
      }
    }
  }
</style>
