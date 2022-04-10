import Link from 'next/link';

import styles from './Button.module.scss';

const Button = ({ children, className, href, display, ...rest }) => {
  let buttonClassName = styles.button;

  if (className) {
    buttonClassName = `${buttonClassName} ${className}`;
  }

  const buttonProps = {
    className: buttonClassName,
    'data-display': display,
    ...rest,
  };

  if (href && href.startsWith('/')) {
    return (
      <Link href={href}>
        <a {...buttonProps} data-display-type="button">
          {children}
        </a>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} {...buttonProps} rel="noreferrer noopener" data-display-type="button">
        {children}
      </a>
    );
  }

  return (
    <button {...buttonProps} data-display-type="button">
      {children}
    </button>
  );
};

export default Button;
