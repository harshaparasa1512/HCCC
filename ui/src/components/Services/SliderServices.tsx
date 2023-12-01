import type React from 'react';
import { useState } from 'react';
import { Box, Card, IconButton, Typography, styled } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from './SliderServices.module.scss';
import { CommonButton } from 'components/common/StyledComponents/StyledFields';

const data = [
   {
      id: 1,
      category: 'Pooja Booking',
      img: '/images/PoojaBooking.svg',
      bookButton: 'Book',
   },
   {
      id: 2,
      category: 'Annadana Donation',
      img: '/images/Annadanam.svg',
      bookButton: 'Donate',
   },
   {
      id: 3,
      category: 'Events Booking',
      img: '/images/EventBooking.svg',
      bookButton: 'Book',
   },
   {
      id: 4,
      category: 'Event Booking ',
      img: '/images/PoojaBooking.svg',
      bookButton: 'Book',
   },
   {
      id: 5,
      category: 'Pooja Booking',
      img: '/images/Annadanam.svg',
      bookButton: 'Book',
   },
   {
      id: 6,
      category: 'Annadana Donation',
      img: '/images/EventBooking.svg',
      bookButton: 'Donate',
   },
   {
      id: 7,
      category: 'Event Booking ',
      img: '/images/PoojaBooking.svg',
      bookButton: 'Book',
   },
   {
      id: 8,
      category: 'Pooja Booking',
      img: '/images/Annadanam.svg',
      bookButton: 'Book',
   },
   {
      id: 9,
      category: 'Annadana Donation',
      img: '/images/EventBooking.svg',
      bookButton: 'Donate',
   },
   {
      id: 10,
      category: 'Event Booking',
      img: '/images/PoojaBooking.svg',
      bookButton: 'Book',
   },
];

interface SliderServicesProps {
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledIconsButton = styled(IconButton)`
   box-shadow:
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
   padding: 4px;
`;

const SliderServices = (props: SliderServicesProps): JSX.Element => {
   const [currentIndex, setCurrentIndex] = useState(0);

   const previousSlide = (): any => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
   };

   const nextSlide = (): any => {
      setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
   };

   let visibleData: any[] = [];
   if (data.length - 1 - currentIndex >= 2) {
      visibleData = data.slice(currentIndex, currentIndex + 3);
   }
   if (data.length - 1 - currentIndex === 1) {
      visibleData = [...data.slice(currentIndex, data.length), ...data.slice(0, 1)];
   }
   if (data.length - 1 - currentIndex === 0) {
      visibleData = [...data.slice(currentIndex, data.length), ...data.slice(0, 2)];
   }

   const handleClick = (buttonType:string) => {
      if (buttonType.toLowerCase() === 'donate') {
         props.setIsOpen(true);
      }
      // props.setIsOpen(true);
   };

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '327px' }}>
         <Typography
            sx={{
               color: '#313131',
               fontFamily: 'Lato',
               fontSize: '32px',
               fontStyle: 'normal',
               fontWeight: 700,
               lineHeight: '140%',
            }}
         >
            Services
         </Typography>
         <Box className={styles.conatainer}>
            <StyledIconsButton className={styles.carouselButton} onClick={previousSlide}>
               <ChevronLeftIcon />
            </StyledIconsButton>

            <Box className={styles.carousel}>
               {visibleData.map((info, index) => (
                  <Card
                     className={`${styles.service_card} ${index === currentIndex ? 'active' : ''}`}
                     key={info.id}
                  >
                     <Box className={styles.Image}>
                        <img src={info.img} />
                     </Box>
                     <Box className={styles.titleButton}>
                        <Typography className={styles.headingStyles}>{info.category}</Typography>
                        <CommonButton onClick={() => { handleClick(info.bookButton); }} className={styles.buttonStyles}>
                           {info.bookButton}
                        </CommonButton>
                     </Box>
                  </Card>
               ))}
            </Box>

            <StyledIconsButton className={styles.carouselButton} onClick={nextSlide}>
               <ChevronRightIcon />
            </StyledIconsButton>
         </Box>
      </Box>
   );
};

export default SliderServices;
