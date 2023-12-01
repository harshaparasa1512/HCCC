import type React from 'react';
import { useState, useEffect } from 'react';
import styles from './Donation.module.scss';
import {
   CustomTextFeild,
   CustomSelect,
   CustomInputLabel,
   CommonButton,
} from 'components/common/StyledComponents/StyledFields';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
   Grid,
   Typography,
   FormControl,
   MenuItem,
   Box,
   Card,
   FormControlLabel,
   Checkbox,
} from '@mui/material';
import AddMoreDonations from './selectedDonations/AddMoreDonations';
import ModeofPayment from 'components/common/modeOfPayment/modeOfPayment';
import { ValidationError, object, string } from 'yup';

const Donation: React.FC = () => {
   // Define form state using the useState hook
   const [formData, setFormData] = useState({
      name: '',
      address: '',
      donationPurpose: '',
      amount: '',
      modeOfPayments: '',
   });
   const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
      name: '',
      address: '',
      donationPurpose: '',
      amount: '',
   });
   const [touchedFields, setTouchedFields] = useState({
      name: false,
      address: false,
      donationPurpose: false,
      amount: false,
   });

   const [isAddMoreOpen, setIsAddMoreOpen] = useState(false);

   const toggleAddMore = (): void => {
      setIsAddMoreOpen(!isAddMoreOpen);
   };
   const handleFieldChange = (field: any, value: any): any => {
      setFormData({
         ...formData,
         [field]: value,
      });
   };

   const DonationDropdown = (): React.ReactElement => {
      return (
         <FormControl sx={{ paddingTop: '5px', width: '400px', paddingBottom: '20px' }}>
            <CustomSelect
               defaultValue=""
               value={formData.donationPurpose}
               id="grouped-select"
               IconComponent={KeyboardArrowDownIcon}
               onChange={(e) => {
                  setErrorMessage({ ...errorMessage, donationPurpose: '' });
                  handleFieldChange('donationPurpose', e.target.value);
               }}
               onBlur={() => {
                  handleBlur('donationPurpose');
               }}
               error={touchedFields.donationPurpose && Boolean(errorMessage.donationPurpose)}
               className={errorMessage.donationPurpose ? styles.errorTextFeild : ''}
            >
               <MenuItem value={1}>Annadana</MenuItem>
               <MenuItem value={2}>Pooja Booking</MenuItem>
               <MenuItem value={3}>Navarathri</MenuItem>
               <MenuItem value={4}>Wedding</MenuItem>
            </CustomSelect>
            {touchedFields.donationPurpose && errorMessage.donationPurpose && (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorMessage.donationPurpose}
               </Typography>
            )}
         </FormControl>
      );
   };
   interface ErrorMessageTypes {
      name: string;
      address: string;
      donationPurpose: string;
      amount: string;
   }

   const handleBlur = (field: keyof ErrorMessageTypes): void => {
      console.log('field', field);
      setTouchedFields({
         ...touchedFields,
         [field]: true,
      });
      if (field === 'donationPurpose') {
         setErrorMessage({ ...errorMessage, donationPurpose: '' });
      }

      void validateField(field);
   };

   const validateField = async (field: keyof ErrorMessageTypes): Promise<void> => {
      const errors: ErrorMessageTypes = { ...errorMessage };

      try {
         // Validate the specific field against the validation schema
         await validationSchema.fields[field].validate(formData[field]);
         // If validation passes, clear the error message for the field
         errors[field] = '';
      } catch (error) {
         // Handle validation errors for the specific field
         if (error instanceof ValidationError) {
            errors[field] = error.message;
         }
      }

      setErrorMessage(errors);
   };
   const validationSchema: any = object().shape({
      name: string().required('Recipt Number is required'),
      address: string().required('Address is required'),
      donationPurpose: string().required('Dropdown is required'),
      amount: string().required('Amount is required'),
   });

   return (
      <>
         <Typography
            sx={{
               color: '#414141',
               fontFamily: 'Lato',
               fontSize: '32px',
               fontStyle: 'normal',
               fontWeight: 700,
               lineHeight: ' 140%',
               marginBottom: '16px',
            }}
         >
            Donation
         </Typography>
         <Card className={styles.wholeConatiner}>
            <Box className={styles.BoxContainer}>
               <div className={styles.formContainer}>
                  <Typography className={styles.typoGraphySubheading}>Details</Typography>

                  <Grid className={styles.singlefeild}>
                     <CustomInputLabel>Name</CustomInputLabel>
                     <CustomTextFeild
                        required
                        value={formData.name}
                        onChange={(e) => {
                           setErrorMessage({ ...errorMessage, name: '' });
                           handleFieldChange('name', e.target.value);
                        }}
                        onBlur={() => {
                           handleBlur('name');
                        }}
                        className={errorMessage.name ? styles.errorTextFeild : ''}
                     />

                     {touchedFields.name && errorMessage.name && (
                        <Typography sx={{ color: 'red', fontSize: '12px' }}>
                           {errorMessage.name}
                        </Typography>
                     )}
                  </Grid>
                  <Grid className={styles.singlefeild}>
                     <CustomInputLabel className={styles.labels}>Address</CustomInputLabel>
                     <CustomTextFeild
                        required
                        value={formData.address}
                        onChange={(e) => {
                           setErrorMessage({ ...errorMessage, address: '' });
                           handleFieldChange('address', e.target.value);
                        }}
                        onBlur={() => {
                           handleBlur('address');
                        }}
                        className={errorMessage.address ? styles.errorTextFeild : ''}
                     />
                     {touchedFields.address && errorMessage.address && (
                        <Typography sx={{ color: 'red', fontSize: '12px' }}>
                           {errorMessage.address}
                        </Typography>
                     )}
                  </Grid>

                  <Grid sx={{ display: 'flex', gap: '40px' }}>
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                        }}
                     >
                        <CustomInputLabel>Donation Purpose</CustomInputLabel>
                        {DonationDropdown()}
                     </Box>

                     <CommonButton sx={{ marginTop: '33px' }} onClick={toggleAddMore}>
                        Add More
                     </CommonButton>
                  </Grid>
                  <Grid className={styles.singlefeild}>
                     <CustomInputLabel className={styles.labels}>Amount</CustomInputLabel>
                     <CustomTextFeild
                        required
                        type="number"
                        value={formData.amount}
                        onChange={(e) => {
                           setErrorMessage({ ...errorMessage, amount: '' });
                           handleFieldChange('amount', e.target.value);
                        }}
                        onBlur={() => {
                           handleBlur('amount');
                        }}
                        className={errorMessage.amount ? styles.errorTextFeild : ''}
                     />
                     {touchedFields.amount && errorMessage.amount && (
                        <Typography sx={{ color: 'red', fontSize: '12px' }}>
                           {errorMessage.amount}
                        </Typography>
                     )}
                  </Grid>

                  <ModeofPayment />

                  <Box className={styles.reccuringPayment}>
                     <CustomInputLabel>Recurring Payment</CustomInputLabel>

                     <Box className={styles.CheckBoxStyles}>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 defaultChecked
                                 size="small"
                                 className={styles.singlecheckBox}
                              />
                           }
                           label="Weekly"
                        />
                        <FormControlLabel
                           control={<Checkbox size="small" className={styles.singlecheckBox} />}
                           label="Monthly"
                        />
                        <FormControlLabel
                           control={<Checkbox size="small" className={styles.singlecheckBox} />}
                           label="Yearly"
                        />
                     </Box>
                  </Box>
               </div>
            </Box>

            {isAddMoreOpen && (
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'right',
                     // marginright:"10px",
                  }}
               >
                  <AddMoreDonations />
               </Box>
            )}
         </Card>
      </>
   );
};

export default Donation;
