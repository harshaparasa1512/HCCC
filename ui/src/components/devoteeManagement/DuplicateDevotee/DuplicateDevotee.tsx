import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { CommonButton } from 'components/common/StyledComponents/StyledFields';
import React from 'react';
import styles from './DuplicateDevotee.module.scss';

const DuplicateDevotee = (): JSX.Element => {
   const radioButtons = (): React.ReactElement => {
      return (
         <RadioGroup sx={{marginBottom:"16px"}}>
            <FormControlLabel 
               value="fnln"
               control={
                  <Radio
                     sx={{
                        '& .MuiSvgIcon-root': { fontSize: 24, fill: '#f05802' },
                        color: '#F05802',
                     }}
                  />
               }
               label="First Name + Last Name"
            />
            <FormControlLabel
               value="fnlnph"
               control={
                  <Radio
                     sx={{
                        '& .MuiSvgIcon-root': { fontSize: 24, fill: '#f05802' },
                        color: '#F05802',
                     }}
                  />
               }
               label="First Name + Last Name + Phone Number"
            />
            <FormControlLabel
               value="fnlne"
               control={
                  <Radio
                     sx={{
                        '& .MuiSvgIcon-root': { fontSize: 24, fill: '#f05802' },
                        color: '#F05802',
                        fill: '#f05802',
                     }}
                  />
               }
               label="First Name + Last Name + Email"
            />
            <FormControlLabel
               value="fnlna"
               control={
                  <Radio
                     sx={{
                        '& .MuiSvgIcon-root': { fontSize: 24, fill: '#f05802' },
                        color: '#F05802',
                        fill: '#f05802',
                     }}
                  />
               }
               label="First Name + Last Name + Address"
            />
         </RadioGroup>
      );
   };
   return (
      <Box className={styles.totalLayout}>
       
         <Typography className={styles.SubHeading}>Duplicate Devotee</Typography>
         <Box className={styles.formLayout}>
            {radioButtons()}
         </Box>
         <Box sx={{ marginTop: '24px' }}>
            <CommonButton>Search</CommonButton>
         </Box>
      </Box>
   );
};

export default DuplicateDevotee;
