import ClassName from 'models/classname';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './FormSubscribe.module.scss';

const FormSubscribe = ({ children, className, ...rest }) => {
  const formClassName = new ClassName(styles.formSubscribe);

  formClassName.addIf(className, className);

  return (
    <form
      className={formClassName.toString()}
      action="https://app.convertkit.com/forms/1978116/subscriptions"
      method="post"
      {...rest}
    >
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
    </form>
  );
};

export default FormSubscribe;
