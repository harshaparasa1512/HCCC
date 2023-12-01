import { Box, Grid, Typography } from '@mui/material';
import {
   CommonButton,
   CustomInputLabel,
   CustomTextFeild,
} from 'components/common/StyledComponents/StyledFields';
import styles from './DevoteeTangibles.module.scss';
import { useEffect, useState } from 'react';
import { object, string, ref, ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

interface ErrorMessageTypes {
   receiptNumber: string;
}

const DevoteeTangibles = (): JSX.Element => {
   const [formData, setFormData] = useState({
      receiptNumber: '',
   });
   const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
      receiptNumber: '',
   });

   const navigate = useNavigate();

   // useEffect(()=>{
   //    if(!checkAuthToken()) {
   //       navigate('/')
   //    }
   // },[getaccessToken()])

   const handleSave = async (): Promise<void> => {
      const errors: ErrorMessageTypes = {
         receiptNumber: '',
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
   const validationSchema = object().shape({
      receiptNumber: string().required('Recipt Number is required'),
   });

   return (
      <Box className={styles.totalLayout}>
         <Typography className={styles.MainHeading}>Devotee Tangibles</Typography>
         <Typography className={styles.SubHeading}>Barcode Scanning</Typography>

         <Grid xs={12} sm={3} item className={styles.mainLayout}>
            <CustomInputLabel>Receipt Number</CustomInputLabel>
            <CustomTextFeild
               fullWidth
               required
               value={formData.receiptNumber}
               onChange={(e) => {
                  setErrorMessage({ ...errorMessage, receiptNumber: '' });
                  handleFieldChange('receiptNumber', e.target.value);
               }}
               className={errorMessage.receiptNumber ? styles.errorTextFeild : ""}
            />
            {errorMessage.receiptNumber ? (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorMessage.receiptNumber}
               </Typography>
            ) : (
               ''
            )}
         </Grid>
         <Box sx={{ marginTop: '24px' }}>
            <CommonButton onClick={handleSave}>Search</CommonButton>
         </Box>
      </Box>
   );
};

export default DevoteeTangibles;
