import React from 'react';
import styles from './modeOfPayment.module.scss';
import {
   Typography,
   Box,
   Card
} from '@mui/material';

const ModeofPayment = () => {
   return (
      <Box sx={{marginTop:"15px"}}>
         <Typography className={styles.paymentheading}>Mode of Payment</Typography>
         <Box className={styles.paymentImages}>
            <Card className={styles.paymentImagesStyles}>
               <Box sx={{ margin: '16px 0px 0px 10px' }}>
                  <img src="/images/PayPal.svg" />
               </Box>
            </Card>
            <Card className={styles.paymentImagesStyles}>
               <Box sx={{ margin: '5px 0px 0px 15px' }}>
                  <img src="/images/GPay.svg" />
               </Box>
            </Card>
            <Card className={styles.paymentImagesStyles}>
               <Box sx={{ margin: '10px 0px 0px 10px' }}>
                  <img src="/images/ApplePay.svg" />
               </Box>
            </Card>

            <Card className={styles.paymentImagesStyles}>
               <Box sx={{ margin: '16px 0px 0px 8px' }}>
                  <img src="/images/Venmo.svg"/>
               </Box>
            </Card>
            <Card className={styles.paymentImagesStyles}>
               <Box sx={{ margin: '10px 0px 0px 20px' }}>
                  <img src="/images/Zelle.svg" />
               </Box>
            </Card>
            <Card className={styles.paymentImagesStyles}>
               <Box sx={{ margin: '11px 0px 0px 15px' }}>
                  <img src="/images/CreditCard.svg"/>
               </Box>
            </Card>
         </Box>
         <Box sx={{ marginTop: "4px" }}>
            <Box className={styles.paymentImages}>
               <Card className={styles.paymentImagesStyles}>
                  <Box sx={{ margin: '13px 0px 0px 20px' }}>
                     <img src="/images/coins.png" />
                     <Typography className={styles.typoGraphy}>Coins</Typography>
                  </Box>
               </Card>
               <Card className={styles.paymentImagesStyles}>
                  <Box sx={{ margin: '10px 0px 0px 20px' }}>
                     <img src="/images/cash.png" />
                     <Typography className={styles.typoGraphy}>Cash</Typography>
                  </Box>
               </Card>
               <Card className={styles.paymentImagesStyles}>
                  <Box sx={{ margin: '6px 0px 0px 18px' }}>
                     <img src="/images/check.png" />
                     <Typography className={styles.typoGraphy}>Check</Typography>
                  </Box>

               </Card>
               <Card className={styles.paymentImagesStyles}>
                  <Box sx={{ margin: '0px 0px 0px 20px' }}>
                     <img src="/images/directDeposit.png" />
                     <Typography className={styles.typoGraphy}>Direct Deposit</Typography>
                  </Box>

               </Card>
               <Card className={styles.paymentImagesStyles}>
                  <Box sx={{ margin: '0px 0px 15px 20px' }}>
                     <div style={{ width: "26px", height: "26px" }}>
                        <img src="/images/manualrecepi.svg" />
                     </div>
                     <Typography className={styles.typoGraphy}>Manual Receipt</Typography>
                  </Box>

               </Card>
               <Card className={styles.paymentImagesStyles}>
                  <Box sx={{ margin: '15px 0px 0px 20px' }}>
                     <img src="/images/Stock.svg" />
                     <Typography className={styles.typoGraphy} sx={{ color: "#003087" }}>Stock</Typography>
                  </Box>

               </Card>
            </Box>
         </Box>
      </Box>
   );
};

export default ModeofPayment;
