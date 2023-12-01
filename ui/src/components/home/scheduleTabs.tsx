import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './scheduleTabs.module.scss';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import TodayScheduleEvents from 'components/devotee/dashboard/events/todayScheduleEvents/todayScheduleEvents';
import SelectDate from 'components/devotee/dashboard/events/selectDateSchedule/selectDateSchedule';

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

export default function ScheduleTabs() {
   const [activeTab, setActiveTab] = useState<number>(0);
   const [date, setDate] = useState(new Date());
   const [arrowsHide, setArrowHide] = useState<boolean>(true);
   const [lefticonActive, setLeftIconActive] = useState<boolean>(false);
   const [righticonActive, setRightIconActive] = useState<boolean>(true);

   const handleTabClick = (tabIndex: number, toogle: boolean) => {
      setActiveTab(tabIndex);
      setArrowHide(toogle);
   };

   const handleDateChange = (increment: number) => {
      const today = new Date();
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + increment);

      // Calculate the date that is 7 days from today
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 7);

      if (newDate <= today) {
         // The new date is before or equal to today
         setDate(today);
         setLeftIconActive(false); // Disable the previous button
      } else if (newDate > maxDate) {
         // The new date is beyond 7 days from today
         setDate(maxDate);
         setRightIconActive(false); // Disable the next button
      } else {
         setDate(newDate);
         setLeftIconActive(true); // Enable the previous button
         setRightIconActive(true); // Enable the next button
      }
   };

   function CustomTabPanel(props: TabPanelProps) {
      const { children, value, index, ...other } = props;

      return (
         <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
         >
            {value === index && (
               <Box sx={{ padding:"10px" }}>
                  <Typography>{children}</Typography>
               </Box>
            )}
         </div>
      );
   }

   return (
      <Box
         sx={{
            width: '525px',
            boxShadow: '0px 2px 20px 0px rgba(237, 237, 237, 0.80)',
            padding: '21px 0px 0px 19px',
            height: '802px',
            margin: '70px 0 0 30px',
            // maxWidth:'524px'
         }}
      >
         <Box>
            <div className={styles.tabs}>
               <div onClick={() => handleTabClick(0, true)}>
                  {arrowsHide ? (
                     <ChevronLeftIcon
                        className={
                           lefticonActive
                              ? `${styles.icon} ${styles.active}`
                              : `${styles.icon} ${styles.disable}`
                        }
                        onClick={() => handleDateChange(-1)}
                     />
                  ) : (
                     ''
                  )}
                  <div className={`${styles.tab} ${activeTab === 0 ? `${styles.active}` : ''}`}>
                     {' '}
                     Today Schedule
                  </div>
                  {arrowsHide ? (
                     <ChevronRightIcon
                        className={
                           righticonActive
                              ? `${styles.icon} ${styles.active}`
                              : `${styles.icon} ${styles.disable}`
                        }
                        onClick={() => handleDateChange(1)}
                     />
                  ) : (
                     ''
                  )}
               </div>
               <div
                  className={`${styles.tab} ${activeTab === 1 ? `${styles.active}` : ''}`}
                  onClick={() => handleTabClick(1, false)}
               >
                  Selected Date
               </div>
            </div>
            <Divider
               sx={{
                  // width: '630px',
                  background: '#F2BE224A',
                  height: '1px',
                  marginLeft: '-20px',
               }}
            />
         </Box>

         <CustomTabPanel value={activeTab} index={0}>
            <TodayScheduleEvents date={date} />
         </CustomTabPanel>
         <CustomTabPanel value={activeTab} index={1}>
            <SelectDate />
         </CustomTabPanel>
      </Box>
   );
}
