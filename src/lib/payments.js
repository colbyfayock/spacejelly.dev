import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const WEBSITE_HOST = process.env.NEXT_PUBLIC_WEBSITE_HOST;
const PAYMENT_SUCCESS_PATH = '/success';
const PAYMENT_CANCEL_PATH = '/';

export async function initCheckout({ lineItems } = {}) {
  const errorBase = 'Failed to initiate checkout';

  if ( !Array.isArray(lineItems) ) {
    throw new Error(`${errorBase}: lineItems is not an array`);
  }

  const stripe = await stripePromise;

  const { error } = await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    successUrl: `${WEBSITE_HOST}${PAYMENT_SUCCESS_PATH}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${WEBSITE_HOST}${PAYMENT_CANCEL_PATH}`,
  });

  if ( error ) {
    throw new Error(error);
  }

}


export function formatPrice({ amount, currency, quantity }) {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });

  const parts = numberFormat.formatToParts(amount);

  let zeroDecimalCurrency = true;

  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }

  amount = zeroDecimalCurrency ? amount : amount / 100;

  const total = (quantity * amount).toFixed(2);

  return numberFormat.format(total);
};

