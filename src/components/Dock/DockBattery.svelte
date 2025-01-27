<script lang="ts">
  let batteryLevel = 100;
  let isBatteryCharging = false;
  (navigator as any).getBattery().then(function(battery) {
    function updateBatteryStatus() {
      batteryLevel = Math.floor(battery.level * 100);
      isBatteryCharging = battery.charging ;
        console.log("Battery percentage: " + battery.level * 100 + "%");
        console.log("Charging: " + (battery.charging ? "Yes" : "No"));
    }
    
    updateBatteryStatus();

    battery.addEventListener('levelchange', function() {
        updateBatteryStatus();
    });
    
    battery.addEventListener('chargingchange', function() {
        updateBatteryStatus();
    });
});

</script>

<div id="battery-icon">
  <img
  width="38"
  height="38"
  src={isBatteryCharging ? "/dock/battery-charging.svg" : "/dock/battery0.svg"}
  alt="Bluetooth"
  draggable="false"
  style="opacity: 0.8 !important;"
/>
<span class={isBatteryCharging ? "charging-status" : ""}>{batteryLevel}</span>
</div>

<style lang="scss">
  #battery-icon {
    position: relative;
    span {
      position: absolute;
    left: 0;
    font-size: 70%;
    top: calc(50% - 0.4rem);
    font-weight: bold;
    opacity: 0.5;
    width: 90%;
    text-align: center;
    }
  }

  .charging-status {
    left: 4px !important;
    font-size: 50% !important;
    top: calc(50% - 0.25rem) !important;
  }
</style>