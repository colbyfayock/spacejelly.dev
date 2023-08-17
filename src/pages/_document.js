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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var script = document.createElement("script");
              script.src = "https://app.krunchdata.io/assets/js/k2.js";
              script.dataset.api = "https://api.krunchdata.io/traffic/web/record";
              script.dataset.id = "2UMPzzRooNRwoAuk4yuHtxTGitfJpzBW4G+jTmxq9VfPkkMbH8W1/Uelnza5XmEU";
              script.defer = true;
              script.type = "module";

              document.head.appendChild(script);
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
