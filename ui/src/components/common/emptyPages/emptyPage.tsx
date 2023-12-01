import type React from 'react';
import styles from './emptyPages.module.scss';
import { isEmpty, isNil } from 'lodash';

interface emptyPageProps {
   imgUrl: string;
   typographyText?: string;
   subComponent?: React.ReactElement;
}

export default function EmptyPage(props: emptyPageProps): React.ReactNode {
   const getSubComponent = (): React.ReactElement => {
      if (isNil(props.subComponent)) {
         return <></>;
      } else {
         return props.subComponent;
      }
   };

   const getTypography = (): React.ReactElement => {
      if (isNil(props.typographyText) || isEmpty(props.typographyText)) {
         return <></>;
      } else {
         return <p className={styles.typography}>{props.typographyText}</p>;
      }
   };

   const getImageUrl = (): string => {
      if (isNil(props.imgUrl) || isEmpty(props.imgUrl)) {
         return '';
      } else {
         return props.imgUrl;
      }
   };

   return (
      <div className={styles.imageContainer}>
         <img src={getImageUrl()} className={styles.image} />
         {getTypography() } 
         {getSubComponent()}
      </div>
   );
}
