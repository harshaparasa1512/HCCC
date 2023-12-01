
import type React from 'react';
import Footer from './footer/footer';
import styles from './layout.module.scss';
import Header from './header/header';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface contentProps {
    children?: React.ReactNode;
  }
  export default function Layout (props : contentProps) {
    return(
        <>
        <div>
            <Header/>
            <main className={styles.mainContainer}>
                {/* <LeftMainNavigation /> */}
                {props.children}</main>
            <Footer/>
        </div>
        </>
    )
}
