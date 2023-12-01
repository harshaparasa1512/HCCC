import { Card, Typography, Box, Divider, Tooltip } from '@mui/material';
import styles from './Reminders.module.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
   StyledDateContainer,
   CustomDatePicker,
   CustomCalendarIcon,
   CommonButton,
} from 'components/common/StyledComponents/StyledFields';
import EmptyPage from 'components/common/emptyPages/emptyPage';
import { CustomTooltip } from 'components/common/muhurtham/muhurtham';
import { useEffect, useState } from 'react';
import { apiRequest } from 'infrastructure/backendService';



const Reminders: React.FC = () => {

   const [remindersList, setRemindersList] = useState<any[]>([])

   const RemindersInfo = [
      {
         image: '/images/Annadanam.svg',
         name: 'Annadan Donation Membership is ending soon Membership is ending soon',
      },
      {
         image: '/images/Birthday.svg',
         name: 'Rajyalakashmi ( Mother) Birthday Commingn',
      },
      {
         image: '/images/Wedding.svg',
         name: 'Wedding Anniversary Coming Next month',
      },
   ];

   useEffect(()=>{
      apiRequest({
         method:'GET',
         endpoint:'',
      })
      .then((res)=>{
         console.log(res.data);
         setRemindersList(res.data);
      })
      .catch((err)=>{
         console.log(err);
         setRemindersList(RemindersInfo); // comment this line after getting response 200 from the server
      })
   },[])

   const BasicDatePicker = (): React.ReactElement => {
      return (
         <StyledDateContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer components={['DateTimePicker']}>
                  <CustomDatePicker
                     slots={{
                        openPickerIcon: CustomCalendarIcon,
                     }}
                     slotProps={{
                        inputAdornment: {
                           position: 'start',
                        },
                     }}
                     format="D MMM YY"
                  />
               </DemoContainer>
            </LocalizationProvider>
         </StyledDateContainer>
      );
   };
   
   const renderEmptyData = () => {
      return (
         <Box >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '18px' }}>
               <Typography
                  sx={{
                     color: '#313131',
                     fontFamily: 'Lato',
                     fontSize: '24px',
                     fontStyle: 'normal',
                     fontWeight: 600,
                  }}
               >
                  Reminders
               </Typography>
   
              <Box sx={{marginRight:"50px", marginTop:"75px"}}>
              <EmptyPage 
                  imgUrl="/images/EmptyReminder.svg"
                  typographyText="No Reminders to Show"  
                  subComponent={<CommonButton>Add</CommonButton>}
                  />
              </Box>
            </Box>
         </Box>
      );
   };
   
   const renderWithData = () => {
      return (
         <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '18px' }}>
               <Typography
                  sx={{
                     color: '#313131',
                     fontFamily: 'Lato',
                     fontSize: '24px',
                     fontStyle: 'normal',
                     fontWeight: 600,
                  }}
               >
                  Reminders
               </Typography>
            </Box>
            {RemindersInfo.map((info) => (
               <Box
                  sx={{
                     width: '100%',
                     height: '90px',
                     padding: '0px 15px 16px 0px',
                     marginBottom: '24px',
                  }}
                  key={info.name}
               >
                  <Box sx={{ display: 'flex', height: '90px' }}>
                     <Box className={styles.image}>
                        <img src={info.image} />
                     </Box>
   
                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CustomTooltip title={info.name} placement="top-start" arrow>
                           <Typography
                              sx={{
                                 color: '#313131',
                                 fontFamily: 'Lato',
                                 fontSize: '16px',
                                 fontStyle: 'normal',
                                 fontWeight: 500,
                                 margin: '0px 36px 0px 8px',
                              }}
                           >
                              {info.name.length > 35 ? `${info.name.slice(0, 35)}...` : info.name}
                           </Typography>
                        </CustomTooltip>
   
                        <Box sx={{ marginTop: '-9px' }}>{BasicDatePicker()}</Box>
                     </Box>
                  </Box>
                  <Divider sx={{ background: '#C1C1C1', marginBottom: '24px' }} />
               </Box>
            ))}
         </>
      );
   };

   return (
      <Card sx={{ width: '100%px', height: '445px', padding: '24px' }}>
          {remindersList.length === 0 ? <>{renderEmptyData()}</> : <>{renderWithData()}</>}
      </Card>
   );
};

export default Reminders;
