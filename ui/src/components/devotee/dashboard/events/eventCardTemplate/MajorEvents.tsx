import { Button, Card, Typography, Box,  } from '@mui/material';
import styles from './MajorEvents.module.scss';
import Navarathri from '../../../../../assets/majorEvents.png';
import { StyledDateContainer, CustomDateRangePicker,CustomCalendarIcon } from 'components/common/StyledComponents/StyledFields';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';



export const BasicDateRangePicker = (): React.ReactElement => {
   return (
      <StyledDateContainer>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
               <CustomDateRangePicker
                  slots={{ field: SingleInputDateRangeField }}
                  format="D/MM/YYYY"
                  slotProps={{
                     textField: {
                       InputProps: { startAdornment: <CustomCalendarIcon /> },
                     },
                   }}
                     
               />
            </DemoContainer>
         </LocalizationProvider>
      </StyledDateContainer>
   );
};

const MajorEvents = (): JSX.Element => {
   return (
      <Card sx={{ padding: '16px 20px 21px 16px', margin: '5px' }}>
         <Typography
            sx={{
               color: ' #313131',
               fontFamily: 'Lato',
               fontSize: '24px',
               fontStyle: ' normal',
               fontWeight: 600,
               paddingBottom: '10px',
            }}
         >
            Major Events
         </Typography>
         <Box>
            <img src={Navarathri} className={styles.image} />
            <Box>
               <Typography sx={{ fontWeight: '600', paddingTop: '5px' }}>
                  Devi Navarathri Celebrations
               </Typography>
               <Typography
                  sx={{
                     color: ' #8A8D93',
                     fontFamily: 'Lato',
                     fontSize: '16px',
                     fontStyle: 'normal',
                     fontWeight: 400,
                  }}
               >
                  The nine-day event will be celebrated at Goddess Kanaka Durga Prayer Hall
                  <Button
                     sx={{
                        color: '#F05802',
                        fontFamily: 'Lato',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        textTransform: 'capitalize',
                     }}
                  >
                     View More
                  </Button>{' '}
               </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
               {BasicDateRangePicker()}
               <Button
                  sx={{
                     display: ' inline-flex',
                     color: 'white',
                     padding: ' 8px 16px',
                     alignItems: 'flex-start',
                     gap: '10px',
                     borderRadius: '4px',
                     background: ' #F05802',
                     textTransform: 'capitalize',
                     ':hover': {
                        backgroundColor: '#F05802',
                        color: '#fff',
                     },
                  }}
               >
                  Donate
               </Button>
            </Box>
         </Box>
      </Card>
   );
};

export default MajorEvents;
