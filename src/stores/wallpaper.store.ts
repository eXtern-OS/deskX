import { persisted } from 'svelte-local-storage-store';
import type { WallpaperID } from 'eXtern-OS/configs/wallpapers/wallpaper.config';

type WallpaperSettings = {
  id: WallpaperID;
  image: string;
  canControlTheme: boolean;
};

export const wallpaper = persisted<WallpaperSettings>('externos:wallpaper-settings:v2', {
  image: 'fletschhorn-v2-0',
  id: 'fletschhorn',
  canControlTheme: true,
});
