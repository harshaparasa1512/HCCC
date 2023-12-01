import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import styles from './myFavorateEvents.module.scss';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import CommonDonations from 'components/devotee/donation/commonDonation/commonDonations';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import {
   LeftAndRightStyledIconsButton,
   StyledDateContainer,
   CustomDateRangePicker,
   CommonButton,
} from 'components/common/StyledComponents/StyledFields';
import { useEffect, useState } from 'react';
import EmptyPage from 'components/common/emptyPages/emptyPage';
import { apiRequest } from 'infrastructure/backendService';



const CustomizedCalendarIcon = ({ style }: { style?: React.CSSProperties }) => {
   return (
      <div style={style}>
         {/* Your icon content goes here */}
         <span role="img" aria-label="calendar">
            <CalendarTodayOutlinedIcon />
         </span>
      </div>
   );
};

export default function ActionAreaCard() {
   const [hovered, setHovered] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isViewMoreClicked, setIsViewMoreClicked] = useState<boolean>(false);
   const [viewMoreData, setViewMoreData] = useState<string | null>(null);
   const [internalScroll, setInternalScroll] = useState(false);
   const [myFavorateList, setmyFavorateList] = useState<any[]>([]);
   const cardData = [
      {
         id: 1,
         title: 'Shiva Abhishekam',
         image: '/images/LordShiva.svg',
         url:"https://www.livermoretemple.org/hints/content/html/2023/sudharshana-homam.pdf",
         description:
            'At Shiva-Vishnu Temple, we will be celebrating Devi Navarathri event from Sunday, October 15th, 2023 - Monday, October 23rd, 2023. The nine-day event will be celebrated at Goddess Kanaka Durga Prayer Hall. Navarathri represents celebration of Goddess Durga, the manifestation of Deity in the form of Shakti [Energy or Power].',
      },
      {
         id: 2,
         title: 'Venkata Abhisekham',
         image: '/images/LordVenkat.svg',
         url:"https://www.livermoretemple.org/hints/content/html/2023/sri-vishnu-pushpa-yaagam.pdf",
         description:
            'At Shiva-Vishnu Temple, we will be celebrating Devi Navarathri event from Sunday',
      },
      {
         id: 3,
         title: 'Eshwara Abhisekham',
         image: '/images/LordEshawara.svg',
         url:"https://www.livermoretemple.org/hints/content/html/2023/karthika-somavara-shiva-abhishekam.pdf",
         description:
            'At Shiva-Vishnu Temple, we will be celebrating Devi Navarathri event from Sunday',
      },
      {
         id: 4,
         title: 'Abhisekham',
         image: '/images/LordBoth.svg',
         url:"https://www.livermoretemple.org/hints/content/html/2023/ayyappa-mandala-puja.pdf?ver1",
         description:
            'Shiva Abhishekam At Shiva-Vishnu Temple, we will be celebrating Devi Navarathri event from Sunday, October 15th, 2023 - Monday, October 23rd, 2023. The nine-day event will be celebrated at Goddess Kanaka Durga Prayer Hall. Navarathri represents celebration of Goddess Durga, the manifestation of Deity in the form of Shakti [Energy or Power].',
      },
      {
         id: 5,
         title: 'Card 5',
         image: 'https://hccccars.org/images/templeFrontView.jpg',
         description: 'Description for Card 2',
         url:""
      },
      {
         id: 6,
         title: 'Card 6',
         image: 'https://hccccars.org/images/templeFrontView.jpg',
         description: 'Description for Card 2',
         url:""
      },
      {
         id: 7,
         title: 'Card 7',
         image: 'https://hccccars.org/images/templeFrontView.jpg',
         description:
            'At Shiva-Vishnu Temple, we will be celebrating Devi Navarathri event from Sunday',
            url:""
      },
      {
         id: 8,
         title: 'Card 8',
         image: 'https://hccccars.org/images/templeFrontView.jpg',
         description:
            'At Shiva-Vishnu Temple, we will be celebrating Devi Navarathri event from Sunday',
            url:""
      },
      // Add more card data as needed
   ];

   useEffect(()=>{
      apiRequest({
         method:'GET',
         endpoint:'',
      })
      .then((res)=>{
         console.log(res.data);
         setmyFavorateList(res.data);
      })
      .catch((err)=>{
         console.log(err);
         setmyFavorateList(cardData); // comment this line after getting response 200 from the server
      })
   },[])

   const handleMouseEnter = (cardId: any) => {
      console.log(
         'currentIndex',
         currentIndex,
         'CardId / HoveredCard',
         cardId,
         'currentIndex + 4 = ',
         currentIndex + 4,
      );
      setHovered(cardId);
   };

   const handleMouseLeave = () => {
      setHovered(null);
   };

   const handleDonate = (cardId: any) => {
      console.log('Donatee......');
      setIsOpen(true);
   };

   const previousSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 4 < 0 ? 0 : prevIndex - 4));
   };

   const nextSlide = () => {
      setCurrentIndex((prevIndex) => {
         const nextIndex = prevIndex + 4;
         if (nextIndex >= cardData.length) {
            return prevIndex;
         }
         return nextIndex;
      });
   };

   let visibleData = cardData.slice(currentIndex, currentIndex + 4);

   const handleClose = (): void => {
      setIsOpen(false);
   };

   const BasicDateRangePicker = (): React.ReactElement => {
      return (
         <StyledDateContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer components={['DateRangePicker']}>
                  <CustomDateRangePicker
                     slots={{ field: SingleInputDateRangeField }}
                     format="D/MM/YYYY"
                     sx={{ fontSize: '16px', lineHeight: '140%' }}
                     slotProps={{
                        textField: {
                           InputProps: {
                              startAdornment: (
                                 <CustomizedCalendarIcon
                                    style={{
                                       color: '#22A699',
                                       height: '23px',
                                       width: '23px',
                                       marginRight: '10px',
                                    }}
                                 />
                              ),
                           },
                        },
                     }}
                  />
               </DemoContainer>
            </LocalizationProvider>
         </StyledDateContainer>
      );
   };



   const handleViewMore = (url: string | undefined) => {
      window.open(url, '_blank');
   };


   const renderWithData = () => {
      return (
         <>
         <div className={styles.main}>
            <LeftAndRightStyledIconsButton
               className={styles.carouselButton}
               onClick={previousSlide}
            >
               <ChevronLeftIcon />
            </LeftAndRightStyledIconsButton>
            <div
               className={styles.imageContainer}
               // style={{ overflowY: isViewMoreClicked ? 'auto' : 'hidden' }}
            >
               {visibleData.map((card) => (
                  <div
                     key={card.id}
                     className={styles.Card_N_Image}
                     onMouseEnter={() => {
                        handleMouseEnter(card.id);
                     }}
                     onMouseLeave={handleMouseLeave}
                  >
                     <div style={{ display: 'flex', gap: '90px', height: '240px', width: '240px' }}>
                        <img className={styles.image} src={card.image} alt={card.title} />
                     </div>
                     {/* {card.id === hovered ? renderCardContent(card) : ''} */}
                     {card.id === hovered && (
                        <div
                           className={
                              hovered === currentIndex + 3 ||
                              hovered === currentIndex + 4 ||
                              cardData.length === hovered
                                 ? styles.ImgBgHoveredLeft
                                 : styles.ImgBgHoveredRight
                           }

                           // onMouseEnter={() => { handleMouseEnter(card.id); }}
                           // onMouseLeave={handleMouseLeave}
                        ></div>
                     )}
                     {card.id === hovered && (
                        <div
                           className={
                              hovered === currentIndex + 3 ||
                              hovered === currentIndex + 4 ||
                              cardData.length === hovered
                                 ? `${styles.cardContent} ${styles.cardContentLeft}`
                                 : `${styles.cardContent} ${styles.cardContentRight}`
                           }
                        >
                           <p className={styles.title}>{card.title}</p>
                           <p className={styles.description}
                           >  {card.description}
                             
                                 <span
                                    className={styles.viewMore}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                       handleViewMore(card.url); // Assuming each card has a 'url' property
                                    }}
                                 >
                                    View More
                                 </span>
                          
                           
                           </p>
                           <div className={styles.dateAndDonateButton}>
                              {BasicDateRangePicker()}
                              <CommonButton
                                 className={styles.button}
                                 onClick={() => {
                                    handleDonate(card.id);
                                 }}
                              >
                                 Donate
                              </CommonButton>
                           </div>
                        </div>
                     )}
                  </div>
               ))}
            </div>
            <LeftAndRightStyledIconsButton className={styles.carouselButton} onClick={nextSlide}>
               <ChevronRightIcon />
            </LeftAndRightStyledIconsButton>
         </div>
         <Dialog open={isOpen}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
         PaperProps={{
            style: {
               maxHeight: '100%',
               maxWidth: '100%',
               overflow:"hidden",
               margin: '0',
            },
         }}>
            <div style={{ backgroundColor: '#882E14', height: '50px' }}>
               <DialogTitle sx={{ fontWeight: 700, fontSize: 20, color: 'white' }}>
                  {'Donation'}
               </DialogTitle>
               <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                     position: 'absolute',
                     right: 8,
                     top: 8,
                     color: (theme: any) => theme.palette.grey[500],
                  }}
                  
               >
                  <CloseIcon sx={{ color: 'white' }} />
               </IconButton>
            </div>
            <CommonDonations />
         </Dialog>
         </>
      )
   };

   const renderEmptyData = () => {
      return (
         <>
            <EmptyPage
               imgUrl="/svg/myFavouriteEmpty.svg"
               typographyText="No Pooja booked Yet"
            />
         </>
      );
   };

   return (
      <div>
         <h3>My Favorate Events</h3>
         { myFavorateList.length === 0 ? renderEmptyData() :  renderWithData() }
      </div>
   );
}
