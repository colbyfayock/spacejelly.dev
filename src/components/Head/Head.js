import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { CldOgImage } from 'next-cloudinary';

import { removeLastTrailingSlash } from 'lib/util';

import useSite from 'hooks/use-site';

const Head = ({ title, description, ogImage, ...props }) => {
  const { asPath } = useRouter();
  const path = asPath.split('?')[0];

  const { metadata = {}, homepage } = useSite();
  const { title: siteTitle } = metadata;

  if (!ogImage) {
    ogImage = {
      layout: 'page',
      alt: title,
    };
  }

  ogImage.overlays = [];

  if (ogImage.layout === 'post') {
    ogImage.publicId = 'assets/spacejellydev-og-post-v2-2';
    ogImage.overlays.push({
      width: 1400,
      crop: 'fit',
      text: {
        color: 'white',
        fontFamily: 'Source Sans Pro',
        fontSize: 160,
        fontWeight: 'bold',
        text: ogImage.title,
        lineSpacing: -40,
      },
      position: {
        x: 100,
        y: 100,
        gravity: 'north_west',
      },
    });
  } else if (ogImage.layout === 'page') {
    ogImage.publicId = 'assets/spacejellydev-og-page-v2-1';
    ogImage.overlays.push({
      width: 2000,
      crop: 'fit',
      text: {
        color: 'white',
        fontFamily: 'Source Sans Pro',
        fontSize: 220,
        fontWeight: 'bold',
        text: ogImage.title,
        lineSpacing: -40,
      },
      position: {
        x: 0,
        y: -300,
        gravity: 'center',
      },
    });
  } else if (ogImage.layout === 'home') {
    ogImage.publicId = 'assets/spacejellydev-og-home-v2-1';
  } else if (ogImage.layout === 'colbyashi-maru') {
    ogImage.publicId = 'assets/spacejellydev-og-colbyashi-maru-v2-1';
  }

  return (
    <>
      <NextHead {...props}>
        {path === '/' && (
          <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
          </>
        )}
        {path !== '/' && (
          <>
            <title>{`${title} - ${siteTitle}`}</title>
            <meta property="og:title" content={`${title} on ${siteTitle}`} />
          </>
        )}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${removeLastTrailingSlash(homepage)}${path}`} />
        <link rel="canonical" href={`${removeLastTrailingSlash(homepage)}${path}`} />
        <link
          rel="alternate"
          href={`${removeLastTrailingSlash(homepage)}/feed.xml`}
          type="application/rss+xml"
          title="Space Jelly"
        />
      </NextHead>
      <CldOgImage
        src={ogImage.publicId}
        overlays={ogImage.overlays}
        excludeTags={['twitter:title']}
        alt={ogImage.alt}
      />
    </>
  );
};

export default Head;
