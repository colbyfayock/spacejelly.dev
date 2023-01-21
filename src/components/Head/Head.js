import { cloneElement } from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';

import useSite from 'hooks/use-site';

const Head = ({ title, description, ...props }) => {
  const { asPath } = useRouter();

  const { metadata = {} } = useSite();
  const { title: siteTitle } = metadata;

  return (
    <NextHead {...props}>
      <title>{`${title} - ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} on ${siteTitle}`} />
      <meta property="og:description" content={description} />
    </NextHead>
  );
};

export default Head;
