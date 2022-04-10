import ClassName from 'models/classname';

import styles from './Sidebar.module.scss';

const Sidebar = ({ children, className }) => {
  const sidebarClassName = new ClassName(styles.sidebar);

  sidebarClassName.addIf(className, className);

  return <aside className={sidebarClassName.toString()}>{children}</aside>;
};

export default Sidebar;
