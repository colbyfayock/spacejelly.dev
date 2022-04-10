import ClassName from 'models/classname';

import styles from './SidebarSectionBody.module.scss';

const SidebarSectionBody = ({ children, className }) => {
  const cn = new ClassName(styles.sidebarSectionBody);

  cn.addIf(className, className);

  return <div className={cn.toString()}>{children}</div>;
};

export default SidebarSectionBody;
