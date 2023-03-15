import ClassName from 'models/classname';

import Heading from 'components/Heading';

import styles from './SidebarSectionHeader.module.scss';

const SidebarSectionHeader = ({ children, className }) => {
  const cn = new ClassName(styles.sidebarSectionHeader);

  cn.addIf(className, className);

  return (
    <Heading as="h3" className={cn.toString()}>
      {children}
    </Heading>
  );
};

export default SidebarSectionHeader;
