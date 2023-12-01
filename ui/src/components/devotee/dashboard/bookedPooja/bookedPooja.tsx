import { Card, Box, Typography, Button } from '@mui/material';
import styles from './BookePooja.module.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
   CustomDateTimePicker,
   StyledDateContainer,
   CustomCalendarIcon,
   CommonButton,
} from 'components/common/StyledComponents/StyledFields';
import EmptyPage from 'components/common/emptyPages/emptyPage';
import { useEffect, useState } from 'react';
import { apiRequest } from 'infrastructure/backendService';

const BookedPooja = (): JSX.Element => {
   const [bookedPoojaList, setBookedPoojaList] = useState<any[]>([]);

   const BookePoojaInfo = [
      {
         image: '/images/Ganesha.svg',
         title: 'Ganesha GakaraSahasranama Archana',
         location: 'Home',
         Status: 'Confirmed',
         Date:"04/2/2022 | 09:30 AM"
      },
      {
         image: '/images/Shivabhisekham.svg',
         title: 'Shiva Abhisekham',
         location: 'Home',
         Status: 'Pending',
         Date:"11/05/2002 | 10:11 AM"
      },
      {
         image: '/public/images/BalajiAbhisekham.svg',
         title: 'Balaji Abhisekham',
         location: 'Home',
         Status: 'Pending',
         Date:"20/10/2012 | 05:00 AM"
      },
      {
         image: '/images/Ganesha.svg',
         title: 'Ganesha GakaraSahasranama Archana',
         location: 'Home',
         Status: 'Confirmed',
         Date:"18/08/1922 | 08:00 AM"
      },
      {
         image: '/images/Ganesha.svg',
         title: 'Ganesha GakaraSahasranama Archana',
         location: 'Home',
         Status: 'Confirmed',
         Date:"2/03/1822 | 06:00 PM"
      },
   ];

   useEffect(()=>{
      apiRequest({
         method:'GET',
         endpoint:'',
      })
      .then((res)=>{
         console.log(res.data);
         setBookedPoojaList(res.data);
      })
      .catch((err)=>{
         console.log(err);
         setBookedPoojaList(BookePoojaInfo); // comment this line after getting response 200 from the server
      })
   },[])

   const BasicTimeDatePicker = (): React.ReactElement => {
      return (
         <StyledDateContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer components={['DateTimePicker']}>
                  <CustomDateTimePicker
                     slots={{
                        openPickerIcon: CustomCalendarIcon,
                     }}
                     slotProps={{
                        inputAdornment: {
                           position: 'start',
                        },
                     }}
                     format="D MMM YY | H:MM A"
                  />
               </DemoContainer>
            </LocalizationProvider>
         </StyledDateContainer>
      );
   };

   const renderWithData = () => {
      return (
         <Box >
            <Box className={styles.headButton}>
               <Typography className={styles.heading}>Booked Pooja</Typography>
               <CommonButton>Book Pooja</CommonButton>
            </Box>
            <div className={styles.BookedPoojaCardsLayout}>
            {BookePoojaInfo.map((info, i) => (
              
              <Box
                 className={styles.bookedPoojaCards}
                 key={i}
                 style={{
                    backgroundColor: info.Status === 'Confirmed' ? '#F6FFE3' : '#FFF9E4',
                 }}
              >
                 <img src={info.image} className={styles.image} />
                 <Box className={styles.infoStyels}>
                    <Typography className={styles.title}>{info.title}</Typography>
                    <Box className={styles.location}>
                       <img src="/images/location_on.svg" className={styles.locationImage} />
                       <Typography className={styles.locationName}>
                          Location : {info.location}
                       </Typography>
                    </Box>
                    <Box className={styles.location}>
                       {info.Status === 'Confirmed' ? (
                          <img src="/images/done_all.svg" className={styles.locationImage} />
                       ) : (
                          <img src="/images/error.svg" className={styles.locationImage} />
                       )}
                       <Typography
                          className={styles.locationName}
                          style={{
                             color: info.Status === 'Confirmed' ? '#43A022' : '#992D0D',
                             fontWeight: '600',
                          }}
                       >
                          Status : {info.Status}
                       </Typography>
                    </Box>
                 </Box>

                 <Box className={styles.dateTimeButton}>
                    <Box sx={{ width: '170px' }}>
                     {/* {BasicTimeDatePicker()} */}
                     <Typography>{info.Date}</Typography>
                     </Box>
                    <Button className={styles.bookButtonStyels}>Pooja List</Button>
                 </Box>
              </Box>
           ))}
            </div>
            
         </Box>
      );
   };
   const renderEmptyData = () => {
      return (
         <>
            <Box className={styles.headButton}>
               <Typography className={styles.heading}>Booked Pooja</Typography>
            </Box>
            <EmptyPage
               imgUrl="/images/EmptyBookPooja.svg"
               subComponent={<CommonButton>Book Pooja</CommonButton>}
               typographyText="No Pooja Booked"
            />
         </>
      );
   };

   return (
      <Card className={styles.bookedPoojaLayout}>
         {bookedPoojaList.length === 0 ? <>{renderEmptyData()}</> : <>{renderWithData()}</>}
      </Card>
   );
};

export default BookedPooja;
