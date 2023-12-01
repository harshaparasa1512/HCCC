import React, { useState } from 'react';
import styles from './calenderComponent.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const getMonthArray = (year: number, month: number) => {
   const firstDay = new Date(year, month, 1);
   const days = daysInMonth(year, month);
   const startOffset = firstDay.getDay();

   const monthArray = [];
   let day = 1;

   for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
         if (i === 0 && j < startOffset) {
            week.push(null);
         } else if (day <= days) {
            week.push(day);
            day++;
         } else {
            week.push(null);
         }
      }
      monthArray.push(week);
   }

   return monthArray;
};

interface CalenderProps {
   setSelectedDate : (val : string) => void
}

const Calendar = (props : CalenderProps) : JSX.Element  => {
   const currentDate = new Date();
   const [year, setYear] = useState(currentDate.getFullYear());
   const [month, setMonth] = useState(currentDate.getMonth());
   const [selectedDate, setSelectedDate] = useState<number | null>(null);
   const [dateSelected, setDateSelected] = useState<string | null>(null)

   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

   const monthArray = getMonthArray(year, month);

   const goToPreviousMonth = () => {
      if (month === 0) {
         setYear(year - 1);
         setMonth(11);
      } else {
         setMonth(month - 1);
      }
   };

   const goToNextMonth = () => {
      if (month === 11) {
         setYear(year + 1);
         setMonth(0);
      } else {
         setMonth(month + 1);
      }
   };

   function formatDate(day: number, month: number, year: number): string {
     const months = month + 1;
  
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = months < 10 ? `0${months}` : months;
  
    return `${formattedMonth}/${formattedDay}/${year}`;
  }

   const handleDateClick = (day: number, month: number, year: number) => {
      setSelectedDate(day);
      console.log(day, month+1, year, 'day');
      props.setSelectedDate(formatDate(day, month, year))
   };

   return (
      <div className={styles.mainContainer}>
         <div className={styles.cardContent}>
            <div className={styles.topContainer}>
               <ChevronLeftIcon onClick={goToPreviousMonth} />
               <p className={styles.monthName}>
                  {new Date(year, month).toLocaleString('en-us', {
                     month: 'long',
                  })}
               </p>
               <ChevronRightIcon onClick={goToNextMonth} />
            </div>
            <table style={{width:"100%"}}>
               <thead>
                  <tr>
                     {daysOfWeek.map((day) => (
                        <th key={day} className={styles.days_of_week}>
                           {day}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {monthArray.map((week, index) => (
                     <tr key={index}>
                        {week.map((day, dayIndex) => (
                           <td key={dayIndex} style={{height:"20px",width:"20px",textAlign:"center"}}>
                              {day !== null ? (
                                 <div
                                    onClick={() => handleDateClick(day, month, year)}
                                    className={`
                      ${day === selectedDate ? `${styles.selected_date_circle}` : `${styles.date}`}
                      ${
                         day === currentDate.getDate() &&
                         month === currentDate.getMonth() &&
                         year === currentDate.getFullYear()
                            ? `${styles.current_date_circle}`
                            : `${styles.date}`
                      }
                    `}
                                 >
                                    {day}
                                 </div>
                              ) : null}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Calendar;
