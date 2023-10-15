import { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';

export default function Document() {
  return (
    <Html>
      <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div hidden id="snipcart" data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY} />
      </body>
    </Html>
  );
}
