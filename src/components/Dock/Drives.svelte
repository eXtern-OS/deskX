<script lang="ts">
  import DockItem from './DockItem.svelte';
  import { AppID } from 'eXtern-OS/stores/apps.store';
  export let mouseX: number | null;
  export let appID: AppID = "files";
  export let needsUpdate: boolean = false;

</script>

<DockItem {mouseX} {appID} {needsUpdate} driveType={"system-drive"} /> 

<style lang="scss">
 
</style>