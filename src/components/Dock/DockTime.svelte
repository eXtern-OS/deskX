<script lang="ts">
  import { format } from 'date-fns';
  import { clickOutside, focusOutside, elevation } from 'eXtern-OS/actions';
  import { createIntervalStore } from 'eXtern-OS/stores/interval.store';

  
  


  
  const time = createIntervalStore(1000);

  
</script>



  <div style="text-align: center; color: var(--system-color-light-contrast); opacity: 0.9; /*font-weight: bold;*/ text-shadow: 0 0 12px #0000007a; margin-bottom: 0px;">
    <div style="font-size: 70%; margin-bottom: -5px;">{format($time, 'EEE MMM dd')}</div>
    <div style="font-weight: bold; font-size: 18px">{format($time, 'h:mm aa')}</div>
  </div>

  <style lang="scss">
  
    

    </style>