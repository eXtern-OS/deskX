import { createAppConfig } from 'eXtern-OS/helpers/create-app-config';

const hub = createAppConfig({
  title: 'Hub',
  resizable: true,

  height: 600,
  width: 800,
});

const wallpapers = createAppConfig({
  title: 'Wallpapers',
  resizable: true,

  height: 600,
  width: 800,

  dockBreaksBefore: true,
});

const calculator = createAppConfig({
  title: 'Calculator',

  expandable: true,
  resizable: false,

  height: 300 * 1.414,
  width: 300,
});

const calendar = createAppConfig({
  title: 'Calendar',
  resizable: true,
});

const scriptify = createAppConfig({
  title: 'Scriptify',
  resizable: true,

  height: 600,
  width: 800,
});

const files = createAppConfig({
  title: 'Files',
  resizable: true,

  // dockBreaksBefore: true,
  shouldOpenWindow: false,
});

const playStudio = createAppConfig({
  title: 'PlayStudio',
  resizable: true,
});

const appstore = createAppConfig({
  title: 'App Store',
  resizable: true,
});

export const appsConfig = {
  files,
  wallpapers,
  calculator,
  calendar,
  scriptify,
  appstore,

  'playstudio': playStudio,
};
