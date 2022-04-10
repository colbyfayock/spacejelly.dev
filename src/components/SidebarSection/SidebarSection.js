import ClassName from 'models/classname';

import styles from './SidebarSection.module.scss';

const SidebarSection = ({ children, className }) => {
  const cn = new ClassName(styles.sidebarSection);

  cn.addIf(className, className);

  return <div className={cn.toString()}>{children}</div>;
};

export default SidebarSection;
