import { parseCookies, setCookie } from 'nookies';
import { cookieScoringStorage, cookieTestStorage } from '@uniformdev/optimize-tracker';

const createCookieAccess = (ctx) => {
  return {
    getCookie: (name) => {
      const cookies = parseCookies(ctx) || {};
      return cookies[name];
    },

    setCookie: (name, value, maxAge) => {
      if (typeof window === 'undefined') {
        return;
      }

      setCookie(ctx, name, value, {
        maxAge,
        path: '/',
        sameSite: 'strict',
        secure: window.location.protocol === 'https:',
      });
    },
  };
};

export const createNextCookieStorage = (ctx) => {
  return cookieScoringStorage(createCookieAccess(ctx));
};

export const createNextTestStorage = (ctx) => {
  return cookieTestStorage(createCookieAccess(ctx));
};
