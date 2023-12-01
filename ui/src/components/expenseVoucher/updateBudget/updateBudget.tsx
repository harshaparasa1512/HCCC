import React, { useState } from 'react';
import { Grid } from '@mui/material';
import {
   CustomTextFeild,
   CustomInputLabel,
   CustomSelect,
   CommonButton,
} from 'components/common/StyledComponents/StyledFields';
import styles from './updateBudget.module.scss';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { object, string, ValidationError } from 'yup';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { apiRequest } from 'infrastructure/backendService';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface ErrorMessageTypes {
   selectAmount: string;
   selectSubAmount: string;
   selectYear: string;
   budget: string;
}

const UpdateExpenseVoucher = (): JSX.Element => {
   const [formData, setFormData] = useState({
      selectAmount: '',
      selectSubAmount: '',
      selectYear: '',
      budget: '',
   });

   const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
      selectAmount: '',
      selectSubAmount: '',
      selectYear: '',
      budget: '',
   });

   const validationSchema = object().shape({
      selectAmount: string().required('select Amount is required'),
      selectSubAmount: string().required('select Sub Amount is required'),
      selectYear: string().required('select Year is required'),
      budget: string().required('budget is required'),
   });

   const handleFieldChange = (field: string, value: any): void => {
      setFormData({
         ...formData,
         [field]: value,
      });
   };


   const gothramList = [
      {
         label: 'label Name',
      },
      {
         label: 'label Name',
      },
      {
         label: 'label Name',
      },
      {
         label: 'label Name',
      },
      {
         label: 'label Name',
      },
      {
         label: 'label Name',
      },
   ];

   const customDropDown = (value: string, placeHolder: string, fieldName: string, errorText: string, listOfValues: object[]): React.ReactElement => {
      return (
         <FormControl className={styles.dropDowns}>
            <CustomSelect
               IconComponent={KeyboardArrowDownIcon}
               className={styles.dropDownSelect}
               id="grouped-select"
               placeholder={placeHolder}
               value={value}
               onChange={(e) => {
                  setErrorMessage({ ...errorMessage, [fieldName]: '' });
                  handleFieldChange(fieldName, e.target.value);
               }}
            >
               {listOfValues.map((item: any, index) => (
                  <MenuItem key={index} value={item.label}>
                     {item.label}
                  </MenuItem>
               ))}
            </CustomSelect>
            {errorText ? (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorText}
               </Typography>
            ) : (
               ''
            )}
         </FormControl>
      );
   };

   const handleUpdate = async (): Promise<void> => {
      const errors: ErrorMessageTypes = {
         selectAmount: '',
         selectSubAmount: '',
         selectYear: '',
         budget: '',
      };

      try {
         // Validate the form data against the validation schema
         await validationSchema.validate(formData, { abortEarly: false });
         // If validation passes, you can submit the form
         setErrorMessage(errors);
         alert('Update Successful');
         // Call your API or perform other actions here
         //  updateApiCall();
      } catch (error: any) {
         // Handle validation errors

         if (error instanceof ValidationError) {
            error.inner.forEach((e: any) => {
               if (e.path) {
                  errors[e.path as keyof ErrorMessageTypes] = e.message;
               }
            });
         }
         setErrorMessage(errors);
      }
   };

   const updateApiCall = () => {
      const reqBody = {
         selectAmount: formData.selectAmount,
         selectSubAmount: formData.selectSubAmount,
         selectYear: formData.selectYear,
         budget: formData.budget
      }
      apiRequest({
         method: 'PUT',
         endpoint: '/',
         body: JSON.stringify(reqBody)
      })
   }

   return (
      <>
      <div style={{display:"flex"}}>
         <LeftMainNavigation/>
         <div className={styles.BoxContainer}>
            {/* <Typography component="div" className={styles.typoGraphyHeading}>
            Expense Voucher
         </Typography> */}
            <div className={styles.formContainer}>
               <Typography component="div" className={styles.typoGraphy}>
                  Add / Update Budgets
               </Typography>

               <Grid container spacing={2} sx={{ marginTop: '0px' }}>
                  <Grid item xs={12} sm={3}>
                     <CustomInputLabel>Select Amount</CustomInputLabel>
                     {customDropDown(formData.selectAmount, "Select Amount", 'selectAmount', errorMessage.selectAmount, gothramList)}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                     <CustomInputLabel>Select Sub-Amount</CustomInputLabel>
                     {customDropDown(formData.selectSubAmount, "Select Sub-Amount", 'selectSubAmount', errorMessage.selectSubAmount, gothramList)}
                  </Grid>
               </Grid>
               <Grid container spacing={2} sx={{ marginTop: '0px' }}>
                  <Grid item xs={12} sm={3}>
                     <CustomInputLabel>Select Year</CustomInputLabel>
                     {customDropDown(formData.selectYear, "Select Year", 'selectYear', errorMessage.selectYear, gothramList)}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                     <CustomInputLabel>Budget</CustomInputLabel>
                     <CustomTextFeild
                        className={styles.textField}
                        fullWidth
                        required
                        value={formData.budget}
                        onChange={(e) => {
                           setErrorMessage({ ...errorMessage, budget: '' });
                           handleFieldChange('budget', e.target.value);
                        }}
                        type='number'
                     />
                     {errorMessage.budget ? (
                        <Typography sx={{ color: 'red', fontSize: '12px' }}>
                           {errorMessage.budget}
                        </Typography>
                     ) : (
                        ''
                     )}
                  </Grid>
               </Grid>
            </div>
            <CommonButton sx={{ marginTop: '20px' }} onClick={handleUpdate}>Update</CommonButton>
         </div>
      </div>
      </>
   );
};

export default UpdateExpenseVoucher;
