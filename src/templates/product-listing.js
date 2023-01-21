import Head from 'next/head';

import { getSpaceJellyOgPageUrl } from 'lib/cloudinary';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';

import styles from 'styles/templates/ProductListing.module.scss';

export default function TemplateProductListing({
  title = 'Products',
  Title,
  metaDescription,
  description,
  products,
  columns = 4,
}) {
  const ogImage = getSpaceJellyOgPageUrl({
    headline: title,
  });

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content="2024" />
        <meta property="og:image:height" content="1012" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
      </Head>

      <WebsiteJsonLd siteTitle={title} />

      <Header className={styles.header}>
        <h1>{Title || title}</h1>
        {description && (
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
      </Header>

      <Section>
        <Container>
          <ul className={styles.products} data-columns={columns}>
            {products.map((product) => {
              return (
                <li key={product.id}>
                  <a href={product.link} className={styles.product} rel="noreferrer">
                    {product.image && (
                      <img
                        className={styles.productImage}
                        width={product.image.width}
                        height={product.image.height}
                        src={product.image.url}
                        alt=""
                      />
                    )}

                    <h3 className={styles.productTitle}>{product.title}</h3>

                    {product.action && (
                      <span className={styles.productAction}>
                        {product.action.type === 'button' && (
                          <span className={styles.productActionButton}>{product.action.text}</span>
                        )}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </Layout>
  );
}
