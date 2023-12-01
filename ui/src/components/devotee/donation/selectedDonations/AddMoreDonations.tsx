import {
   RadioGroup,
   FormControlLabel,
   Radio,
   Box,
   Checkbox,
   Typography,
   Card,
} from '@mui/material';
import styles from './AddMoreDonations.module.scss';

const AddMoreDonationsList = [
   {
      id: 1,
      text: 'Abhishekam and Alamkaram on any one day',
      price: 101,
   },
   {
      id: 2,
      text: 'Annadana',
      price: 210,
   },
   {
      id: 3,
      text: 'Vastra',
      price: 169,
   },
   {
      id: 4,
      text: 'Natural Disasters',
      price: 325,
   },
   {
      id: 5,
      text: 'Priest Welfare Fund',
      price: 191,
   },
   {
      id: 6,
      text: 'Tiruppavada Seva',
      price: 100,
   },
];

const radioButtons = (): React.ReactElement => {
   return (
      <RadioGroup sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
         <FormControlLabel
            value="weekly"
            control={
               <Radio
                  sx={{
                     '& .MuiSvgIcon-root': { fontSize: 18, fill: '#f05802' },
                     color: '#F05802',
                  }}
               />
            }
            label="Weekly"
         />
         <FormControlLabel
            value="monthly"
            control={
               <Radio
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 18, fill: '#f05802' }, color: '#F05802' }}
               />
            }
            label="Monthly"
         />
         <FormControlLabel
            value="yearly"
            control={
               <Radio
                  sx={{
                     '& .MuiSvgIcon-root': { fontSize: 18, fill: '#f05802' },
                     color: '#F05802',
                     fill: '#f05802',
                  }}
               />
            }
            label="Yearly"
         />
      </RadioGroup>
   );
};

const AddMoreDonations = (): JSX.Element => {
   return (
      <Card className={styles.addMoreLayout}>
         <Typography variant="h5" className={styles.heading}>
            Select Items
         </Typography>
         {AddMoreDonationsList.map((item, index) => (
            <Box
               key={index}
               className={styles.singleBox}
               style={{
                  backgroundColor: index % 2 === 0 ? '#FFFBEF' : '#fff',
               }}
            >
               <Box sx={{ display: 'flex' }} className={styles.checkTitle}>
                  <FormControlLabel
                     control={<Checkbox size="medium" className={styles.checkbox} />}
                     label=""
                  />
                  <Box
                     sx={{ display: 'flex', flexDirection: 'column', marginLeft: '-4px' }}
                     className={styles.textradio}
                  >
                     <Typography className={styles.textStyles}>{item.text}</Typography>
                     {radioButtons()}
                  </Box>
               </Box>
               <Typography className={styles.price}>${item.price}</Typography>
            </Box>
         ))}
         <Box className={styles.total}>
            <Box sx={{ display: 'flex',gap:"12px" }}>
               <Typography className={styles.selectedStyles}>Selected</Typography>
               <Typography className={styles.selectedStyles}>$ 6440</Typography>
            </Box>
            <Box sx={{display:"flex",gap:"12px",marginRight:"43px" }}>
               <Typography className={styles.selectedStyles}>Total</Typography>
               <Typography className={styles.selectedStyles}>$ 6893</Typography>
            </Box>
         </Box>
      </Card>
   );
};

export default AddMoreDonations;
