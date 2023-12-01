
import {
   Box,
   FormControl,
   FormControlLabel,
   Grid,
   MenuItem,
   Radio,
   RadioGroup,
   Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
   StyledDateContainer,
   CustomDatePicker,
   CustomCalendarTodayOutlinedIcon,
   CustomInputLabel,
   CommonButton,
   CustomTextFeild,
   CustomSelect,
} from 'components/common/StyledComponents/StyledFields';
import dayjs from 'dayjs';
import { useState } from 'react';
import styles from './DailyActivitiesForm.module.scss';
import DailyActivityInformation from './DailyActivityInformation';

const DailyActivitiesForm = (): JSX.Element => {

   const [isAdding, setIsAdding] = useState(false);

   const handleUpdateClick = () => {
      setIsAdding((pv) => !pv);
   };
   const [formData, setFormData] = useState({
      activityName: '',
      activityId: '',
      categoryCode: '',
      scheduleDate: '',
      scheduleTime: '',
      activityDescription: '',
      spopportunity: '',
      deity: '',
   });

   const handleFieldChange = (field: any, value: any): any => {
      setFormData({
         ...formData,
         [field]: value,
      });
   };
   const ActivityTypeRadioButtons = (): React.ReactElement => {
      return (
         <RadioGroup sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <FormControlLabel
               value="event"
               control={
                  <Radio
                     sx={{
                        '& .MuiSvgIcon-root': { fontSize: 18, fill: '#f05802' },
                        color: '#F05802',
                     }}
                  />
               }
               label="Event"
            />
            <FormControlLabel
               value="pooja"
               control={
                  <Radio
                     sx={{
                        '& .MuiSvgIcon-root': { fontSize: 18, fill: '#f05802' },
                        color: '#F05802',
                     }}
                  />
               }
               label="Pooja"
            />
         </RadioGroup>
      );
   };
   const ActivityFrequencyRadioButtons = (): React.ReactElement => {
      return (
         <RadioGroup
            sx={{ display: 'flex', flexDirection: 'row', gap: '5px', marginBottom: '24px' }}
         >
            <FormControlLabel
               value="yes"
               control={
                  <Radio
                     sx={{
                        '& .MuiSvgIcon-root': { fontSize: 18, fill: '#f05802' },
                        color: '#F05802',
                     }}
                  />
               }
               label="Yes"
            />
            <FormControlLabel
               value="no"
               control={
                  <Radio
                     sx={{
                        '& .MuiSvgIcon-root': { fontSize: 18, fill: '#f05802' },
                        color: '#F05802',
                     }}
                  />
               }
               label="No"
            />
         </RadioGroup>
      );
   };

   const ScheduleDate = (): React.ReactElement => {
      return (
         <div style={{ width: '405px' }}>
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
                        value={
                           formData.scheduleDate ? dayjs(formData.scheduleDate, 'MM-DD-YYYY') : ''
                        }
                        onChange={(value) => {
                           handleFieldChange('scheduleDate', value);
                        }}
                     />
                  </DemoContainer>
               </LocalizationProvider>
            </StyledDateContainer>
         </div>
      );
   };
   const ScheduleTime = (): React.ReactElement => {
      return (
         <div style={{ width: '405px' }}>
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
                        value={
                           formData.scheduleTime ? dayjs(formData.scheduleTime, 'MM-DD-YYYY') : ''
                        }
                        onChange={(value) => {
                           handleFieldChange('scheduleTime', value);
                        }}
                     />
                  </DemoContainer>
               </LocalizationProvider>
            </StyledDateContainer>
         </div>
      );
   };

   const Diety = (): React.ReactElement => {
      return (
         <FormControl sx={{ width: '405px', backgroundColor: '#FFF9E4', borderRadius: '8px' }}>
            <CustomSelect
               className={styles.dropDownSelect}
               IconComponent={KeyboardArrowDownIcon}
               defaultValue=""
               id="grouped-select"
            >
               <MenuItem value="">
                  <em>Diety</em>
               </MenuItem>
               <MenuItem value={1}>Telugu</MenuItem>
               <MenuItem value={2}>Hindi</MenuItem>
               <MenuItem value={3}>English</MenuItem>
               <MenuItem value={4}>Tamil</MenuItem>
            </CustomSelect>
         </FormControl>
      );
   };

   return !isAdding ? (
      <>
         <Box className={styles.totalLayout}>
            <Typography className={styles.SubHeading}>Daily Activities</Typography>
            <Grid className={styles.formLayout}>
               <Grid container spacing={2}>
                  <Grid xs={12} sm={6} item className={styles.singleFeild}>
                     <CustomInputLabel>Activity Name</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        value={formData.activityName}
                        onChange={(e) => {
                           handleFieldChange('activityName', e.target.value);
                        }}
                     />
                  </Grid>
               </Grid>
               <Grid container spacing={2}>
                  <Grid xs={12} sm={6} item className={styles.singleFeild}>
                     <CustomInputLabel>Activity ID</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        value={formData.activityId}
                        onChange={(e) => {
                           handleFieldChange('activityId', e.target.value);
                        }}
                     />
                  </Grid>
                  <Grid xs={12} sm={6} item className={styles.singleFeild}>
                     <CustomInputLabel>Category Code</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        value={formData.categoryCode}
                        onChange={(e) => {
                           handleFieldChange('categoryCode', e.target.value);
                        }}
                     />
                  </Grid>
               </Grid>
               <Grid container spacing={2}>
                  <Grid xs={12} sm={6} item className={styles.singleFeild}>
                     <CustomInputLabel>Schedule Date </CustomInputLabel>
                     {ScheduleDate()}
                  </Grid>
                  <Grid xs={12} sm={6} item className={styles.singleFeild}>
                     <CustomInputLabel>Schedule Time</CustomInputLabel>
                     {ScheduleTime()}
                  </Grid>
               </Grid>
               <Grid className={styles.singleFeild}>
                  <CustomInputLabel sx={{ marginBottom: '0px' }}>Activity Type</CustomInputLabel>
                  {ActivityTypeRadioButtons()}
               </Grid>
               <Grid container spacing={2}>
                  <Grid xs={12} sm={6} item className={styles.singleFeild}>
                     <CustomInputLabel>Activity Description</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        value={formData.activityDescription}
                        onChange={(e) => {
                           handleFieldChange('activityDescription', e.target.value);
                        }}
                     />
                  </Grid>
               </Grid>
               <Grid>
                  <CustomInputLabel sx={{ marginBottom: '0px' }}>
                     Activity Frequency
                  </CustomInputLabel>
                  {ActivityFrequencyRadioButtons()}
               </Grid>
               <Grid container spacing={2}>
                  <Grid xs={12} sm={6} item className={styles.singleFeild}>
                     <CustomInputLabel>Deity</CustomInputLabel>
                     {Diety()}
                  </Grid>
                  <Grid xs={12} sm={6} item className={styles.singleFeild}>
                     <CustomInputLabel>SP Opportunity</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        value={formData.spopportunity}
                        onChange={(e) => {
                           handleFieldChange('spopportunity', e.target.value);
                        }}
                     />
                  </Grid>
               </Grid>
            </Grid>

            <CommonButton onClick={handleUpdateClick}>Update</CommonButton>
         </Box>
      </>
   ) : (
      <DailyActivityInformation />
   )
};

export default DailyActivitiesForm;
