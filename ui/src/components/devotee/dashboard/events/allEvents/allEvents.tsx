import { EventCardTemplate } from 'components/devotee/dashboard/events/eventCardTemplate/EventCardTemplate';
import EmptyPage from 'components/common/emptyPages/emptyPage';
import poojaBooking from 'assets/PoojaBooking.svg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from './allEvents.module.scss';
import { apiRequest } from 'infrastructure/backendService';
import React, { useState, useEffect } from 'react';
import { CommonButton } from 'components/common/StyledComponents/StyledFields';
import { Box } from '@mui/material';

interface buttonTypeListProps {
   label: string;
   onClickFunction: () => void;
   uniqueLabel: string;
}
interface AllEventsProps {
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AllEvents(props: AllEventsProps): JSX.Element {
   const [upcomingSelectButtonName, setUpcomingSelectButtonName] = useState<string>('All_U');
   const [specialselectButtonName, setSpecialselectButtonName] = useState<string>('All_S');
   const [specialEventsList, setSpecialEventsList] = useState([]);
   const [upComingEventsList, setUpComingEventsList] = useState([]);
   const [visibleUpcomingButtons, setVisibleUpcomingButtons] = useState(4); // Number of visible buttons at a time
   const [upcomingButtonsOffset, setUpcomingButtonsOffset] = useState(0);

   useEffect(() => {
      // getUpComingEvents();
      console.log('getUpComingEvents called useEffect');
   }, [upcomingSelectButtonName]);

   useEffect(() => {
      // getSpecialEvents();
      console.log('getSpecialEvents called useEffect');
   }, [specialselectButtonName]);

   const getSpecialEvents = (): void => {
      apiRequest({
         method: 'GET',
         endpoint: '',
      })
         .then((res) => {
            console.log(res);
            setSpecialEventsList(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const getUpComingEvents = (): void => {
      apiRequest({
         method: 'GET',
         endpoint: '',
      })
         .then((res) => {
            console.log(res);
            setUpComingEventsList(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const SpecialEventsInfo: any = [
      {
         name: 'Karwa Chowth Puja / Katha',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: 'images/KarwaChouthPooja.svg',
      },
      {
         name: 'Diwali Mela',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: 'images/DiwaliMela.svg',
      },
      {
         name: 'Vastra Samarpanas',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: './images/vastra.png',
      },
      {
         name: 'Toy Drive',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: './images/toy.jpg',
      },
      {
         name: 'Free Health Advisory Services',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: './images/medical.jpg',
      },
      {
         name: 'Weekly in person Yoga Classes',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: './images/yoga.jpg',
      },
      {
         name: 'Pushpanjali',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: './images/flowers.jpg',
      },
   ];

   const UpcomingEventsInfo: any = [
      {
         name: 'Mahalakshmi Yaagam',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: '/images/MahalaxmiYagam.svg',
      },
      {
         name: 'Deepavali Celebrations Dhanalakshmi Puja',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: '/images/DiwaliDhanalaxmiPooja.svg',
      },
      {
         name: 'Deepavali Celebrations Lakshmi Kubera Puja',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: '/images/DiwaliLakshmiPooja.svg',
      },
      {
         name: 'Naga Chaturthi',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: '/images/NagaChaturdhi.svg',
      },
      {
         name: 'Toy Drive',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: './images/toy.jpg',
      },

      {
         name: 'Weekly in person Yoga Classes',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: './images/yoga.jpg',
      },
      {
         name: 'Pushpanjali',
         FromToDate: '15/10/23 - 22/10/23',
         imgUrl: './images/flowers.jpg',
      },
   ];

   const buttonOnClick = (
      parameter: string,
      uniqueLabel: string,
      setselectButtonName: React.Dispatch<React.SetStateAction<string>>,
   ): void => {
      console.log(parameter);
      setselectButtonName(uniqueLabel);
   };

   const UpcomingEventsTypeButtons: buttonTypeListProps[] = [
      {
         label: 'All',
         onClickFunction: () => {
            buttonOnClick('All', 'All_U', setUpcomingSelectButtonName);
         },
         uniqueLabel: 'All_U',
      },
      {
         label: 'Religious',
         onClickFunction: () => {
            buttonOnClick('Religious', 'Religious_U', setUpcomingSelectButtonName);
         },
         uniqueLabel: 'Religious_U',
      },
      {
         label: 'Human Services',
         onClickFunction: () => {
            buttonOnClick('Human Services', 'Human_Services_U', setUpcomingSelectButtonName);
         },
         uniqueLabel: 'Human_Services_U',
      },
      {
         label: 'Young Adults',
         onClickFunction: () => {
            buttonOnClick('Young Adults', 'Young_Adults_U', setUpcomingSelectButtonName);
         },
         uniqueLabel: 'Young_Adults_U',
      },
      {
         label: 'Youth and Education',
         onClickFunction: () => {
            buttonOnClick('Youth and Education', 'Youth_Education_U', setUpcomingSelectButtonName);
         },
         uniqueLabel: 'Youth_Education_U',
      },
      {
         label: 'Human Services',
         onClickFunction: () => {
            buttonOnClick('Human Services', 'Human_Services_U', setUpcomingSelectButtonName);
         },
         uniqueLabel: 'Human_Services_U',
      },
      {
         label: 'Administrative',
         onClickFunction: () => {
            buttonOnClick('Administrative', 'Administrative_U', setUpcomingSelectButtonName);
         },
         uniqueLabel: 'Administrative_U',
      },
   ];

   const SpecialEventsTypeButtons: buttonTypeListProps[] = [
      {
         label: 'All',
         onClickFunction: () => {
            buttonOnClick('All', 'All_S', setSpecialselectButtonName);
         },
         uniqueLabel: 'All_S',
      },
      {
         label: 'Religious',
         onClickFunction: () => {
            buttonOnClick('Religious', 'Religious_S', setSpecialselectButtonName);
         },
         uniqueLabel: 'Religious_S',
      },
   ];

   const handleShowForm = (): void => {
      console.log('but...............');
      apiRequest({ method: 'GET', endpoint: '/' })
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   const handleNextUpcomingButtons = (): void => {
      const totalButtons = UpcomingEventsTypeButtons.length;
      const remainingButtons = totalButtons - (upcomingButtonsOffset + visibleUpcomingButtons);
      const nextOffset = Math.min(upcomingButtonsOffset + visibleUpcomingButtons, totalButtons - 1);
      setVisibleUpcomingButtons(remainingButtons > 0 ? visibleUpcomingButtons : remainingButtons);
      setUpcomingButtonsOffset(nextOffset);
   };

   const handlePrevUpcomingButtons = (): void => {
      const nextOffset = Math.max(upcomingButtonsOffset - visibleUpcomingButtons, 0);
      setVisibleUpcomingButtons(visibleUpcomingButtons);
      setUpcomingButtonsOffset(nextOffset);
   };

   const isPrevIconDisabled = upcomingButtonsOffset === 0;
   const isNextIconDisabled =
     upcomingButtonsOffset + visibleUpcomingButtons >= UpcomingEventsTypeButtons.length;


   const emptyPageButton = (): React.ReactElement => {
      return (
         <div>
            <CommonButton className={styles.button} onClick={handleShowForm}>
               Add Events
            </CommonButton>
         </div>
      );
   };

   const buttonTypes = (
      buttonList: buttonTypeListProps[],
      selectButtonName: string,
      showArrows:boolean,
   ) => {
      return (
         <div className={styles.ButtonTypesContainer}>

           { showArrows ? <ChevronLeftIcon
              className={`${styles.icon} ${isPrevIconDisabled ? styles.disable : styles.active}`}
               onClick={() => !isPrevIconDisabled && handlePrevUpcomingButtons()}
               
            />  : ""}

            {buttonList
               .slice(upcomingButtonsOffset, upcomingButtonsOffset + visibleUpcomingButtons)
               .map((item: buttonTypeListProps, index: number) => (
                  <button
                     key={index}
                     onClick={item.onClickFunction}
                     className={
                        selectButtonName === item.uniqueLabel
                           ? `${styles.activeButton}`
                           : `${styles.buttonTypes}`
                     }
                  >
                     {item.label}
                  </button>
               ))}
            { showArrows ? <ChevronRightIcon
               className={`${styles.icon} ${isNextIconDisabled ? styles.disable :styles.active}`}
               onClick={() => !isNextIconDisabled && handleNextUpcomingButtons()}
               
            /> : ""}
         </div>
      );
   };

   const eventsTemplate = (
      eventTypeName: string,
      eventsList: any,
      buttonTypeList: buttonTypeListProps[],
      selectButtonName: string,
      showArrows:boolean,
   ): React.ReactElement => {
      return (
         <div>
            <h2>{eventTypeName}</h2>
            <div className={styles.EventsTotalLayout}>
               {buttonTypes(
                  buttonTypeList,
                  selectButtonName,
                  showArrows
               )}
               <div className={styles.allEventsContainer}>
                  <div className={styles.allEventsLayout}>
                     {eventsList.length === 0 ? (
                        <EmptyPage imgUrl={poojaBooking} subComponent={emptyPageButton()} />
                     ) : (
                        eventsList.map((info: any) => (
                           <div key={info.name} className={styles.cardInfo}>
                              <EventCardTemplate
                                 eventCardProps={{
                                    name: info.name,
                                    FromToDate: info.FromToDate,
                                    imgUrl: info.imgUrl,
                                 }}
                                 setIsOpen={props.setIsOpen}
                              />
                           </div>
                        ))
                     )}
                  </div>
               </div>
            </div>
         </div>
      );
   };

   function upcomingButtonTypes(): void {
      throw new Error('Function not implemented.');
   }

   return (
      <div>
         {eventsTemplate(
            'Special event',
            SpecialEventsInfo,
            SpecialEventsTypeButtons,
            specialselectButtonName,
            false
            
         )}
         {eventsTemplate(
            'Upcoming Events',
            UpcomingEventsInfo,
            UpcomingEventsTypeButtons,
            upcomingSelectButtonName,
            true
         )}
      </div>
   );
}
