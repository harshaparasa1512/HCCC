import React, { useState, useEffect } from 'react';
import ScheduleEventsTemplate from '../todayScheduleEvents/scheduleEventsTemplate';
import styles from './selectDate.module.scss';
import Calendar from './calenderComponent';
import { apiRequest } from 'infrastructure/backendService';

const SelectDate = () => {
   const currentDate = new Date();
   const [selectedDate, setSelectedDate] = useState(formatDate(currentDate));
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

   useEffect(() => {
      apiRequest({
         method: 'POST',
         endpoint: '/devotee-management/dailyTempleActivity',
         params: {
            scheduleDate: selectedDate,
         },
      })
         .then((res) => {
            console.log(res.data);
            setTodayScheduleList(res.data.dailyActivities);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [selectedDate]);

   function formatDate(date: Date): string {
      const day = date?.getDate();
      const month = date?.getMonth() + 1;
      const year = date?.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      return `${formattedMonth}/${formattedDay}/${year}`;
   }

   const render = (): React.ReactElement => {
      return (
         <div className={styles.mainContainer}>
            <Calendar setSelectedDate={setSelectedDate} />
            <ScheduleEventsTemplate itemList={todayScheduleList} />
         </div>
      );
   };
   return <>{render()}</>;
};

export default SelectDate;
