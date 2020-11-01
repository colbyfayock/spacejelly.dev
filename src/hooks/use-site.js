import path from 'path';
import { useContext } from 'react';

import SiteContext from 'context/site-context';

export default function useSite() {
  const { metadata } = useContext(SiteContext);

  return {
    metadata
  };
}
