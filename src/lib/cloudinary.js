import { contructCloudinaryUrl } from 'cloudinary-transformer';

import { CLOUDINARY_SPACE_JELLY_OG } from 'data/cloudinary';

export function getCloudinarySpaceJellyOgUrl({ headline, subtext }) {
  const config = { ...CLOUDINARY_SPACE_JELLY_OG };

  config.text[0].text = headline;
  config.text[1].text = subtext;

  return contructCloudinaryUrl(config);
}
