import type { Theme } from 'eXtern-OS/stores/theme.store';

export type Wallpaper = {
  name: string;
  type: 'standalone' | 'automatic' | 'adaptive';

  thumbnail: string;

  image?: string;

  /** Timestamps definition in terms of when a new wallpaper should take effect */
  timestamps?: {
    wallpaper?: Record<number, string>;
    theme?: Record<number, Theme['scheme']>;
  };
};

const optimizedWallpapers = import.meta.glob('../../assets/wallpapers/*.{webp,jpg}', {
  eager: true,
  query: { w: 3000, quality: 98, format: 'webp' },
}) as Record<string, any>;

const wallpaperThumbnails = import.meta.glob('../../assets/wallpapers/*.{webp,jpg}', {
  eager: true,
  query: { w: 800, format: 'webp' },
}) as Record<string, any>;

const createWallpapersConfig = <TConfig = string>(
  wallpaperConfig: Record<keyof TConfig, Wallpaper>,
): Record<keyof TConfig, Wallpaper> => {
  const optimizedWallpapersArr = Object.entries(optimizedWallpapers);

  for (const [wallpaperName, config] of Object.entries(wallpaperConfig)) {
    const wallpaper = wallpaperConfig[wallpaperName as keyof TConfig];
    const thumbnail = config.thumbnail;

    wallpaper.thumbnail = (
      Object.entries(wallpaperThumbnails).find(([path]) => path.includes(thumbnail))[1] as any
    ).default;

    wallpaper.image = (
      optimizedWallpapersArr.find(([path]) => path.includes(thumbnail))[1] as any
    ).default;

    if (wallpaper.type !== 'standalone') {
      for (const [time, imgName] of Object.entries(config.timestamps.wallpaper)) {
        wallpaper.timestamps.wallpaper[time] = (
          optimizedWallpapersArr.find(([path]) => path.includes(imgName))[1] as any
        ).default;
      }
    }
  }

  return wallpaperConfig;
};

export const wallpapersConfig = createWallpapersConfig({
  fletschhorn: {
    name: 'Fletschhorn',
    type: 'adaptive',
    thumbnail: 'fletschhorn-v2-0',
    timestamps: {
      wallpaper: {
        7: 'fletschhorn-v2-0',
        9: 'fletschhorn-v2-1',
        12: 'fletschhorn-v2-2',
        17: 'fletschhorn-v2-3',
        18: 'fletschhorn-v2-4',
        19: 'fletschhorn-v2-5',
      },
      theme: {
        7: 'light',
        18: 'dark',
      },
    },
  },

  atacama: {
    name: 'Atacama',
    type: 'adaptive',
    thumbnail: 'atacama-0',
    timestamps: {
      wallpaper: {
        7: 'atacama-0',
        9: 'atacama-1',
        11: 'atacama-2',
        13: 'atacama-3',
        15: 'atacama-4',
        16: 'atacama-5',
        17: 'atacama-6',
        18: 'atacama-7',
        20: 'atacama-8',
      },
      theme: {
        7: 'light',
        18: 'dark',
      },
    },
  },

  'cabin-in-woods': {
    name: 'Cabin in the Woods',
    type: 'standalone',
    thumbnail: '6',
  },
  
  tron: {
    name: 'Tron',
    type: 'standalone',
    thumbnail: '7',
  },

  'lone-dune-wolf': {
    name: 'Lone Dune Wolf',
    type: 'standalone',
    thumbnail: '2',
  },

  'vibrant-night': {
    name: 'Vibrant Night',
    type: 'standalone',
    thumbnail: '5',
  },

  dune: {
    name: 'Dune',
    type: 'standalone',
    thumbnail: '4',
  },

  'somber-forest': {
    name: 'Somber Forest',
    type: 'standalone',
    thumbnail: '1',
  },

  'fox-in-somber-forest': {
    name: 'Fox in Somber Forest',
    type: 'standalone',
    thumbnail: '3',
  },

  'lost-lands': {
    name: 'Lost Lands',
    type: 'standalone',
    thumbnail: '8',
  },
  'flower-field': {
    name: 'Flower Field',
    type: 'standalone',
    thumbnail: '9',
  },
});

export type WallpaperID = keyof typeof wallpapersConfig;

console.log(wallpapersConfig);
