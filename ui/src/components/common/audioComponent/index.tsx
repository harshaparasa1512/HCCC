import { useState } from 'react';
import Waveform from './waveform';
import styles from './index.module.scss';
import Checkbox from '@mui/material/Checkbox';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';

const DialogBox = styled(Dialog)(({ theme }) => ({
   '& .MuiDialogContent-root': {
      padding: theme.spacing(1),
   },
   '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
   },
}));

export default function BirthdayAudio(): JSX.Element {
   const [open, setOpen] = useState<boolean>(true);
   const [maxWidth] = useState<DialogProps['maxWidth']>('md');

   const tracks = {
      url: 'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
   };

   const handleClose = (): void => {
      setOpen(false);
   };

   const dialogContent = (): React.ReactElement => {
      return (
         <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
               <img
                  style={{ height: '100px', width: '150px' }}
                  src="./images/templeFrontView.jpg"
                  alt="no image found"
               />
            </div>
            <div className={styles.subContainer}>
               <div className={styles.textContainer}>
                  <div>Happy Birthday</div>
                  <div>( Hindi/Telugu/English Etc..)</div>
               </div>
               <Waveform url={tracks.url} />
               <div className={styles.checkboxAndText}>
                  <Checkbox defaultChecked className={styles.checkBox} />
                  <p className={styles.text}>Thank You Don’t show me again</p>
               </div>
            </div>
         </div>
      );
   };

   const dialogBox = (): React.ReactElement => {
      return (
         <>
            <DialogBox
               onClose={handleClose}
               aria-labelledby="customized-dialog-title"
               open={open}
               maxWidth={maxWidth}
            >
               <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title"></DialogTitle>
               <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                     position: 'absolute',
                     right: 8,
                     top: -4,
                  }}
               >
                  <CancelIcon />
               </IconButton>
               <DialogContent dividers>{dialogContent()}</DialogContent>
            </DialogBox>
         </>
      );
   };

   return <>{dialogBox()}</>;
}
