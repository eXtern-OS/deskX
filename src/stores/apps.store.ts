import { writable } from 'svelte/store';
import type { appsConfig } from 'eXtern-OS/configs/apps/apps-config';

export type AppID = keyof typeof appsConfig;

/** Which apps are currently open */
export const openApps = writable<Record<AppID, boolean>>({
  wallpapers: false,
  files: false,
  scriptify: false,
  calculator: false,
  appstore: false,
  calendar: false,
  playstudio: true


});

/** Which app is currently focused */
export const activeApp = writable<AppID>('files');

/**
 * Maximum zIndex for the active app
 * Initialize with -2, so that it becomes 0 when initialised
 */
export const activeAppZIndex = writable(-2);

export const appZIndices = writable<Record<AppID, number>>({
  wallpapers: 0,
  files: 0,
  scriptify: 0,
  calculator: 0,
  appstore: 0,
  calendar: 0,
  playstudio: 0,
});

export const isAppBeingDragged = writable(false);

export const appsInFullscreen = writable<Record<AppID, boolean>>({
  wallpapers: false,
  files: false,
  scriptify: false,
  calculator: false,
  appstore: false,
  calendar: false,
  playstudio: false,
});
