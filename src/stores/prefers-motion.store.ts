import { persisted } from 'svelte-local-storage-store';

export const prefersReducedMotion = persisted(
  'externos:is-reduced-motion',
  matchMedia('(prefers-reduced-motion)').matches,
);
