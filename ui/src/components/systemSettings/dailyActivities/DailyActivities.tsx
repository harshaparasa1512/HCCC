import { Box, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {
   StyledDateContainer,
   CustomDatePicker,
   CustomCalendarTodayOutlinedIcon,
   CustomInputLabel,
   CommonButton,
} from 'components/common/StyledComponents/StyledFields';
import dayjs from 'dayjs';
import { useState } from 'react';
import styles from './DailyActivities.module.scss';
import DailyActivitiesForm from './DilayActivitiesForm';

const DailyActivities = (): JSX.Element => {

   const [isAdding, setIsAdding] = useState(false);

   const handleSearchClick = () => {
      setIsAdding((pv) => !pv);
   };
   const [formData, setFormData] = useState({
      fromDate: '',
      toDate: '',
   });

   const handleFieldChange = (field: any, value: any): any => {
      setFormData({
         ...formData,
         [field]: value,
      });
   };

   const FromDate = (): React.ReactElement => {
      return (
         <div style={{ minWidth: '100%', marginTop: '12px' }}>
            <StyledDateContainer sx={{ borderRadius: '8px', background: '#FFF9E4' }}>
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
                        value={formData.fromDate ? dayjs(formData.fromDate, 'MM-DD-YYYY') : ''}
                        onChange={(value) => {
                           handleFieldChange('fromDate', value);
                        }}
                     />
                  </DemoContainer>
               </LocalizationProvider>
            </StyledDateContainer>
         </div>
      );
   };
   const ToDate = (): React.ReactElement => {
      return (
         <div style={{ minWidth: '100%', marginTop: '12px' }}>
            <StyledDateContainer sx={{ borderRadius: '8px', background: '#FFF9E4' }}>
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
                        value={formData.toDate ? dayjs(formData.toDate, 'MM-DD-YYYY') : ''}
                        onChange={(value) => {
                           handleFieldChange('toDate', value);
                        }}
                     />
                  </DemoContainer>
               </LocalizationProvider>
            </StyledDateContainer>
         </div>
      );
   };

   return !isAdding ? (
      <Box className={styles.totalLayout}>
         <Typography className={styles.SubHeading}>Daily Activities</Typography>
         <Box className={styles.formLayout}>
            <Grid container spacing={2}>
               <Grid xs={12} sm={6} item>
                  <CustomInputLabel>From Date</CustomInputLabel>
                  {FromDate()}
               </Grid>
               <Grid xs={12} sm={6} item>
                 <CustomInputLabel>To Date</CustomInputLabel>
                  {ToDate()}
               </Grid>
            </Grid>
         </Box>
         <CommonButton onClick={handleSearchClick}>Search</CommonButton>
      </Box>
   ):(
      <DailyActivitiesForm />
   )
};

export default DailyActivities;
