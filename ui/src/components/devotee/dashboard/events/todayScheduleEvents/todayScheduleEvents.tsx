import React from 'react';
import { useState, useEffect } from 'react';
import { apiRequest } from 'infrastructure/backendService';
import ScheduleEventsTemplate from './scheduleEventsTemplate';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './todayScheduleEvents.module.scss';

interface TodayeScheduleProps {
   date: Date;
}

export default function TodayScheduleEvents(props: TodayeScheduleProps): JSX.Element {
   const [todayScheduleList, setTodayScheduleList] = useState<string[] | []>([
      '09:00 AM  Temple Opens',
      '09:00 AM  Balaji Suprabatam',
      '09:00 AM  Shiva Suprabatam',
      '9:30 AM Nitya Puja for all deities ',
      '09:30 AM  Vishnu Sahasranama Archana',
      '10:00 AM  Starting of Ashtotara Archana schedule',
      '10:30 AM  Starting of Vahana Puja schedule',
      '12:00 PM  Temple Closes for afternoon break',
      '06:00 PM  Temple Opens for Evening services',
      '06:00 PM  Starting of Ashtotara Archana schedule',
      '06:00 PM  Starting of Vahana Puja schedule',
      '07:30 PM  Balaji Ekanta seva',
      '08:00 PM  Temple Closes',
   ]);

   function formatDate(date: Date): string {
      const day = date?.getDate();
      const month = date?.getMonth() + 1;
      const year = date?.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      return `${formattedMonth}/${formattedDay}/${year}`;
   }

   useEffect(() => {
      
      apiRequest({
         method: 'POST',
         endpoint: '/devotee-management/dailyTempleActivity',
         params: {
            scheduleDate: formatDate(props.date),
         },
      })
         .then((res) => {
            console.log(res.data);
            setTodayScheduleList(res.data.dailyActivities);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [props.date]);

   const calenderIcon = () => {
      return (
         <CalendarTodayOutlinedIcon
            sx={{
               color: '#22A699',
               fontSize: '16px',
               width: '24px',
               height: '24px',
               cursor: 'pointer',
            }}
         />
      );
   };

   const calenderDate = () => {
      return (
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'row',
               marginBottom: '10px',
               padding: '10px 0px 0px 0px',
            }}
         >
            {calenderIcon()}
            <Typography
               sx={{ fontSize: '16px', fontWeight: '600', marginLeft: '8px', fontStyle: 'normal' }}
            >
               {formatDate(props.date)}
            </Typography>
         </Box>
      );
   };

   return (
      <Box className={styles.TotalConatiner}>
         {calenderDate()}
         <ScheduleEventsTemplate itemList={todayScheduleList} />
      </Box>
   );
}
