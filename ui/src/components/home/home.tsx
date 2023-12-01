import Grid from '@mui/material/Grid';
import AllEvents from 'components/devotee/dashboard/events/allEvents/allEvents';
import Carousel from 'components/common/homePage/Carousel/Carousel';
import Box from '@mui/material/Box';
import ScheduleTabs from './scheduleTabs';
import CloseIcon from '@mui/icons-material/Close';
import SliderServices from 'components/Services/SliderServices';
import Others from 'components/others/Others';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CommonDonations from 'components/devotee/donation/commonDonation/commonDonations';
import { useState, useEffect } from 'react';

export default function Home(): React.ReactElement {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const handleClose = (): void => {
      setIsOpen(false);
   };

   return (
      <>
         <Box sx={{ marginLeft: '20px', marginRight: '20px' }}>
            <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
               <Grid item xs={12} md={12}>
                  <Carousel />
               </Grid>
               <Grid item xs={12} md={12}>
                  <SliderServices setIsOpen={setIsOpen} />
               </Grid>
               <Grid item xs={12} md={12}>
                  <Grid
                     container
                     spacing={2}
                     rowSpacing={1}
                     columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                     <Grid item xs={6}>
                        <AllEvents setIsOpen={setIsOpen} />
                     </Grid>
                     <Grid item xs={5}>
                        <ScheduleTabs />
                     </Grid>
                  </Grid>
               </Grid>
               <Grid item xs={12} md={12}>
                  <Others />
               </Grid>
            </Grid>
         </Box>
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
   );
}
