import React, { ChangeEvent, useState } from 'react';
import styles from './footer.module.scss';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { apiRequest } from 'infrastructure/backendService';
import { isEmpty } from 'lodash';
import { Box } from '@mui/material';

const CustomInputField = styled(TextField)({
   '& input': {
      margin: '5px',
      height: '49px',
      color: '#882E14',
      fontWeight: '500',
      width: '100%',
   },
   '& .MuiInputBase-root': {
      height: '49px',
      width: '100%',
   },
   '& label.Mui-focused': {
      color: '#882E14',
   },
   '& .MuiInput-underline:after': {
      borderBottomColor: '#882E14',
      borderRadius: '20px',
      borderWidth: '2px',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderRadius: '16px',
         height: '49px',
         border: '2px solid #882E14',
         padding: 0,
         width: '100%',
      },
      '&:hover fieldset': {
         borderRadius: '16px',
         height: '49px',
         border: '2px solid #882E14',
      },
      '&.Mui-focused fieldset': {
         borderRadius: '16px',
         height: '49px',
         border: '2px solid #882E14',
      },
   },
});

export default function Footer() {
   const [email, setEmail] = useState<string>('');
   const [subscribedresText, setsubscribedresText] = useState<string>('');

   const readMore = () => {
      return <span className={styles.readMore}>Read more...</span>;
   };

   const templeInfo = (): React.ReactElement => {
      return (
         <div className={styles.imageTempleInfoContainer}>
            <div style={{ width: '403px' }}>
               <img src="/images/footerTemple.svg" className={styles.imageContainer} />
               <div className={styles.templeInfo}>
                  Hindu Community and Cultural Center was incorporated in 1977. The need for a place
                  where Hindus can pray, study religion and have cultural programs was seen as
                  necessary and it was in this mood the birth of this organization took place{' '}
                  {readMore()}
               </div>
            </div>
            <div>
               <div className={styles.templeAddress}>
                  <h3 className={styles.headers}>Hindu Community and Cultural Center,</h3>
                  <h4 className={styles.headers}>Shiva-Vishnu Temple,Livermore, California</h4>
                  <h5 className={styles.headers}>Phone: (925) 449 6255</h5>
               </div>
            </div>
         </div>
      );
   };

   const appStoreContent = (icon: React.ReactNode): React.ReactElement => {
      return <div className={styles.innerButton}>{icon}</div>;
   };

   const onClickRedirect = (path: string) => {
      window.open(path, '_blank');
   };

   const storesButtons = (): React.ReactElement => {
      return (
         <div className={styles.storeButtons}>
            <button
               className={styles.StorebuttonApple}
               onClick={() =>
                  onClickRedirect(
                     'https://itunes.apple.com/us/app/livermore-temple/id1186574740?mt=8',
                  )
               }
            >
               {appStoreContent(
                  <img src="/images/App_store_logo.svg" className={styles.buttonIcon} />,
               )}
            </button>
            <button
               className={styles.StorebuttonGoogle}
               onClick={() =>
                  onClickRedirect(
                     'https://play.google.com/store/apps/details?id=com.livermore.devotee',
                  )
               }
            >
               {appStoreContent(<img src="/images/Googleplay.svg" />)}
            </button>
         </div>
      );
   };



   const socialMediaIcons = (): React.ReactElement => {
      return (
         <div className={styles.socialMediaIconsContainer}>
            <div
               className={styles.mediaIcon}
               onClick={() => onClickRedirect('https://www.facebook.com/Livermoretemple')}
            >
               <img src="/images/FaceBook.svg" className={styles.facebookIcon} />
            </div>
            <div
               className={styles.mediaIcon}
               onClick={() =>
                  onClickRedirect(
                     'https://twitter.com/i/flow/login?redirect_after_login=%2Flivermoretemple',
                  )
               }
            >
               <img src="/images/Twitter.svg" className={styles.twitterIcon} />
            </div>
            <div
               className={styles.mediaIcon}
               onClick={() => onClickRedirect('https://www.instagram.com/livermoretemple')}
            >
               <img src="/images/InstaGram.svg" className={styles.instagramIcon} />
            </div>
            <div
               className={styles.mediaIcon}
               onClick={() => onClickRedirect('https://www.youtube.com/c/LivermoreTempletv')}
            >
               <img src="/images/Youtube.svg" className={styles.youtubeIcon} />
            </div>
         </div>
      );
   };

   const leftContainer = (): React.ReactElement => {
      return (
         <div className={styles.leftSideContainer}>
            {templeInfo()}
            {socialMediaIcons()}
         </div>
      );
   };

   const validateSubscribeText = (): boolean => {
      if (isEmpty(email)) {
         return true;
      } else {
         return false;
      }
   };

   const subscribeOnclick = (): void => {
      const currentDate = new Date().toISOString();

      if (validateSubscribeText()) {
         setsubscribedresText('Please Provide valid Email');
      } else {
         apiRequest({
            method: 'POST',
            endpoint: '/devotee-management/mailingLists',
            params: {
               email: email,
            },
         })
            .then((res) => {
               console.log(res, 'res subs');
            })
            .catch((err) => {
               console.log(err, 'err');
            });
      }
   };

   const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
      setEmail(e.target.value);
   };

   const stayConnected = () => {
      return (
         <div>
            <Typography className={styles.stayConnected}>Stay Connected</Typography>
            <div className={styles.inputFieldContainer}>
               <Box sx={{ position: 'relative' }}>
                  <CustomInputField
                     placeholder="Enter mail"
                     id="custom-css-outlined-input"
                     type="text"
                     value={email}
                     onChange={onChangeEmail}
                  />
                  <Button className={styles.button} onClick={subscribeOnclick}>
                     Subscribe
                  </Button>
               </Box>
            </div>
            {isEmpty(subscribedresText) ? (
               ''
            ) : (
               <div style={{ color: 'red', fontSize: '12px' }}>{subscribedresText}</div>
            )}
         </div>
      );
   };

   const rightContainer = () => {
      return (
         <div className={styles.rightContainer}>
            {stayConnected()}
            <div className={styles.emailContainer}>
               <div>Email: info@livermoretemple.org</div>
               <div>www.livermoretemple.org</div>
            </div>
            <p className={styles.templecopyRight}>© 2023 Hindu Community and Cultural Center </p>
            <div className={styles.siteMap}>Site Map</div>
            {storesButtons()}
         </div>
      );
   };

   return (
      <footer className={styles.footerContainer}>
         {leftContainer()}
         {rightContainer()}
      </footer>
   );
}
