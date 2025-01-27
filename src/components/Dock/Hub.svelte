<script lang="ts">
  import { Search, Mic, Lock, Power, Cloud, Calendar, Sun, Folder, FileImage, Camera, Mail, Calculator } from 'lucide-svelte';
  import { appsConfig } from 'eXtern-OS/configs/apps/apps-config';
  import { theme } from 'eXtern-OS/stores/theme.store';
  let activeTab = 'activity';

  const apps = [
    { icon: "M", label: "Word", color: "bg-blue-600" },
    { icon: "N", label: "OneNote", color: "bg-purple-600" },
    { icon: Cloud, label: "OneDrive" },
    { icon: "S", label: "Spotify", color: "bg-green-600" },
    { icon: Calendar, label: "Calendar" },
    { icon: Sun, label: "Weather" },
    { icon: Folder, label: "Files" },
    { icon: FileImage, label: "Photos" },
    { icon: Camera, label: "Camera" },
    { icon: Mail, label: "Mail" },
    { icon: "N", label: "Netflix", color: "bg-red-600" },
    { icon: "P", label: "Phone", color: "bg-blue-400" },
    { icon: "Ps", label: "Photoshop CC", color: "bg-blue-600" },
    { icon: "Id", label: "InDesign CC", color: "bg-pink-600" },
    { icon: "St", label: "Store", color: "bg-blue-500" },
    { icon: Calculator, label: "Calculator" },
  ];

  const activities = [
    {
      icon: "/app-icons/wallpapers/256.webp",
      name: "System",
      action: "System setup complete",
      time: "2min",
    }
  ];
</script>

<div class="relative w-[1200px]">
  <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 custom-shadow rounded-full">
    <div class=" rounded-full bg-purple-600 border-4 border-zinc-950 flex items-center justify-center overflow-hidden">
      <img src="https://pbs.twimg.com/profile_images/1828037926057631744/rhM6NmtG_400x400.jpg" alt="User Avatar" class="object-cover w-24 h-24"/>
    </div>
  </div>
  <div class="text-zinc-50 rounded-lg shadow-2xl p-6 pt-16 space-y-6  backdrop-blur-xl container">
    <!-- Search Bar -->
    <div class="relative backdrop-blur-lg sub-container rounded-lg border border-white/20 shadow-lg">
      <Search class={`absolute left-3 top-3.5 h-5 w-5 ${$theme.scheme === 'dark' ? 'text-white/70' : 'text-black/70' }`} />
      <input
        class={`w-full pl-10 pr-10 py-3 bg-transparent border-none 
               placeholder:text-black/60 
               ${$theme.scheme === 'dark' ? 'dark:placeholder:text-white/60 ' : 'dark:placeholder:text-black/60 '}
               text-black dark:text-white dark:border-white 
               focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg`}
        placeholder="Ask ITAI"
      />
    
    
      <button class="absolute right-3 top-2 p-2 bg-transparent hover:bg-white/20 rounded-full transition-all">
        <Mic class={`h-5 w-5 ${$theme.scheme === 'dark' ? 'text-white/70' : 'text-black/70' }`} />
      </button>
    </div>
    

    <h1 class="text-2xl font-semibold text-center opacity-90">Good Morning, Anesu</h1>

    <div class="grid grid-cols-2 gap-2">
      <!-- Apps Section -->
      <div class="sub-container rounded-sm p-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">My Apps</h2>
          <button class="text-sm hover:text-zinc-200">Show all</button>
        </div>
        <div class="grid grid-cols-4 gap-4">
          {#each Object.entries(appsConfig) as [appID, config]}
            <a
              href="#"
              class="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <img
                class="w-15 h-15 flex items-center justify-center rounded-md"
                src={`/app-icons/${appID}/256.webp`}
              />
              <span class={`text-xs ${$theme.scheme === 'dark' ? 'text-white/60' : 'text-black/60' }`}>{config.title}</span>
            </a>
          {/each}
        </div>
      </div>

      <!-- Notes & Activity Section -->
      <div class="space-y-6 sub-container rounded-sm p-5">
        <!-- Quick Notes -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Quick Notes</h2>
            <button class="text-sm hover:text-zinc-200">New note</button>
          </div>
          <div class="space-y-3">
            <!--<div class="bg-blue-100/50 p-2 rounded-lg border border-blue-500/50 shadow-lg shadow-blue-500/50">
              <h3 class="text-zinc-900 text-sm">Shopping List</h3>
            </div>-->
            <div class="bg-yellow-100/50 p-2 rounded-lg border border-yellow-500/50 shadow-lg shadow-yellow-500/50">
              <h3 class="text-zinc-900 text-sm">Release Notes</h3>
            </div>
            
          </div>
        </div>

        <!-- Activity Hub -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <div class="space-x-4">
              <button
                class="text-lg font-semibold {activeTab === 'activity' ? 'opacity-100' : 'opacity-40'}"
                on:click={() => activeTab = 'activity'}
              >
                Activity Hub
              </button>
              <button
                class="text-lg font-semibold {activeTab === 'details' ? 'opacity-100' : 'opacity-40'}"
                on:click={() => activeTab = 'details'}
              >
                Details
              </button>
            </div>
            <button class="text-sm hover:text-zinc-200">Show all</button>
          </div>
          {#if activeTab === 'activity'}
            <div class="h-[150px] overflow-y-auto space-y-4">
              {#each activities as activity}
                <div class="flex items-center gap-3 text-sm">
                  {#if activity.avatar}
                    <div class="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                      <span class="text-xs font-semibold">AA</span>
                    </div>
                  {:else}
                    <div class="w-8 h-8 flex items-center justify-center">
                      <img src={activity.icon} alt={activity.name}/>
                    </div>
                  {/if}
                  <div class="flex-1">
                    <p class="text-md">{activity.name}</p>
                    <p class="font-normal">{activity.action}</p>
                  </div>
                  <span class="">{activity.time}</span>
                </div>
              {/each}
            </div>
          {:else}
            <div class="">No details to show</div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    //background-color: var(--system-color-light);
    background-color: hsla(var(--system-color-light-hsl), 0.3);
    color: hsla(var(--system-color-dark-hsl), 0.9);
    font-weight: bold;
  }

  .custom-shadow {
    box-shadow: 0 0 12px 17px #00000000, 0 0 20px 10px #0000003b, var(--tw-shadow);
    border-style: solid;
    border-width: 2px;
    border-color: #ffffff40;
  }

  a:hover {
    background-color: hsla(var(--system-color-light-hsl), 0.1);
  }


  .sub-container {
    //background-color: var(--system-color-light);
    background-color: hsla(var(--system-color-light-hsl), 0.1);
  }

  .titlebar {
    padding: 1rem 1rem;

    width: 100%;

    position: absolute;
    top: 0;
    left: 0;
  }

  .main-area {
    font-size: 1.618rem;
    //color: var(--system-color-light-contrast);
    color: hsla(var(--system-color-dark-hsl), 0.9);

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>