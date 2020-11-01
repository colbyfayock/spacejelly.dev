import ClassName from 'models/classname';

import styles from './Section.module.scss';

const Section = ({ children, className, backgroundColor, ...rest }) => {
  const sectionClassName = new ClassName(styles.section);

  sectionClassName.addIf(className, className);

  return (
    <section className={sectionClassName.toString()} data-background-color={backgroundColor} {...rest}>
      { children }
    </section>
  )
}

export default Section;