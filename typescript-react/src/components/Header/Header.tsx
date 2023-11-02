import React from 'react';

import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <img src="/assets/logo-aviv.svg" alt="logo Aviv" />
    </header>
  );
};

export default Header;
