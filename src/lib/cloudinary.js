import { contructCloudinaryUrl } from 'cloudinary-transformer';

import {
  CLOUDINARY_SPACE_JELLY_OG_HOME,
  CLOUDINARY_SPACE_JELLY_OG_POST,
  CLOUDINARY_SPACE_JELLY_OG_PAGE,
} from 'data/cloudinary';

/**
 * getSpaceJellyOgHomeUrl
 */

export function getSpaceJellyOgHomeUrl() {
  return contructCloudinaryUrl(CLOUDINARY_SPACE_JELLY_OG_HOME);
}

/**
 * getSpaceJellyOgPostUrl
 */

export function getSpaceJellyOgPostUrl({ headline, subtext }) {
  const config = { ...CLOUDINARY_SPACE_JELLY_OG_POST };

  config.text[0].text = headline;
  config.text[1].text = subtext;

  return contructCloudinaryUrl(config);
}

/**
 * getSpaceJellyOgPageUrl
 */

export function getSpaceJellyOgPageUrl({ headline }) {
  const config = { ...CLOUDINARY_SPACE_JELLY_OG_PAGE };

  config.text[0].text = headline;

  return contructCloudinaryUrl(config);
}
