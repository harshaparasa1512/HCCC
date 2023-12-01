import { Box, Grid, Typography } from '@mui/material';
import {
   CommonButton,
   CustomInputLabel,
   CustomTextFeild,
} from 'components/common/StyledComponents/StyledFields';
import styles from './ConsolidatedAccounts.module.scss';
import { useState } from 'react';
import { object, string, ref, ValidationError } from 'yup';
import { isEmpty } from 'lodash';

interface ErrorMessageTypes {
   firstName: string;
   lastName: string;
   userName: string;
   phoneNumber: string;
}

const ConsolidatedAccounts = (): JSX.Element => {
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      userName: '',
      phoneNumber: '',
   });

   const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
      firstName: '',
      userName: '',
      lastName: '',
     phoneNumber: '',
      
   });
   const validationSchema = object().shape({
      firstName: string().required('First Name is required'),
      lastName: string().required('Last Name is required'),
      userName :string().required('User Name is required'),
      phoneNumber: string().required('Phone Number is required'),
      
   });
   const handleSave = async (): Promise<any> => {

      const errors: ErrorMessageTypes = {
         firstName: '',
         userName: '',
         lastName: '',
        phoneNumber: '',
        
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
         <Typography className={styles.SubHeading}>Consolidate Accounts</Typography>
         <Grid className={styles.mainLayout}>
            <Grid container spacing={2}>
               <Grid xs={12} sm={3} item>
                  <CustomInputLabel>First Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.firstName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, firstName: '' });
                        handleFieldChange('firstName', e.target.value);
                     }}
                     className={!isEmpty(errorMessage.firstName) ? styles.errorTextFeild : ""}
                  />
                  {!isEmpty(errorMessage.firstName) && <Typography sx={{color:"red", fontSize:"12px"}}>{errorMessage.firstName}</Typography>}
               </Grid>
               <Grid xs={12} sm={3} item>
                  <CustomInputLabel>Last Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.lastName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, lastName: '' });
                        handleFieldChange('lastName', e.target.value);
                     }}
                     className={!isEmpty(errorMessage.lastName) ? styles.errorTextFeild : ""}
                  />
                  {!isEmpty(errorMessage.lastName) && <Typography sx={{color:"red", fontSize:"12px"}}>{errorMessage.lastName}</Typography>}
               </Grid>
               <Grid xs={12} sm={3} item>
                  <CustomInputLabel>User Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.userName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, userName: '' });
                        handleFieldChange('userName', e.target.value);
                     }}
                     className={!isEmpty(errorMessage.userName) ? styles.errorTextFeild : ""}
                  />
                  {!isEmpty(errorMessage.userName) && <Typography sx={{color:"red", fontSize:"12px"}}>{errorMessage.userName}</Typography>}
               </Grid>
            </Grid>
            <Grid container spacing={2}>
               <Grid item xs={12} sm={3} sx={{ marginTop: '24px' }}>
                  <CustomInputLabel>Phone Number</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.phoneNumber}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, phoneNumber: '' });
                        handleFieldChange('phoneNumber', e.target.value);
                     }}
                     className={!isEmpty(errorMessage.phoneNumber) ? styles.errorTextFeild : ""}
                  />
                   {!isEmpty(errorMessage.phoneNumber) ? (
                     <Typography sx={{color:"red", fontSize:"12px",}}>{errorMessage.phoneNumber}</Typography>
                  ) : (
                     ''
                  )}
               </Grid>
            </Grid>
         </Grid>
         <Box sx={{ marginTop: '24px' }}>
            <CommonButton onClick={handleSave}>Submit</CommonButton>
         </Box>
      </Box>
   );
};

export default ConsolidatedAccounts;
