import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, styled } from '@mui/material';
import Button, { type ButtonProps } from '@mui/material/Button';
import styles from '../userLogin/login.module.scss';
import commonStyles from '../../../App.module.scss';
import { object, string, ref, ValidationError } from 'yup';
import { apiRequest } from 'infrastructure/backendService';

const CustomTextField = styled(TextField)`
   & input {
      padding: 8px;
      height: 25px;
      border-radius: 5px;
      background: #fff9e4;
      border: 1px solid #fff9e4;
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

interface UserForm {
   username: string;
   secretQuestion: string;
   secretAnswer: string;
   verificationCode: string;
   newpassword: string;
   confirmpassword: string;
}

interface userNameErrorType {
   username: string;
}

interface secretFieldErrorsType {
   secretQuestion: string;
   secretAnswer: string;
}

interface validationFieldErrorsType {
   username: string;
   verificationCode: string;
}

interface newPasswordFieldErrorsType {
   newpassword: string;
   confirmpassword: string;
}

interface forgotPasswordProps {
   setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
   setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
   setShowError : React.Dispatch<React.SetStateAction<boolean>>;
   setErrMessage : React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ForgotPassword(props: forgotPasswordProps) {
   const [userForm, setUserForm] = useState<UserForm>({
      username: '',
      secretQuestion: '',
      secretAnswer: '',
      verificationCode: '',
      newpassword: '',
      confirmpassword: '',
   });

   const [errorMessage, setErrorMessage] = useState({
      username: '',
      secretQuestion: '',
      secretAnswer: '',
      verificationCode: '',
      newpassword: '',
      confirmpassword: '',
   });

   const [showSecretFields, setShowSecretFields] = useState<boolean>(false);
   const [showVerificationField, setShowVerificationField] = useState<boolean>(false);
   const [showNewpasswordField, setShowNewpasswordField] = useState<boolean>(false);

   const [userNameErrorMessage, setUserNameErrorMessage] = useState<userNameErrorType>({
      username: '',
   });

   const [secretFieldErrors, setSecretFieldsError] = useState<secretFieldErrorsType>({
      secretAnswer: '',
      secretQuestion: '',
   });

   const [validationFieldErrors, setValidationFieldErrors] = useState<validationFieldErrorsType>({
      username: '',
      verificationCode: '',
   });

   const [newPassswordFieldErrors, setNewPassswordFieldErrors] = useState<newPasswordFieldErrorsType>({
      newpassword: '',
      confirmpassword: '',
   });

   const validationSchemaForUserName = object().shape({
      username: string().required('username is required'),
   });

   const validationSchemaForSecretFields = object().shape({
      secretAnswer: string().required('secret Answer is required'),
      secretQuestion: string().required('secret Question is required'),
   });

   const validationSchemaForVerificationFields = object().shape({
      username: string().required('username is required'),
      verificationCode: string().required('verification Code is required'),
   });

   const newPasswordSchemaForCreatePasswordFields = object().shape({
      newpassword: string().required('New Password is required'),
      confirmpassword: string()
         .required('Confirm Password is required')
         .oneOf([ref('newpassword'), ''], 'New Password and Confirm Password must match'),
   });

   const handleFieldChange = (field: any, value: any): void => {
      setUserForm({
         ...userForm,
         [field]: value,
      });
   };

   const onClickNext = async (): Promise<void> => {
      const errors: userNameErrorType = {
         username: '',
      };

      try {
         // Validate the form data against the validation schema
         await validationSchemaForUserName.validate(userForm, { abortEarly: false });

         // If validation passes, you can submit the form
         setUserNameErrorMessage(errors);
         setShowSecretFields(true);
         setShowVerificationField(false);
         setShowNewpasswordField(false);

         // Call your API or perform other actions here
         verifyUsernameApiCall();

      } catch (error) {
         // Handle validation errors

         if (error instanceof ValidationError) {
            error.inner.forEach((e) => {
               if (e.path) {
                  errors[e.path as keyof userNameErrorType] = e.message;
               }
            });
         }
         setUserNameErrorMessage(errors);
      }
   };

   const verifyUsernameApiCall = () => {
      apiRequest({
         method: 'GET',
         endpoint: `/devotee-management/forgotPassword/${userForm.username}`,
      })
         .then((res) => {
            const userFromApi = res.data;
            console.log(userFromApi, "getttttttttttt");
            setUserForm({
               ...userForm,
               username: userFromApi.username
            })
            setUserForm({
               ...userForm,
               secretQuestion: userFromApi.hintQuestion
            })
            setShowSecretFields(true);
            setShowVerificationField(false);
            setShowNewpasswordField(false);
         })
         .catch((err) => {
            console.log(err);
            setShowSecretFields(false);
            setShowVerificationField(false);
            setShowNewpasswordField(false);
            props.setShowError(true);
            props.setShowLoginForm(false);
            props.setShowForgotPassword(false);
            props.setErrMessage(err.errorMessage);
         });
   };

   const secretFieldOnClick = async (): Promise<void> => {
      const errors: secretFieldErrorsType = {
         secretAnswer: '',
         secretQuestion: '',
      };

      try {

         // Validate the form data against the validation schema
         await validationSchemaForSecretFields.validate(userForm, { abortEarly: false });

         // If validation passes, you can submit the form
         setSecretFieldsError(errors);
         console.log("secret questions........")
         alert('Successful');

         //remove below lines when Api integrated
         setShowSecretFields(false);
         setShowVerificationField(false);
         setShowNewpasswordField(true);

         // Call your API or perform other actions here
          verifySecretFieldsApiCall();
      } catch (error) {
         // Handle validation errors

         if (error instanceof ValidationError) {
            error.inner.forEach((e) => {
               if (e.path) {
                  errors[e.path as keyof secretFieldErrorsType] = e.message;
               }
            });
         }
         setSecretFieldsError(errors);
      }
   };

   const verifySecretFieldsApiCall = () => {
      const reqBody = {
         hintQuestion: userForm.secretQuestion,
         hintAnswer: userForm.secretAnswer,
         username: userForm.username
      };
      apiRequest({
         method: 'POST',
         endpoint: '/devotee-management/forgotPassword/validateUserHintAnswer',
         body: JSON.stringify(reqBody),
      })
         .then((res) => {
            console.log(res);
            setShowSecretFields(false);
            setShowVerificationField(false);
            setShowNewpasswordField(true);
         })
         .catch((err) => {
            console.log(err);
            props.setShowError(true);
            props.setShowLoginForm(false);
            props.setShowForgotPassword(false);
            props.setErrMessage(err.errorMessage);
         });
   };

   const onClickValidateCode = async (): Promise<void> => {
      const errors: validationFieldErrorsType = {
         username: '',
         verificationCode: '',
      };

      try {
         // Validate the form data against the validation schema
         await validationSchemaForVerificationFields.validate(userForm, { abortEarly: false });
         // If validation passes, you can submit the form
         setValidationFieldErrors(errors);
         alert('Successful');
         setShowSecretFields(false);
         setShowVerificationField(false);
         setShowNewpasswordField(true);
         // Call your API or perform other actions here
         verificationCodeApiCall();
      } catch (error) {
         // Handle validation errors

         if (error instanceof ValidationError) {
            error.inner.forEach((e) => {
               if (e.path) {
                  errors[e.path as keyof validationFieldErrorsType] = e.message;
               }
            });
         }
         setValidationFieldErrors(errors);
      }
   };

   const verificationCodeApiCall = () => {
      const reqBody = {
         username: userForm.username,
         verificationCode: userForm.verificationCode,
         hintQuestion: userForm.secretQuestion,
         hintAnswer: userForm.secretAnswer,
      };

      apiRequest({
         method: 'POST',
         endpoint: '/devotee-management/forgotPassword/updateNewPasswordByQuestion',
         body: JSON.stringify(reqBody),
      })
         .then((res) => {
            console.log(res);
            setUserForm({
               username: '',
               secretQuestion: '',
               secretAnswer: '',
               verificationCode: '',
               newpassword: '',
               confirmpassword: '',
            })
            setShowSecretFields(false);
            setShowVerificationField(false);
            setShowNewpasswordField(true);
         })
         .catch((err) => {
            console.log(err);
            props.setShowError(true);
            props.setShowLoginForm(false);
            props.setShowForgotPassword(false);
            props.setErrMessage(err.errorMessage);
         });
   };

   const onClickSendVerificationMail = async (): Promise<void> => {
      const errors: validationFieldErrorsType = {
         username: '',
         verificationCode: '',
      };

      try {
         // Validate the form data against the validation schema
         await validationSchemaForVerificationFields.validate(userForm, { abortEarly: false });
         // If validation passes, you can submit the form
         setValidationFieldErrors(errors);
         alert('Successful');
         // Call your API or perform other actions here
          verificationCodeBYMailApiCall();
      } catch (error) {
         // Handle validation errors

         if (error instanceof ValidationError) {
            error.inner.forEach((e) => {
               if (e.path) {
                  errors[e.path as keyof validationFieldErrorsType] = e.message;
               }
            });
         }
         setValidationFieldErrors(errors);
      }
   };

   const verificationCodeBYMailApiCall = () => {
      const reqBody = {
         username: userForm.username,
         verificationCode: userForm.verificationCode,
      };

      apiRequest({
         method: 'POST',
         endpoint: `/devotee-management/forgotPassword/sendVerificationCodeToMail/${userForm.username}`,
         body: JSON.stringify(reqBody),
      })
         .then((res) => {
            console.log(res);
            setUserForm({
               username: '',
               secretQuestion: '',
               secretAnswer: '',
               verificationCode: '',
               newpassword: '',
               confirmpassword: '',
            })
         })
         .catch((err) => {
            console.log(err);
            props.setShowError(true);
            props.setShowLoginForm(false);
            props.setShowForgotPassword(false);
            props.setErrMessage(err.errorMessage);
         });
   };

   const onNewpasswordSubmit = async (): Promise<void> => {
      const errors: newPasswordFieldErrorsType = {
         newpassword: '',
         confirmpassword: '',
      };

      try {
         // Validate the form data against the validation schema
         await newPasswordSchemaForCreatePasswordFields.validate(userForm, { abortEarly: false });
         // If validation passes, you can submit the form
         setNewPassswordFieldErrors(errors);
         alert('Successful');
         // Call your API or perform other actions here
          newPasswordSubmitApiCall();
      } catch (error) {
         // Handle validation errors

         if (error instanceof ValidationError) {
            error.inner.forEach((e) => {
               if (e.path) {
                  errors[e.path as keyof newPasswordFieldErrorsType] = e.message;
               }
            });
         }
         setNewPassswordFieldErrors(errors);
      }
   };

   const newPasswordSubmitApiCall = () => {
      const reqBody = {
         hintQuestion: userForm.secretQuestion,
         hintAnswer: userForm.secretAnswer,
         username: userForm.username,
         newPassword: userForm.newpassword,
         confirmNewPassword: userForm.confirmpassword,
         // verificationCode: userForm.verificationCode,
      };

      apiRequest({
         method: 'POST',
         endpoint: '/devotee-management/forgotPassword/updateNewPasswordByQuestion',
         body: JSON.stringify(reqBody),
      })
         .then((res) => {
            console.log(res, "password created successfully");
            setUserForm({
               username: '',
               secretQuestion: '',
               secretAnswer: '',
               verificationCode: '',
               newpassword: '',
               confirmpassword: '',
            })
         })
         .catch((err) => {
            console.log(err);
            props.setShowError(true);
            props.setShowLoginForm(false);
            props.setShowForgotPassword(false);
            props.setErrMessage(err.errorMessage);
         });
   };

   const onClickCancel = (): void => {
      props.setShowLoginForm(true);
      props.setShowForgotPassword(false);
   }

   const userNameField = (): React.ReactElement => {
      return (
         <Box sx={{ marginTop: '20px' }}>
            <Grid xs={12} item>
               <label className={styles.profileLabels}>User Name</label>
               <CustomTextField
                  error={!errorMessage.username}
                  className={commonStyles.textField}
                  fullWidth={true}
                  helperText={errorMessage.username}
                  value={userForm.username}
                  onChange={(e) => {
                     setUserNameErrorMessage({ ...userNameErrorMessage, username: '' });
                     handleFieldChange('username', e.target.value);
                  }}
               />
               {userNameErrorMessage.username && (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {userNameErrorMessage.username}
                  </Typography>
               )}
            </Grid>
            <Grid xs={12} item sx={{ marginTop: '20px' }}>
               <Button color="warning" fullWidth={true} variant="contained" onClick={onClickNext}>
                  Next
               </Button>
               <Button
                  color="warning"
                  fullWidth={true}
                  variant="outlined"
                  sx={{ marginTop: '20px' }}
                  onClick={onClickCancel}
               >
                  Cancel
               </Button>
            </Grid>
         </Box>
      );
   };

   const secretFields = (): React.ReactElement => {
      return (
         <Box sx={{ marginTop: '20px' }}>
            <Grid xs={12} item>
               <label className={styles.profileLabels}>Secret Question</label>
               <CustomTextField
                  aria-readonly
                  className={commonStyles.textField}
                  fullWidth={true}
                  helperText={errorMessage.secretQuestion}
                  value={userForm.secretQuestion}
                  onChange={(e) => {
                     setSecretFieldsError({ ...secretFieldErrors, secretQuestion: '' });
                     handleFieldChange('secretQuestion', e.target.value);
                  }}
               />
               {secretFieldErrors.secretQuestion && (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {secretFieldErrors.secretQuestion}
                  </Typography>
               )}
            </Grid>
            <Grid xs={12} item sx={{ marginTop: '20px' }}>
               <label className={styles.profileLabels}>Answer to Secret</label>
               <CustomTextField
                  className={commonStyles.textField}
                  fullWidth={true}
                  helperText={errorMessage.secretAnswer}
                  value={userForm.secretAnswer}
                  onChange={(e) => {
                     setSecretFieldsError({ ...secretFieldErrors, secretAnswer: '' });
                     handleFieldChange('secretAnswer', e.target.value);
                  }}
                  type="password"
               />
               {secretFieldErrors.secretAnswer && (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {secretFieldErrors.secretAnswer}
                  </Typography>
               )}
            </Grid>
            <Grid xs={12} item sx={{ marginTop: '20px' }}>
               <Button
                  color="warning"
                  fullWidth={true}
                  variant="contained"
                  onClick={secretFieldOnClick}
               >
                  Submit
               </Button>
               <Box sx={{ marginTop: '10px', marginBottom: '10px' }}>
                  <Typography>
                     Or you can request an identity verification code via your e-mail (that is valid
                     for 3 hours) to reset password by clicking the following button.
                  </Typography>
               </Box>
               <Button color="warning" fullWidth={true} variant="outlined" onClick={onClickSendVerificationMail}>
                  Send Verification Email
               </Button>
            </Grid>
         </Box>
      );
   };

   const verificationFieldCancel = (): void => {
      setShowSecretFields(true);
      setShowVerificationField(false);
   }

   const verificationField = (): React.ReactElement => {
      return (
         <Box sx={{ marginTop: '20px' }}>
            <Grid xs={12} item>
               <label className={styles.profileLabels}>User Name</label>
               <CustomTextField
                  className={commonStyles.textField}
                  fullWidth={true}
                  helperText={errorMessage.username}
                  value={userForm.username}
                  onChange={(e) => {
                     setValidationFieldErrors({ ...validationFieldErrors, username: '' });
                     handleFieldChange('username', e.target.value);
                  }}
               />
               {validationFieldErrors.username && (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {validationFieldErrors.username}
                  </Typography>
               )}
            </Grid>
            <Grid xs={12} item sx={{ marginTop: '20px' }}>
               <label className={styles.profileLabels}>Verification Code</label>
               <CustomTextField
                  className={commonStyles.textField}
                  fullWidth={true}
                  helperText={errorMessage.verificationCode}
                  value={userForm.verificationCode}
                  onChange={(e) => {
                     setValidationFieldErrors({ ...validationFieldErrors, verificationCode: '' });
                     handleFieldChange('verificationCode', e.target.value);
                  }}
               />
               {validationFieldErrors.verificationCode && (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {validationFieldErrors.verificationCode}
                  </Typography>
               )}
            </Grid>
            <Grid xs={12} item sx={{ marginTop: '20px' }}>
               <Button
                  color="warning"
                  fullWidth={true}
                  variant="contained"
                  onClick={onClickValidateCode}
               >
                  Submit
               </Button>
               <Button
                  color="warning"
                  fullWidth={true}
                  variant="outlined"
                  sx={{ marginTop: '20px' }}
                  onClick={verificationFieldCancel}
               >
                  Cancel
               </Button>
            </Grid>
         </Box>
      );
   };

   const newPasswordField = (): React.ReactElement => {
      return (
         <Box sx={{ marginTop: '20px' }}>
            <Grid xs={12} item>
               <label className={styles.profileLabels}>New Password</label>
               <CustomTextField
                  className={commonStyles.textField}
                  fullWidth={true}
                  helperText={errorMessage.newpassword}
                  value={userForm.newpassword}
                  onChange={(e) => {
                     setNewPassswordFieldErrors({ ...newPassswordFieldErrors, newpassword: '' });
                     handleFieldChange('newpassword', e.target.value);
                  }}
               />
               {newPassswordFieldErrors.newpassword && (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {newPassswordFieldErrors.newpassword}
                  </Typography>
               )}
            </Grid>
            <Grid xs={12} item sx={{ marginTop: '20px' }}>
               <label className={styles.profileLabels}>Confirm New Password</label>
               <CustomTextField
                  className={commonStyles.textField}
                  fullWidth={true}
                  helperText={errorMessage.confirmpassword}
                  value={userForm.confirmpassword}
                  onChange={(e) => {
                     setNewPassswordFieldErrors({ ...newPassswordFieldErrors, confirmpassword: '' });
                     handleFieldChange('confirmpassword', e.target.value);
                  }}
               />
               {newPassswordFieldErrors.confirmpassword && (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {newPassswordFieldErrors.confirmpassword}
                  </Typography>
               )}
            </Grid>
            <Grid xs={12} item sx={{ marginTop: '20px' }}>
               <Button
                  color="warning"
                  fullWidth={true}
                  variant="contained"
                  onClick={onNewpasswordSubmit}
               >
                  Submit
               </Button>
               <Button
                  color="warning"
                  fullWidth={true}
                  variant="outlined"
                  sx={{ marginTop: '20px' }}
               // onClick={verificationFieldCancel}
               >
                  Cancel
               </Button>
            </Grid>
         </Box>
      );
   };

   const userFields = (): React.ReactElement => {
      return (
         <>
            <Box sx={{ marginTop: '10px' }}>
               <Typography align="left" sx={{ fontSize: '24px' }}>
                  Forgot Password
               </Typography>
            </Box>
            {!showSecretFields && !showVerificationField && !showNewpasswordField ? userNameField() : ''}
            {showSecretFields && !showVerificationField ? secretFields() : ''}
            {showVerificationField && !showSecretFields ? verificationField() : ''}
            {showNewpasswordField ? newPasswordField() : ''}
         </>
      );
   };

   return <div>{userFields()}</div>;
}
