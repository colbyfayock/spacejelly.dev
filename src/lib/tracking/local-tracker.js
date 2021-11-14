import { createDefaultTracker } from '@uniformdev/optimize-tracker-browser';
import { indexedDbScopeStorage } from '@uniformdev/optimize-tracker-storage-indexeddb';
import intentManifest from '../intentManifest.json';
import { createNextCookieStorage, createNextTestStorage } from './nextCookieStorage';

export const createLocalTracker = (ctx) =>
  createDefaultTracker({
    intentManifest: intentManifest,
    storage: {
      scopes: indexedDbScopeStorage({
        scoringStorage: createNextCookieStorage(ctx),
      }),
      tests: createNextTestStorage(ctx),
    },
  });

export const localTracker = createLocalTracker();
