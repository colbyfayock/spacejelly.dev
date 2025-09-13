import { useState } from "react";
import ClassName from "models/classname";

import Input from "components/Input";
import Button from "components/Button";

import styles from "./FormSubscribe.module.scss";

const FormSubscribe = ({
  children,
  className,
  location = "default",
  ...rest
}) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formClassName = new ClassName(styles.formSubscribe);

  formClassName.addIf(className, className);

  let successMessage;
  let errorMessage;

  if (subscriptionStatus === "missing_email") {
    errorMessage = "Make sure to enter your email before submitting!";
  } else if (subscriptionStatus === "unknown_error") {
    errorMessage = "Something went wrong, try again!";
  }

  if (subscriptionStatus === "active") {
    successMessage = "Check your inbox Sunday for the next issue!";
  } else if (subscriptionStatus === "inactive") {
    successMessage = "Check your inbox to confirm your subscription!";
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formAction = e.currentTarget.action;

    setIsLoading(true);

    try {
      const response = await fetch(formAction, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (result.success) {
        setSubscriptionStatus("inactive");
      } else {
        throw new Error(result.message || "Form submission error");
      }
    } catch (e) {
      setSubscriptionStatus("unknown_error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className={formClassName.toString()}
      action="https://mailtik.spacejelly.dev/api/forms/newsletter"
      method="POST"
      onSubmit={handleOnSubmit}
      {...rest}
    >
      <fieldset
        disabled={isLoading}
        style={{ border: "none", padding: 0, margin: 0 }}
      >
        <input
          type="text"
          autoComplete="off"
          tabIndex={-1}
          style={{
            position: "absolute",
            left: "-9999px",
            width: "0",
            height: "0",
            border: "0",
            padding: "0",
            margin: "0",
            overflow: "hidden",
          }}
          name="phone"
        />
        <input type="hidden" name="redirect" value="https://spacejelly.dev/" />
        <input
          type="hidden"
          name="tags"
          value={`location:spacejelly.dev,location:spacejelly.dev-${location}`}
        />
        {!successMessage && (
          <>
            <Input
              id="subscribe-email"
              className={styles.formSubscribeInput}
              name="email"
              placeholder="Your email address"
              aria-label="Your email address"
              type="email"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              style={{ position: "relative" }}
            >
              <span style={{ visibility: isLoading ? "hidden" : "visible" }}>
                Subscribe
              </span>
              {isLoading && (
                <div
                  className={styles.spinner}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "16px",
                    height: "16px",
                    border: "2px solid transparent",
                    borderTop: "2px solid currentColor",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Button>
          </>
        )}
        {successMessage && (
          <p className={styles.formSuccessMessage}>{successMessage}</p>
        )}
        {errorMessage && (
          <p className={styles.formErrorMessage}>{errorMessage}</p>
        )}
      </fieldset>
    </form>
  );
};

export default FormSubscribe;
