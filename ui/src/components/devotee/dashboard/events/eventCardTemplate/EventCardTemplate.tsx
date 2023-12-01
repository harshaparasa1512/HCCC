import { Card, Box, Typography, } from '@mui/material';
import React from 'react';
import styles from './EventCardTemplate.module.scss';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { CommonButton } from 'components/common/StyledComponents/StyledFields';
import { isNil } from 'lodash';

export interface EventCardTemplateProps {
   name: string;
   FromToDate: string;
   imgUrl?: string;
}


interface CardProps{
   eventCardProps: EventCardTemplateProps;
   setIsOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined;

}

   export function EventCardTemplate(props:CardProps): JSX.Element {
      console.log(props)

      const handleClick = ():void => {
         if(!isNil(props.setIsOpen)){
            props.setIsOpen(true);
         }
        
      };

   return (
      <Card
         key={props.eventCardProps.name}
         className={styles.EventsDetails}
         sx={{
            width:"100%",
            backgroundColor: '#FFF9E4',
            boxShadow: ' none',
            display: "flex",
            justifyContent: "space-between",
            height: "88px",
            backgrounColor: '#FFF9E4',
            
         }}
      >
         <Box sx={{ display: 'flex', justifyContent:"center", alignItems : "center", }}>
            <img src={props.eventCardProps.imgUrl} alt="panaroma" className={styles.Image} />
            <Box className={styles.nameDate}>
               <Typography
                  sx={{
                     color: ' #000',
                     fontSize: '16px',
                     fontWeight: 'bold',
                     fontFamily:"Lato",
                     fontStyle:"normal",
                  }}
               >
                  {props.eventCardProps.name}
               </Typography>
               <Box sx={{display:"flex", paddingTop:"10px"}}>
                  <CalendarTodayOutlinedIcon className={styles.calenderIcon} />
                  <Typography
                     sx={{
                        color: '#373737',
                        fontSize: '13px',
                        fontWeight: 400,
                        lineHeight: ' 140%'
                     }}
                  >
                     {props.eventCardProps.FromToDate}
                  </Typography>
               </Box>
            </Box>
         </Box>

         <Box sx={{ paddingBottom: '25px', paddingTop: '25px' }}>
            <CommonButton onClick={handleClick} className={styles.donateButton}>Donate</CommonButton>
         </Box>
      </Card>
   );
}
