import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'
import styles from "./EventCard.module.scss"
import image from "../../../../assets/panoramaBigVEents.png"


const EventCard = ({data}:any) => {
  return (
    <Box className={styles.EventsLayout}>
        {data?.map((each:any,index:any) => (
            <Card
            key={index}
            className={styles.EventsDetails}
            sx={{
               padding: '12px',
               flexShrink: '0',
               boxShadow: ' none',
            }}
         >
            <Box sx={{ display: 'flex' }}>
               <img src={image} alt="panaroma" className={styles.Image} />
   
               <Box className={styles.nameDate}>
                  <Typography
                     sx={{
                        color: ' #000',
                        fontFamily: 'Inter',
                        fontSize: '16px',
                        fontStyle: ' normal',
                        fontWeight: '500',
                     }}
                  >
                     {each?.name}
                  </Typography>
                  <Typography
                     sx={{
                        color: '#373737',
                        fontFamily: 'Inter',
                        fontSize: '13px',
                        fontStyle: ' normal',
                        fontWeight: 400,
                        lineHeight: ' 140%',
                     }}
                  >
                     {each?.FromToDate}
                  </Typography>
               </Box>
            </Box>
   
            <Box sx={{ paddingBottom: '20px', paddingTop: '13px' }}>
               <Button
                  sx={{
                     display: 'inline-flex',
                     height: '32px',
                     padding: '2px 16px',
                     justifyContent: 'center',
                     alignItems: 'center',
                     color: '#FFFFFF',
                     backgroundColor: '#555555',
                     textTransform: 'capitalize',
                  }}
               >
                  Donate
               </Button>
            </Box>
         </Card>
        ))}
    </Box>
  )
}

export default EventCard
