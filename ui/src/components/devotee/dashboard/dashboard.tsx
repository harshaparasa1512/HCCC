import Grid from '@mui/material/Grid';
// import PoojaBooking from 'components/devotee/dashboard/poojaBooking/poojaBooking';
// import UserDetails from 'components/common/user/userDetails/userDetails';
// import TodayScheduleEvents from 'components/devotee/dashboard/events/todayScheduleEvents/todayScheduleEvents';
import DonationHistory from 'components/devotee/dashboard/donationHistory/donationHistory';
// import MajorEvents from './events/eventCardTemplate/MajorEvents';
import ScMember from './scMember/scMember';
import BookedPooja from './bookedPooja/bookedPooja';
import Reminders from './reminders/reminders';
import MyFavorateEvents from './events/myFavorateEvents/myFavorateEvents';
import { Box } from '@mui/material';
import TimeToDonate from './scMember/TimeToDonate';
import { useState } from 'react';
// import BirthdayAudio from 'components/common/audioComponent';

export default function Dashboard(): React.ReactElement {
   return (
      <Box sx={{margin:"20px"}}>
         <Grid container={true} spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={12} spacing={2}>
               <MyFavorateEvents />
            </Grid>
            <Grid item xs={6} md={8} spacing={2}>
               <BookedPooja />
            </Grid>
            <Grid item xs={6} md={4} spacing={2}>
               <Reminders />
            </Grid>
            <Grid item xs={6} md={8} spacing={2}>
               <DonationHistory />
            </Grid>
            <Grid item xs={6} md={4} spacing={2}>
               <TimeToDonate/>
            </Grid>
          
            <Grid item xs={12} >
               <ScMember />
            </Grid>
         </Grid>
      </Box>
   );
}
