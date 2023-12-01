import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { CommonButton } from 'components/common/StyledComponents/StyledFields';
import styles from './RestoreConsolidatedAccounts.module.scss';

const RestoreConsolidtaedData = [
   {
      name: 'Kavya',
      accounts: '9A89108B 3735474B 306FEC4B',
   },
   {
      name: 'Vijaya',
      accounts: '9A89108B 3735474B 306FEC4B',
   },
   {
      name: 'Gayatri',
      accounts: '9A89108B 3735474B 306FEC4B',
   },
   {
      name: 'Kavya',
      accounts: '9A89108B 3735474B 306FEC4B',
   },
   {
      name: 'Vijaya',
      accounts: '9A89108B 3735474B 306FEC4B',
   },
   {
      name: 'Gayatri',
      accounts: '9A89108B 3735474B 306FEC4B',
   },
   {
      name: 'Vijaya',
      accounts: '9A89108B 3735474B 306FEC4B',
   },
   {
      name: 'Kavya',
      accounts: '9A89108B 3735474B 306FEC4B',
   },
   {
      name: 'Gayatri',
      accounts: '9A89108B 3735474B 306FEC4B',
   },
];

const RestoreConsolidatedAccounts = (): JSX.Element => {
   return (
      <Box className={styles.totalLayout}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography className={styles.SubHeading}>Restore Consolidated Accounts</Typography>
            <CommonButton>Restore</CommonButton>
         </Box>
         <Box className={styles.tableHeading}>
            <Typography className={styles.NameAccount}>Name</Typography>
            <Typography className={styles.NameAccount}>Accounts</Typography>
         </Box>

         {RestoreConsolidtaedData.map((item, index) => (
            <Box
               key={index}
               className={styles.singleBox}
               style={{
                  backgroundColor: index % 2 === 0 ? '#FFF9E4' : '#fff',
               }}
            >
               <Box sx={{ display: 'flex' }} className={styles.checkName}>
                  <FormControlLabel
                     control={<Checkbox size="medium" className={styles.checkbox} />}
                     label=""
                  />
                  <Typography className={styles.NameStyles}>{item.name}</Typography>
               </Box>
               <Box>
                  <Typography className={styles.Accounts}>{item.accounts}</Typography>
               </Box>
            </Box>
         ))}
      </Box>
   );
};

export default RestoreConsolidatedAccounts;
