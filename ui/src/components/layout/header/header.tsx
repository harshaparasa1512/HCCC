
import Muhurtham from 'components/common/muhurtham/muhurtham';
import MenuBar from './menuBar/menuBar';
import React from 'react';
import styles from './header.module.scss';

export default function Header(): React.ReactNode {


  return (
    <>
      <div className={styles.paperContainer}>
        <img className={styles.headerBanner} src="/images/Banner.svg" />
      </div>
      <div className={styles.menuAndMuhurtham}>
        <MenuBar/>
        <Muhurtham />
      </div>
    </>
  );
}