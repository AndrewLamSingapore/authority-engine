import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'h3pl1rfx',
    dataset: 'production',
  },
  deployment: {
    appId: 'dg8pzby23i0fatm58o7im4sc',
    autoUpdates: true,
  },
});