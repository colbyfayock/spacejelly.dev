import ClassName from 'models/classname';

import styles from './SidebarSectionHeader.module.scss';

const SidebarSectionHeader = ({ children, className }) => {
  const cn = new ClassName(styles.sidebarSectionHeader);

  cn.addIf(className, className);

  return <h3 className={cn.toString()}>{children}</h3>;
};

export default SidebarSectionHeader;
