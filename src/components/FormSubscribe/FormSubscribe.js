import { useState } from 'react';
import ClassName from 'models/classname';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './FormSubscribe.module.scss';

const FormSubscribe = ({ children, className, ...rest }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState();

  const formClassName = new ClassName(styles.formSubscribe);

  formClassName.addIf(className, className);

  let successMessage;
  let errorMessage;

  if (subscriptionStatus === 'missing_email') {
    errorMessage = 'Make sure to enter your email before submitting!';
  } else if (subscriptionStatus === 'unknown_error') {
    errorMessage = 'Something went wrong, try again!';
  }

  if (subscriptionStatus === 'active') {
    successMessage = 'Check your inbox Sunday for the next issue!';
  } else if (subscriptionStatus === 'inactive') {
    successMessage = 'Check your inbox to confirm your subscription!';
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const fields = Array.from(e.currentTarget.elements);
    const email = fields.find((field) => field.name === 'email_address')?.value;

    if (!email) {
      setSubscriptionStatus('missing_email');
      return;
    }

    try {
      const { data } = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email,
        }),
      }).then((r) => r.json());

      setSubscriptionStatus(data.status);
    } catch (e) {
      setSubscriptionStatus('unknown_error');
    }
  }

  return (
    <form
      className={formClassName.toString()}
      action="https://app.convertkit.com/forms/1978116/subscriptions"
      method="post"
      onSubmit={handleOnSubmit}
      {...rest}
    >
      {!successMessage && (
        <>
          <Input
            id="subscribe-email"
            className={styles.formSubscribeInput}
            name="email_address"
            placeholder="Your email address"
            aria-label="Your email address"
            type="email"
            required
          />
          <Button>Get Updates</Button>
        </>
      )}
      {successMessage && <p className={styles.formSuccessMessage}>{successMessage}</p>}
      {errorMessage && <p className={styles.formErrorMessage}>{errorMessage}</p>}
    </form>
  );
};

export default FormSubscribe;
