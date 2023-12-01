import { Typography, styled } from '@mui/material';
import styles from './muhurtham.module.scss';
import Tooltip, { type TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { apiRequest } from 'infrastructure/backendService';
import { isEmpty, isNil } from 'lodash';

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} arrow classes={{ popper: className }} />
))(({}) => ({
   [`& .${tooltipClasses.arrow}`]: {
      color: '#22A699',
      boxShadow: 'none',
   },
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#22A699',
      fontSize: '14px',
      fontStyle: 'normal',
      fontFamily: 'Lato',
      boxShadow: 'none',
   },
}));

export default function Muhurtham(): React.ReactNode {
   const [thithi, setThithi] = useState<string | null>('');
   const [thithiTime, setThithiTime] = useState<string | null>('');
   const [thithi2, setthithi2] = useState<string | null>('');
   const [thithi2Time, setthithi2Time] = useState<string | null>('');
   const [nakshtram, setNakshtram] = useState<string | null>('');
   const [nakshtram1time, setnakshtram1time] = useState<string | null>('');
   const [nakshtram2, setnakshtram2] = useState<string | null>('');
   const [nakshtram2time, setnakshtram2time] = useState<string | null>('');
   const [rahukalam, setrahukalam] = useState<string | null>('');
   const [durmuhurtham, setdurmuhurtham] = useState<string | null>('');
   const [durmuhurtham2, setdurmuhurtham2] = useState<string | null>('');
   const [Samvatsar, setSamvatsar] = useState<string | null>('');
   const [ritu, setRitu] = useState<string | null>('');
   const [masa, setMasa] = useState<string | null>('');
   const [paksha, setPaksha] = useState<string | null>('');
   const [ayanam, setAyanam] = useState<string | null>('');
   const [ayanamTime, setAyanamTime] = useState<string | null>('');

   function formatDate(): string {
      const today = new Date();
      const day = today?.getDate();
      const month = today?.getMonth() + 1;
      const year = today?.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      return `${formattedMonth}/${formattedDay}/${year}`;
   }

   useEffect(() => {
      apiRequest({
         method: 'GET',
         endpoint: '/devotee-management/panchangam',
         params: {
            scheduleDate: formatDate(),
         },
      })
         .then((res) => {
            console.log(res.data);
            const apiData = res.data;
            setThithi(apiData.thithi1);
            setThithiTime(apiData.thithi1Time);
            setdurmuhurtham(apiData.durmuhurtham1);
            setrahukalam(apiData.rahukalam);
            setthithi2(apiData.thithi2);
            setthithi2Time(apiData.thithi2Time);
            setNakshtram(apiData.nakshtram1);
            setnakshtram1time(apiData.nakshtram1time);
            setnakshtram2(apiData.nakshtram2);
            setdurmuhurtham2(apiData.durmuhurtham2);
            setSamvatsar(apiData.samvatsar);
            setRitu(apiData.ritu);
            setMasa(apiData.masa);
            setPaksha(apiData.paksha);
            setnakshtram2time(apiData.nakshtram2time);
            setAyanam(apiData.ayanam);
            setAyanamTime(apiData.ayanamtime);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [formatDate()]);
   
   return (
      <div className={styles.totalContainer}>
         <div className={styles.BoxContainer}>
            {!isEmpty(Samvatsar) && !isNil(Samvatsar) ? (
               <Typography className={styles.head}>
                  Samvatsar<span className={styles.subHead}> : {Samvatsar}</span>
               </Typography>
            ) : (
               <></>
            )}
            {!isEmpty(ritu) && !isNil(ritu) ? (
               <Typography className={styles.head}>
                  Ritu<span className={styles.subHead}> : {ritu}</span>
               </Typography>
            ) : (
               <></>
            )}
            {!isEmpty(masa) && !isNil(masa) ? (
               <Typography className={styles.head}>
                  Masa<span className={styles.subHead}> : {masa}</span>
               </Typography>
            ) : (
               <></>
            )}
            {!isEmpty(paksha) && !isNil(paksha) ? (
               <Typography className={styles.head}>
                  Paksha<span className={styles.subHead}> : {paksha}</span>
               </Typography>
            ) : (
               <></>
            )}

            {!isEmpty(thithi) && !isNil(thithi) ? (
               <CustomTooltip
                  className={styles.arrowTooltip}
                  title={
                     !isEmpty(thithiTime) && !isNil(thithiTime) ? (
                        <Typography>
                           {' '}
                           <b>End Time: Thithi : </b> {thithiTime}
                        </Typography>
                     ) : (
                        <></>
                     )
                  }
               >
                  <Typography className={styles.head}>
                     Thithi<span className={styles.subHead}> : {thithi}</span>
                  </Typography>
               </CustomTooltip>
            ) : (
               <></>
            )}

            {!isEmpty(thithi2) && !isNil(thithi2) ? (
               <CustomTooltip
                  className={styles.arrowTooltip}
                  title={
                     !isEmpty(thithi2Time) || !isNil(thithi2Time) ? (
                        <Typography>
                           {' '}
                           <b>End Time: Thithi : </b> {thithi2Time}
                        </Typography>
                     ) : (
                        <></>
                     )
                  }
               >
                  <Typography className={styles.head}>
                     Thithi<span className={styles.subHead}> : {thithi2}</span>
                  </Typography>
               </CustomTooltip>
            ) : (
               <></>
            )}

            {!isEmpty(ayanam) && !isNil(ayanam) ? (
               <CustomTooltip
                  title={
                     <Typography>
                        {' '}
                        <b>End Time: Ayanam : </b>
                        {ayanamTime}
                     </Typography>
                  }
               >
                  <Typography className={styles.head}>
                     Ayanam<span className={styles.subHead}> : {ayanam}</span>
                  </Typography>
               </CustomTooltip>
            ) : (
               <></>
            )}

            {!isEmpty(nakshtram) && !isNil(nakshtram) ? (
               <CustomTooltip
                  title={
                     !isEmpty(nakshtram1time) && !isNil(nakshtram1time) ? (
                        <Typography>
                           {' '}
                           <b>End Time: Nakshtram : </b> {nakshtram1time}
                        </Typography>
                     ) : (
                        <></>
                     )
                  }
               >
                  <Typography className={styles.head}>
                     Nakshatram <span className={styles.subHead}> : {nakshtram}</span>
                  </Typography>
               </CustomTooltip>
            ) : (
               <></>
            )}

            {!isEmpty(nakshtram2) && !isNil(nakshtram2) ? (
               <CustomTooltip
                  title={
                     !isEmpty(nakshtram2time) && !isNil(nakshtram2time) ? (
                        <Typography>
                           {' '}
                           <b>End Time: Nakshtram : </b> {nakshtram2time}
                        </Typography>
                     ) : (
                        <></>
                     )
                  }
               >
                  <Typography className={styles.head}>
                     Nakshatram <span className={styles.subHead}> : {nakshtram2}</span>
                  </Typography>
               </CustomTooltip>
            ) : (
               <></>
            )}

            {!isEmpty(rahukalam) && !isNil(rahukalam) ? (
               <CustomTooltip
                  title={
                     <Typography>
                        {' '}
                        <b>End Time: Rahukalam : </b>
                        {rahukalam}
                     </Typography>
                  }
               >
                  <Typography className={styles.head}>
                     Rahukalam <span className={styles.subHead}> : {rahukalam}</span>
                  </Typography>
               </CustomTooltip>
            ) : (
               <></>
            )}

            {!isEmpty(durmuhurtham) && !isNil(durmuhurtham) ? (
               <CustomTooltip
                  title={
                     <Typography>
                        {' '}
                        <b>End Time: Durmuhurtham : </b>
                        {durmuhurtham}
                     </Typography>
                  }
               >
                  <Typography className={styles.head}>
                     Durmuhurtham <span className={styles.subHead}> : {durmuhurtham} </span>
                  </Typography>
               </CustomTooltip>
            ) : (
               <></>
            )}
            {!isEmpty(durmuhurtham2) && !isNil(durmuhurtham2) ? (
               <CustomTooltip
                  title={
                     <Typography>
                        {' '}
                        <b>End Time: Durmuhurtham : </b>
                        {durmuhurtham2}
                     </Typography>
                  }
               >
                  <Typography className={styles.head}>
                     Durmuhurtham <span className={styles.subHead}> : {durmuhurtham2} </span>
                  </Typography>
               </CustomTooltip>
            ) : (
               <></>
            )}
         </div>
      </div>
   );
}
