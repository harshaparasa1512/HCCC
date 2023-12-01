import {
   Grid,
   FormControl,
   MenuItem,
   Box,
   styled,
   Typography,
   FormControlLabel,
   RadioGroup,
} from '@mui/material';
import styles from './commonDonations.module.scss';
import ModeofPayment from 'components/common/modeOfPayment/modeOfPayment';
import {
   CustomTextFeild,
   CustomCheckbox,
   CustomSelect,
   CustomRadioButton,
   CustomInputLabel,
   StyledDateContainer,
   CustomCalendarTodayOutlinedIcon,
   CustomDatePicker,
   ContactNumberInput,
} from 'components/common/StyledComponents/StyledFields';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from 'react';


const BasicDatePicker = (): React.ReactElement => {
   return (
      <div style={{ minWidth: '100%' }}>
         <StyledDateContainer
            sx={{ backgroundColor: '#FFF9E4', border:"1px solid #F05802", borderRadius: '8px', height: '48px' }}
         >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer components={['DateTimePicker']}>
                  <CustomDatePicker
                     slots={{
                        openPickerIcon: CustomCalendarTodayOutlinedIcon,
                     }}
                     slotProps={{
                        inputAdornment: {
                           position: 'end',
                        },
                     }}
                     format="DD-MM-YYYY"

                     // onChange={(value) => {
                     //    setErrorMessage({ ...errorMessage, dateOfBirth: '' });
                     //    handleFieldChange('dateOfBirth', value);
                     // }}
                  />
               </DemoContainer>
            </LocalizationProvider>
         </StyledDateContainer>
      </div>
   );
};

const CommonDonations = (): JSX.Element => {
   const [userType, setUserType] = useState('registered'); // Default to 'registered'

   const handleUserTypeChange = (type: string) => {
      setUserType(type);
   };

   const showCheckboxes = userType === 'non-registered';

   const donationPurpose = (): React.ReactElement => {
      return (
         <FormControl sx={{ width: '100%', backgroundColor: '#FFF9E4', borderRadius: '8px' }}>
            <CustomSelect className={styles.dropDownSelect} defaultValue="" id="grouped-select">
               <MenuItem value="">
                  <em>Select</em>
               </MenuItem>
               <MenuItem value={1}>Abharana</MenuItem>
               <MenuItem value={2}>Annadana</MenuItem>
               <MenuItem value={3}>Annadana Hall & Annapurneshwari Yagam</MenuItem>
               <MenuItem value={4}>Calendar</MenuItem>
               <MenuItem value={5}>Construction-Donations</MenuItem>
               <MenuItem value={6}>Cultural-Donations</MenuItem>
               <MenuItem value={7}>Daily Nitya Archana</MenuItem>
               <MenuItem value={8}>Debt Retirement Fund</MenuItem>
               <MenuItem value={9}>Endowment Fund</MenuItem>
               <MenuItem value={10}>Event Hall Rental</MenuItem>
               <MenuItem value={11}>Flowers</MenuItem>
               <MenuItem value={12}>General Donation</MenuItem>
               <MenuItem value={13}>Hindu Heritage Hall</MenuItem>
               <MenuItem value={14}>Human Services</MenuItem>
               <MenuItem value={15}>Hundi</MenuItem>
               <MenuItem value={16}>Information System Donation</MenuItem>
               <MenuItem value={17}>Mutthangi Seva</MenuItem>
               <MenuItem value={18}>Nagadevatha</MenuItem>
               <MenuItem value={19}>Natural Disasters</MenuItem>
               <MenuItem value={20}>Navagraha Sannidhi Improvements</MenuItem>
               <MenuItem value={21}>Other Donation</MenuItem>
               <MenuItem value={22}>Poolangi Seva</MenuItem>
               <MenuItem value={23}>Priest Housing</MenuItem>
               <MenuItem value={24}>Priest Welfare Fund</MenuItem>
               <MenuItem value={25}>Refunds & Other Credits</MenuItem>
               <MenuItem value={26}>Sudha Ragunathan Concert</MenuItem>
               <MenuItem value={27}>Tiruppavada Seva</MenuItem>
               <MenuItem value={28}>Vadamala($25)</MenuItem>
               <MenuItem value={29}>Vastra</MenuItem>
               <MenuItem value={30}>Youth & Education</MenuItem>
            </CustomSelect>
         </FormControl>
      );
   };

   return (
      <div>
         {/* <Dialog className={styles.dialogMain} open={isOpen}> */}

         <div className={styles.formContainer}>
               <RadioGroup  value={userType} sx={{ display: 'flex', flexDirection:"row",paddingLeft:"15px" }} >
                  <FormControlLabel 
                     value="registered"
                     control={
                        <CustomRadioButton
                           onChange={() => handleUserTypeChange('registered')}
                           sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                        />
                     }
                     label={
                        <Typography sx={{ fontSize: 14 }}>Registered Devotee</Typography>
                     }
                  />
                  <FormControlLabel
                     value="non-registered"
                     control={
                        <CustomRadioButton
                           onChange={() => handleUserTypeChange('non-registered')}
                           sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                        />
                     }
                     label={
                        <Typography sx={{ fontSize: 14 }}>Non-Registered Devotee</Typography>
                     }
                  />
               </RadioGroup>
            <Grid container spacing={1} sx={{ padding: '25px' }}>
               <Grid container spacing={2}>
                  <Grid xs={12} sm={5} item>
                     <CustomInputLabel>Name</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        // value={formData.firstName}
                        // onChange={(e) => handleFieldChange('firstName', e.target.value)}
                     />
                  </Grid>
                  <Grid xs={12} sm={5} item>
                     <CustomInputLabel>Last Name</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        // value={formData.middleName}
                        // onChange={(e) => handleFieldChange('middleName', e.target.value)}
                     />
                  </Grid>
               </Grid>
               <Grid container spacing={2}>
                  <Grid xs={12} sm={5} item className={styles.singleFeild}>
                     <CustomInputLabel>Phone No</CustomInputLabel>
                     <ContactNumberInput sx={{width:"285px",}}
                        mask="+1 (999) 999-9999"
                        maskChar="_"
                        id="usPhoneNumber"
                        // placeholder="+1 ___ ___ ____"
                        type="tel"
                        required
                        // onChange={(e) => {
                        // handleFieldChange('phoneNumber', e.target.value);
                        // }}
                     />
                  </Grid>
                  <Grid xs={12} sm={5} item className={styles.singleFeild}>
                     <CustomInputLabel>Email</CustomInputLabel>
                     <CustomTextFeild fullWidth required />
                  </Grid>
               </Grid>
               <Grid container spacing={2}>
                  <Grid xs={12} sm={5} item className={styles.singleFeild}>
                     <CustomInputLabel>Donation Purpose</CustomInputLabel>
                     {donationPurpose()}
                  </Grid>
                  <Grid xs={12} sm={5} item className={styles.singleFeild}>
                     <CustomInputLabel>Date</CustomInputLabel>
                     {BasicDatePicker()}
                  </Grid>
               </Grid>
               <Grid container spacing={2}>
                  <Grid xs={12} sm={5} item className={styles.singleFeild}>
                     <CustomInputLabel>Amount</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        // value={formData.firstName}
                        // onChange={(e) => handleFieldChange('firstName', e.target.value)}
                     />
                  </Grid>
               </Grid>
            </Grid>
            <Box className={styles.ModeofPayment}>
               <ModeofPayment />
            </Box>

            {showCheckboxes && (
               <div className={styles.ckeckBoxContainer}>
                  <div className={styles.label}>
                     <CustomCheckbox />
                     <CustomInputLabel className={styles.chckboxTitle}>
                        Payment Receipt over SMS
                     </CustomInputLabel>
                  </div>
                  <div className={styles.label}>
                     <CustomCheckbox />
                     <CustomInputLabel className={styles.chckboxTitle}>
                        Payment Receipt over Mail
                     </CustomInputLabel>
                  </div>
               </div>
            )}
         </div>
         {/* </Dialog> */}
      </div>
   );
};

export default CommonDonations;
