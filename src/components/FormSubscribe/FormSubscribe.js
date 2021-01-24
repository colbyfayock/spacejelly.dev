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
        className={styles.formSubscribeInput}
        name="email_address"
        aria-label="Your email address"
        placeholder="Your email address"
        type="email"
        required
      />
      <Button className={styles.formSubscribeButton}>Get Updates</Button>
    </form>
  );
};

export default FormSubscribe;
