import { Grid, Typography } from '@mui/material';
import EmptyPage from 'components/common/emptyPages/emptyPage';
import React from 'react';
import styles from './loginError.module.scss';
import { isEmpty, isNil } from 'lodash';
import {
   CommonButton,
   CommonOutlinedButton,
} from 'components/common/StyledComponents/StyledFields';

interface loginErrorProps {
   errorMessage?: string | null;
   setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
   setShowError : React.Dispatch<React.SetStateAction<boolean>>;
}
const LoginError = (props: loginErrorProps) => {
   const getErrorMessage = (): string => {
      if (isNil(props.errorMessage) || isEmpty(props.errorMessage)) {
         return 'Something went wrong,Please try again';
      } else {
         return props.errorMessage;
      }
   };

   const textContainer = (): React.ReactElement => {
      return (
         <>
            <Typography component={'h4'} className={styles.oopsText}>
               Oops!
            </Typography>
            <Typography component={'p'} className={styles.errText}>
               {getErrorMessage()}
            </Typography>
         </>
      );
   };


   const onClickButton = () => {
    props.setShowError(false);
    props.setShowLoginForm(true);
   }


   return (
      <div>
         <Typography component={'h1'} className={styles.heading}>Login</Typography>
         <EmptyPage imgUrl="/svg/loginError.svg" subComponent={textContainer()} />
         <div style={{display:"flex",flexDirection:"column"}}>
            <CommonButton
               type="submit"
               fullWidth={true}
               variant="contained"
                onClick={onClickButton}
            >
               {' '}
               Retry
            </CommonButton>
            <CommonOutlinedButton
               fullWidth={true}
               variant="outlined"
                onClick={onClickButton}
               sx={{
                marginTop:"10px"
               }}
            >
               {' '}
               Cancel
            </CommonOutlinedButton>
         </div>
      </div>
   );
};

export default LoginError;
