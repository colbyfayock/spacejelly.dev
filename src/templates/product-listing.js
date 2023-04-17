import { WebsiteJsonLd } from 'lib/json-ld';

import Head from 'components/Head';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import CldImage from 'components/CldImage';

import styles from 'styles/templates/ProductListing.module.scss';

export default function TemplateProductListing({
  title = 'Products',
  Title,
  metaDescription,
  description,
  products,
  columns = 4,
}) {
  return (
    <Layout>
      <Head
        title={title}
        description={metaDescription}
        ogImage={{
          title,
          layout: 'page',
        }}
      />

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
                      <CldImage
                        className={styles.productImage}
                        width="1400"
                        height="700"
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
