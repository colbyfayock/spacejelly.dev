import { Helmet } from 'react-helmet';
import styles from 'styles/App.module.scss';
import { FaShoppingCart } from 'react-icons/fa';

import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Button from 'components/Button';

import products from '../../data/products.json';

export default function Home() {
  const { metadata } = useSite();
  const { siteName } = metadata;

  return (
    <Layout displayNav={false}>

      <Helmet>
        <title>{ siteName }</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.21/default/snipcart.css" />
      </Helmet>

      <Section>
        <Container>
          <h1 className={styles.homeTitle}>
            { siteName }
          </h1>
          <p className={styles.homeDescription}>
            <a className="snipcart-checkout snipcart-summary" href="#" style={{textDecoration: "none"}}>
              <FaShoppingCart aria-label="Shopping Cart" /> <span className="snipcart-total-price">$0.00</span>
            </a>
            <span className={styles.homeDescriptionShipping}>
              + $2 Flat Rate Shipping via USPS Standard Mail
            </span>
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="sr-only">Available Products</h2>
          <ul className={styles.products}>
            {products.map(product => {
              const { id, title, images, price } = product;
              return (
                <li className={styles.product} key={id}>
                  <ul>
                    { images.map((image, index) => {
                      return (
                        <li key={image}>
                          <img src={image} alt={`Preview ${index + 1} of ${title}`} />
                        </li>
                      )
                    }) }
                  </ul>
                  <h3 className={styles.productTitle}>{ title }</h3>
                  <p className={styles.productPrice}>${ price }</p>
                  <Button
                    className={`${styles.productButton} snipcart-add-item`}
                    data-item-id={id}
                    data-item-image={images[0]}
                    data-item-name={title}
                    data-item-url="/"
                    data-item-price={price}
                  >
                    Add to Cart
                  </Button>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2>Notes</h2>
          <ul>
            <li>
              <h3>Where can I ship to?</h3>
              <p>
                Wherever a <a href="https://www.usps.com/international/first-class-mail-international.htm">USPS Global Stamp</a> lets me!
              </p>
            </li>
          </ul>
        </Container>
      </Section>

      <script async src="https://cdn.snipcart.com/themes/v3.0.21/default/snipcart.js" />
      <div hidden id="snipcart" data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY} />
    </Layout>
  )
}
