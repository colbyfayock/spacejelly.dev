import { contructCloudinaryUrl } from 'cloudinary-transformer';

import {
  CLOUDINARY_SPACE_JELLY_OG_HOME,
  CLOUDINARY_SPACE_JELLY_OG_COLBYASHI_MARU,
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
 * getSpaceJellyOgColbyashiMaruUrl
 */

export function getSpaceJellyOgColbyashiMaruUrl() {
  return contructCloudinaryUrl(CLOUDINARY_SPACE_JELLY_OG_COLBYASHI_MARU);
}

/**
 * getSpaceJellyOgPostUrl
 */

export function getSpaceJellyOgPostUrl({ headline, subtext }) {
  const config = { ...CLOUDINARY_SPACE_JELLY_OG_POST };

  config.text[0].text = headline.replace(/,/g, escape(','));
  config.text[1].text = subtext.replace(/,/g, escape(','));

  return contructCloudinaryUrl(config);
}

/**
 * getSpaceJellyOgPageUrl
 */

export function getSpaceJellyOgPageUrl({ headline }) {
  const config = { ...CLOUDINARY_SPACE_JELLY_OG_PAGE };

  config.text[0].text = headline.replace(/,/g, escape(','));

  return contructCloudinaryUrl(config);
}
