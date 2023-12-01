import { Box, Grid, Typography } from '@mui/material';
import {
   CommonButton,
   CustomInputLabel,
   CustomTextFeild,
} from 'components/common/StyledComponents/StyledFields';
import styles from './DevoteeAppointments.module.scss';
import { useEffect, useState } from 'react';
import { object, string, ref, ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';
interface ErrorMessageTypes {
   reciptNumber: string;
}

const DevoteeTangibles = (): JSX.Element => {
   const [formData, setFormData] = useState({
      reciptNumber: '',
   });
   const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
      reciptNumber: '',
   });

   const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])

   const handleFieldChange = (field: any, value: any) => {
      setFormData({
         ...formData,
         [field]: value,
      });
   };
   const handleSave = async (): Promise<void> => {
      const errors: ErrorMessageTypes = {
         reciptNumber: '',
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
   const validationSchema = object().shape({
      reciptNumber: string().required('Recipt Number is required'),
   });

   return (
      <Box className={styles.totalLayout}>
         <Typography className={styles.MainHeading}>Devotee Appointments</Typography>
         <Typography className={styles.SubHeading}>Appointments Barcode Scanning</Typography>

         <Grid xs={12} sm={3} item className={styles.mainLayout}>
            <CustomInputLabel>Receipt Number</CustomInputLabel>
            <CustomTextFeild
               fullWidth
               required
               value={formData.reciptNumber}
               onChange={(e) => {
                  setErrorMessage({ ...errorMessage, reciptNumber: '' });
                  handleFieldChange('reciptNumber', e.target.value);
               }}
               // style={errorMessage.reciptNumber ? { border: '1px solid red' } : {}}
               className={errorMessage.reciptNumber ? styles.errorTextFeild : ""}
            />
            {errorMessage.reciptNumber ? (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorMessage.reciptNumber}
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
