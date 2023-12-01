import React, { useState } from 'react';
import Dialog, { type DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoginBanner from 'assets/loginImage.svg';
import LoginBottomBanner from 'assets/loginBottomBanner.png';
import Banner from '../../../../public/images/LoginTempleBanner.svg';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
   CommonButton,
   CommonOutlinedButton,
} from 'components/common/StyledComponents/StyledFields';
import styles from '../../common/user/userDetails/userDetails.module.scss';
import commonStyles from '../../../App.module.scss';
import Checkbox from '@mui/material/Checkbox';
import { Box, Link, Paper, styled } from '@mui/material';
import Button from '@mui/material/Button';
import { makeLoginCall } from './login.control';
import { useNavigate } from 'react-router';
import ForgotPassword from '../forgotPassword/forgotPassword';
import LoginError from '../loginError/loginError';
import { apiRequest } from 'infrastructure/backendService';
// import loginScreen from './login.module.scss';

export const loginScreen = {
   bannerStyle: {
      backgroundImage: `url(${Banner})`,
      height: '100%',
      width: '100%',
      borderRadius: '20px',
      color: `#ffffff`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
   },
   bottomBanner: {
      backgroundImage: `url(${LoginBottomBanner})`,
      width: '100%',
      color: `#F05802`,
      position: 'absolute',
      backgroundSize: 'cover',
   },
   contentPadding: {
      padding: '40px',
   },
   formPadding: {
      padding: '0 80px 0 0',
      boxSize: 'border-box',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column'
   },
   buttonSize: {
      height: '38px',
      width: '100%',
      marginTop: '15px',
   },
   userForm: {
      height:'100%'
   },
   userFormContent: {

   }
};

const CustomTextField = styled(TextField)`
   & input {
      padding: 8px;
      height: 25px;
      border-radius: 5px;
      background: #fff9e4;
      border: 1px solid #fff9e4;
      height: 29px;
      :hover {
         border-radius: 8px;
         border: 1px solid var(--Primary-Color, #f05802);
         background: #fff9e4;
      }
   }
   & fieldset {
      border-style: unset;
   }
`;

interface LoginForm {
   username: string;
   password: string;
   rememberMe: boolean;
}

export default function Login(): React.ReactNode {
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [errorMessage, setErrorMessage] = useState({
      username: '',
      password: '',
   });
   const userName = sessionStorage.getItem('user-name');

   const [loginForm, setLoginForm] = useState<LoginForm>({
      username: '',
      password: '',
      rememberMe: false,
   });
   const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
   const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
   const [showError, setShowError] = useState<boolean>(false);
   const [errMessage, setErrMessage] = useState<string | null>(null);

   const handleSubmit = (e: any): void => {
      e.preventDefault();
      let usernameError = '';
      let passwordError = '';

      if (!loginForm.username) {
         usernameError = 'Username is required';
      }
      if (!loginForm.password) {
         passwordError = 'Password is required';
      }

      setErrorMessage({
         username: usernameError,
         password: passwordError,
      });

      if (!usernameError && !passwordError) {
         const userLoginDetails = {
            username : loginForm.username,
            password : loginForm.password
        }
         // await makeLoginCall({ userName: loginForm.username, password: loginForm.password })
         apiRequest({
            method: 'POST',
            endpoint: '/auth/generateToken',
            body: JSON.stringify(userLoginDetails),
         })
            .then((res: any) => {
               console.log("enterrrrrrrrrrrr", res)
               formReset();
               sessionStorage.clear();
               // handleClose();
               sessionStorage.setItem('username', loginForm.username);
               sessionStorage.setItem('user-token', res.data.token);
               sessionStorage.setItem('user-roles', res.data.roles);
               navigate('/donations');
            })
            .catch((err: any) => {
               console.log(err);
               setShowError(true);
               setShowLoginForm(false);
               setErrMessage(err.errorMessage);
            });
      }
   };

   const goToRegister = (): void => {
      setOpen(false);
      navigate('/register');
   };

   const handleClickOpen = (): void => {
      setOpen(true);
   };

   const handleClose = (): void => {
      setOpen(false);
   };

   const handleFieldChange = (field: any, value: any): void => {
      setLoginForm({
         ...loginForm,
         [field]: value,
      });
   };

   const formReset = (): void => {
      setLoginForm({
         username: '',
         password: '',
         rememberMe: false,
      });
   };

   const handleForgotPassword = (): void => {
      setShowForgotPassword(true);
      setShowLoginForm(false);
   };

   const loginFormComponent = (): React.ReactElement => {
      return (
         <>
            <Box>
               <Typography variant="h4" component="h4" align="left">
                  Login
               </Typography>
               <Typography sx={{ marginBottom: '30px' }}>
                  Enter your credentials to access your account
               </Typography>
               <Grid xs={12} item>
                  <label className={styles.profileLabels}>
                     {userName != null ? userName : 'User Name'}
                  </label>
                  <CustomTextField
                     error={!!errorMessage.username}
                     className={commonStyles.textField}
                     fullWidth={true}
                     helperText={errorMessage.username}
                     value={loginForm.username}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, username: '' });
                        handleFieldChange('username', e.target.value);
                     }}
                  />
                  <Box sx={{ textAlign: 'right' }}>
                     <Link
                        href="#"
                        variant="body2"
                        sx={{ color: '#F05802', textDecoration: 'none' }}
                     >
                        Forgot Username?
                     </Link>
                  </Box>
               </Grid>
               <Grid xs={12} item>
                  <label className={styles.profileLabels}>Password</label>
                  <CustomTextField
                     error={!!errorMessage.password}
                     className={commonStyles.textField}
                     fullWidth={true}
                     required={true}
                     helperText={errorMessage.password}
                     value={loginForm.password}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, password: '' });
                        handleFieldChange('password', e.target.value);
                     }}
                     type="password"
                  />
               </Grid>
               <Grid xs={12} item>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                     <FormControlLabel
                        control={<Checkbox value={loginForm.rememberMe} color="warning" />}
                        label="Remember me"
                     />
                     <Typography
                        variant="body2"
                        sx={{ color: '#F05802', textDecoration: 'none' }}
                        onClick={handleForgotPassword}
                     >
                        Forgot Password?
                     </Typography>
                  </Box>
               </Grid>
               <Grid xs={12} item>
                  <CommonButton
                     type="submit"
                     fullWidth={true}
                     variant="contained"
                     style={loginScreen.buttonSize}
                     onClick={handleSubmit}
                  >
                     {' '}
                     Login
                  </CommonButton>
                  <CommonOutlinedButton
                     fullWidth={true}
                     variant="outlined"
                     onClick={goToRegister}
                     style={loginScreen.buttonSize}
                  >
                     {' '}
                     Register
                  </CommonOutlinedButton>
               </Grid>
            </Box>
         </>
      );
   };

   return (
      <div>
         <Button
            style={{
               backgroundColor: '#FFF9E4',
               color: '#882E14',
               borderRadius: '4px',
               fontWeight: '600',
            }}
            variant="contained"
            onClick={handleClickOpen}
         >
            Login
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="xl"
            PaperProps={{
               style: {
                  height: 'calc(100% - 64px)',
                  width: 'calc(100% - 64px)',
                  margin: '32px',
                  maxWidth: '1148px',
                  maxHeight: "644px"
               },
            }}
         >
            <DialogContent style={loginScreen.contentPadding}>
               <Grid container style={ loginScreen.userForm}>
                  <Grid item xs={6}  component="form" noValidate sx={loginScreen.formPadding}>
        
                     {showLoginForm ? loginFormComponent() : ''}
                     {showForgotPassword ? (
                        <ForgotPassword
                           setShowLoginForm={setShowLoginForm}
                           setShowForgotPassword={setShowForgotPassword}
                           setShowError={setShowError}
                           setErrMessage={setErrMessage}
                        />
                     ) : (
                        ''
                     )}
                     {showError ? <LoginError setShowLoginForm={setShowLoginForm} errorMessage={errMessage} setShowError={setShowError}/> : ""}
                  </Grid>
                  <LoginRightBanner />
               </Grid>
            </DialogContent>
         </Dialog>
      </div>
   );
}

export const LoginRightBanner = () => {
   return (
      <Grid item xs={6}>
         <Box style={loginScreen.bannerStyle} position="relative">
            <Typography
               color="white"
               align="center"
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '300px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontSize: '18px',
                  paddingTop: '20px',
               }}
            >
               {'Welcome to'} <br /> {'HCCC'} <br /> {'Shiva-Vishnu Temple , Levermore'}
            </Typography>
            <Paper
               elevation={3}
               position="absolute"
               style={loginScreen.bottomBanner}
               sx={{ display: 'flex', justifyContent: 'end', bottom: '10px' }}
            >
               <Typography
                  variant="h6"
                  component="h6"
                  color="warning"
                  align="center"
                  sx={{
                     width: '200px',
                     color: 'var(--Secondary-color, #F2BE22)',
                     textAlign: 'center',
                     fontFamily: 'Niconne',
                     fontSize: '24px',
                     fontStyle: 'normal',
                     fontWeight: '400',
                     lineHeight: '114.5%',
                  }}
               >
                  {'Simple , Dr S P Blasubramanyam'}
               </Typography>
               <Button
                  className={commonStyles.saveButton}
                  sx={{ margin: '10px', backgroundColor: '#F05802' }}
                  variant="contained"
               >
                  Donate
               </Button>
            </Paper>
         </Box>
      </Grid>
   );
};
