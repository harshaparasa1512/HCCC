import { Box, Grid, Typography } from '@mui/material';
import {
   CommonButton,
   CustomInputLabel,
   CustomTextFeild,
} from 'components/common/StyledComponents/StyledFields';
import React, { useState } from 'react';
import styles from './PersonalInfo.module.scss';
import { object, string, ref, ValidationError, number } from 'yup';

interface ErrorMessageTypes {
   firstName: string;
   lastName: string;
   email: string;
   workPhone: string;
   signInName: string;
   homePhone: string;
}

const PersonalInfo = (): JSX.Element => {
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      workPhone: '',
      signInName: '',
      homePhone: '',
   });
   const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
      firstName: '',
      lastName: '',
      email: '',
      workPhone: "",
      homePhone: "",
      signInName: '',
   });
   const validationSchema = object().shape({
      firstName: string().required('First Name is required'),
      lastName: string().required('Last Name is required'),
      email :string().required('Email is required'),
      workPhone: string().required(' Work Phone Number is required'),
      homePhone: string().required('Home Phone Number is required'),
      signInName: string().required('Sign In  Name is required'),
      
   });
   const handleSave = async (): Promise<void> => {
      const errors: ErrorMessageTypes = {
         firstName: '',
         lastName: '',
         email: '',
         workPhone: "",
         homePhone:"",
         signInName: '',
      };

      try {
         // Validate the form data against the validation schema
         await validationSchema.validate(formData, { abortEarly: false });
         // If validation passes, you can submit the form
         setErrorMessage(errors);
         alert('Registration Successful');

         // Call your API or perform other actions here
         //  saveApiCall();
      } catch (error) {
         // Handle validation errors

         if (error instanceof ValidationError) {
            error.inner.forEach((e) => {
               if (e.path) {
                  errors[e.path as keyof ErrorMessageTypes] = e.message;
               }
            });
         }
         setErrorMessage(errors);
      }
   };

   const handleFieldChange = (field: any, value: any) => {
      setFormData({
         ...formData,
         [field]: value,
      });
   };

   return (
      <Box className={styles.totalLayout}>
         <Typography className={styles.MainHeading}>Devotee Quick Register</Typography>
         <Typography className={styles.SubHeading}>Personal Info</Typography>
         <Grid className={styles.formLayout}>
            <Grid container spacing={2} sx={{ marginBottom: '16px', width: '858px' }}>
               <Grid xs={12} sm={6} item>
                  <CustomInputLabel>First Name</CustomInputLabel>
                  <CustomTextFeild
                    fullWidth
                     required
                     value={formData.firstName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, firstName: '' });
                        handleFieldChange('firstName', e.target.value);
                     }}
                     className={errorMessage.firstName ? styles.errorTextFeild : ""}
                  />
                  {errorMessage.firstName && <Typography sx={{color:"red", fontSize:"12px"}}>{errorMessage.firstName}</Typography>}
               </Grid>
               <Grid xs={12} sm={6} item>
                  <CustomInputLabel>Last Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.lastName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, lastName: '' });
                        handleFieldChange('lastName', e.target.value);
                     }}
                     className={errorMessage.lastName ? styles.errorTextFeild : ""}
                  />
                  {errorMessage.lastName && <Typography sx={{color:"red", fontSize:"12px"}}>{errorMessage.lastName}</Typography>}
               </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '16px', width: '858px' }}>
               <Grid xs={12} sm={6} item>
                  <CustomInputLabel>Email</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.email}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, email: '' });
                        handleFieldChange('email', e.target.value);
                     }}
                     className={errorMessage.email ? styles.errorTextFeild : ""}
                  />
                  {errorMessage.email && <Typography sx={{color:"red", fontSize:"12px"}}>{errorMessage.email}</Typography>}
               </Grid>
               <Grid xs={12} sm={6} item>
                  <CustomInputLabel>Work Phone</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.workPhone}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, workPhone: '' });
                        handleFieldChange('workPhone', e.target.value);
                     }}
                     className={errorMessage.workPhone ? styles.errorTextFeild : ""}
                  />
                  {errorMessage.workPhone && <Typography sx={{color:"red", fontSize:"12px"}}>{errorMessage.workPhone}</Typography>}
               </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '16px', width: '858px' }}>
               <Grid xs={12} sm={6} item>
                  <CustomInputLabel>Home Phone</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.homePhone}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, homePhone: '' });
                        handleFieldChange('homePhone', e.target.value);
                     }}
                     className={errorMessage.homePhone? styles.errorTextFeild : ""}
                  />
                  {errorMessage.homePhone && <Typography sx={{color:"red", fontSize:"12px"}}>{errorMessage.homePhone}</Typography>}
               </Grid>
               <Grid xs={12} sm={6} item>
                  <CustomInputLabel>Sign-In Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.signInName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, signInName: '' });
                        handleFieldChange('signInName', e.target.value);
                     }}
                     className={errorMessage.signInName ? styles.errorTextFeild : ""}
                  />
                  {errorMessage.signInName && <Typography sx={{color:"red", fontSize:"12px"}}>{errorMessage.signInName}</Typography>}
               </Grid>
            </Grid>
         </Grid>
         <Box sx={{ marginTop: '24px' }}>
            <CommonButton onClick={handleSave} >Register Now</CommonButton>
         </Box>
      </Box>
   );
};

export default PersonalInfo;
