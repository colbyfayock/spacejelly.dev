import { FaShoppingCart, FaExternalLinkSquareAlt } from 'react-icons/fa';
import NextHead from 'next/head';
import Script from 'next/script';

import { getAllProducts } from 'lib/products';
import { getRouteByName } from 'lib/routes';
import { WebsiteJsonLd } from 'lib/json-ld';

import Head from 'components/Head';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Image from 'components/Image';
import Button from 'components/Button';

import styles from 'styles/pages/Store.module.scss';

export default function Store({ products }) {
  const title = 'Space Jelly Store';
  const metaDescription = 'Buy the latest Cosmo gear';

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

      <NextHead>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
      </NextHead>

      <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.21/default/snipcart.css" />

      <Header className={styles.header}>
        <h1>{title}</h1>

        <p className={styles.cart}>
          <a
            className={`${styles.cartLink} snipcart-checkout snipcart-summary`}
            href="#"
            style={{ textDecoration: 'none' }}
          >
            <FaShoppingCart aria-label="Shopping Cart" /> <span className="snipcart-total-price">$0.00</span>
            <span className={styles.cartCheckout}>Check Out</span>
          </a>
          <span className={styles.cartShipping}>
            + $2 Flat Rate Shipping
            <br />
            <a
              href="https://www.usps.com/international/first-class-mail-international.htm"
              target="_blank"
              rel="noopener"
            >
              via USPS Standard / Global Mail
            </a>
          </span>
        </p>
      </Header>

      <Section>
        <Container>
          <h2 className="sr-only">Products</h2>
          <ul className={styles.products}>
            {products.map((product) => {
              const { productId, title, price, featuredImage, variation } = product;

              const external = [
                {
                  title: 'Cotton Bureau',
                  pattern: /cottonbureau\.com/,
                },
                {
                  title: 'Redbubble',
                  pattern: /redbubble\.com/,
                },
              ];

              const externalProduct = external.find(({ pattern }) => productId.match(pattern));

              if (externalProduct) {
                return (
                  <li key={productId}>
                    <div className={styles.product}>
                      <Image
                        className={styles.productImage}
                        {...featuredImage}
                        src={featuredImage.sourceUrl}
                        dangerouslySetInnerHTML={featuredImage.caption}
                      />
                      <h3 className={styles.productTitle}>{title}</h3>
                      {variation && <p className={styles.productVariation}>{variation}</p>}
                      <p className={styles.productAvailableOn}>Available on {externalProduct.title}</p>
                      <p className={styles.productPrice}>${(price / 100).toFixed(2)}</p>
                      <p className={styles.productButton}>
                        <a href={productId} rel="noreferrer" target="_blank">
                          Buy Now
                          <FaExternalLinkSquareAlt />
                        </a>
                      </p>
                    </div>
                  </li>
                );
              }

              return (
                <li key={productId}>
                  <div className={styles.product}>
                    <Image
                      className={styles.productImage}
                      {...featuredImage}
                      src={featuredImage.sourceUrl}
                      dangerouslySetInnerHTML={featuredImage.caption}
                    />
                    <h3 className={styles.productTitle}>{title}</h3>
                    {variation && <p className={styles.productVariation}>{variation}</p>}
                    <p className={styles.productPrice}>${(price / 100).toFixed(2)}</p>
                    <p className={styles.productButton}>
                      <Button
                        className="snipcart-add-item"
                        data-item-id={productId}
                        data-item-image={featuredImage.sourceUrl}
                        data-item-name={title}
                        data-item-url={getRouteByName('store')?.path}
                        data-item-price={price / 100}
                      >
                        Add to Cart
                      </Button>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <p className={styles.poweredBy}>
            <a href="https://snipcart.com/">
              Powered by
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134.5 29.3">
                <path
                  fill="#f6e767"
                  d="M24.7 6.1L14.7.3c-.9-.5-2.3-.5-3.2 0l-10 5.8C.7 6.7 0 7.9 0 8.9v11.5c0 1 .7 2.2 1.6 2.7l10 5.8c.9.5 2.3.5 3.2 0l10-5.8c.9-.5 1.6-1.7 1.6-2.7V8.9c-.1-1-.8-2.2-1.7-2.8zM22 12.4h-1v-1.8c0-1.3-1-1.8-3-1.8h-.1c-4.8 0-4.4-1.8-4.5-2.5h-.1c-.1.7.3 2.5-4.5 2.5h-.1c-2 0-3 .4-3 1.8V12L22 16.7v2c0 1.9-.9 3-4.1 3h-.2c-2.4 0-4 .5-4 2.5h-1c0-1.9-1.5-2.5-4-2.5-3.1 0-4.1-1.1-4.1-3V17h1v1.8c0 1.3 1 1.8 3 1.8h.1c4.8 0 4.4 1.8 4.5 2.5h.1c.1-.7-.3-2.5 4.5-2.5h.2c2 0 3-.4 3-1.8v-1L4.6 13v-2.3c0-1.9.9-3 4.1-3h.2c2.5 0 4-.5 4-2.5h1c0 1.9 1.5 2.5 4 2.5h.1c3.1 0 4.1 1.1 4.1 3l-.1 1.7z"
                />
                <path
                  fill="#ffffff"
                  d="M38.1 11.9c0-1.4 1.5-2 2.7-2 1.2 0 2.5.4 2.6 1.8h1.1c-.3-2.3-2.3-2.8-3.8-2.8-1.9 0-3.7 1.1-3.7 3.2 0 2.5 2.9 3.1 4.8 3.8 1 .3 1.8.9 1.8 2 0 1.5-1.5 2.3-2.8 2.3-1.6 0-2.9-.5-2.9-2.3h-1.1c0 1.9 1.6 3.3 3.5 3.3 2.4 0 4.6-.8 4.6-3.3-.2-4.2-6.8-2.7-6.8-6zm20.6 7.5L52.2 9.1H51v11.7h1.1V10.7l6.3 10.1h1.3V9.1h-1.1l.1 10.3zm8.2 1.5H68V9.1h-1.1v11.8zM78.2 9.1h-2.9v11.7h1.1v-5.1h1.9c2.3 0 4.8-.5 4.8-3.3-.1-2.8-2.7-3.3-4.9-3.3zm.7 5.7h-2.6v-4.7h2.6c1.6 0 3 .5 3 2.3-.1 1.9-1.5 2.4-3 2.4zm13.6 5.3c-3 0-3.9-2.7-3.9-5.1 0-2.4.9-5.1 3.9-5.1 1.3 0 2.6.6 2.8 2h1.1c-.2-2.1-2-3-3.9-3-3.5 0-5.1 2.9-5.1 6.1 0 3.3 1.5 6.1 5.1 6.1 1.9 0 3.7-1.1 4-3.1h-1.1c-.3 1.5-1.6 2.1-2.9 2.1zm11.9-11l-4.7 11.7h1.1l1.2-3.2h5.8l1.3 3.2h1.2l-4.7-11.7h-1.2zm-2 7.6l2.6-6.6 2.5 6.6h-5.1zm17.4-2c1.4-.4 2.3-1.3 2.3-2.6 0-1.1-.4-2-1.2-2.5-.9-.6-1.7-.6-2.8-.6h-3.8v11.7h1.1v-5.6h2.9c2.1 0 2.3.5 2.5 3.2.1.8.1 1.7.4 2.4h1.2c-.5-.7-.4-1.6-.6-3.5-.2-1.2-.5-2.2-2-2.5zm-2.3-.4h-2.3v-4.2h2.4c1.1 0 3.2-.2 3.2 2.1.1 2-1.8 2.1-3.3 2.1zm8.4-5.2v1h3.8v10.8h1V10.1h3.7v-1h-8.5z"
                />
              </svg>
            </a>
          </p>
        </Container>
      </Section>

      <Section className={styles.notes}>
        <Container>
          <h2>Notes</h2>
          <ul>
            <li>
              <h3>How much is shipping?</h3>
              <p>Flat rate of $2.00 USD.</p>
            </li>
            <li>
              <h3>Where can I ship to?</h3>
              <p>
                Wherever a{' '}
                <a href="https://www.usps.com/international/first-class-mail-international.htm">USPS Global Stamp</a>{' '}
                lets me!
              </p>
            </li>
          </ul>
        </Container>
      </Section>

      <WebsiteJsonLd siteTitle={title} />

      <Script src="https://cdn.snipcart.com/themes/v3.0.21/default/snipcart.js" />
    </Layout>
  );
}

export async function getStaticProps() {
  const { products } = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}
