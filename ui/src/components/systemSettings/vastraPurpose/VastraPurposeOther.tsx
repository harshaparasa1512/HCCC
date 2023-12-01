import { useState } from 'react';
import styles from './VastraPurposeOther.module.scss';
import { Box, FormControl, Grid, MenuItem, TextareaAutosize, Typography } from '@mui/material';
import {
   CustomInputLabel,
   CustomTextFeild,
   CommonButton,
   CustomSelect,
} from 'components/common/StyledComponents/StyledFields';

const VastraPurposeOther = (): JSX.Element => {
   const [formData, setFormData] = useState({
      id: '',
      name: '',
      amount:'',
   });

   const handleFieldChange = (field: any, value: any): any => {
      setFormData({
         ...formData,
         [field]: value,
      });
   };

   const VastraDetailsPageOther = (): JSX.Element => {
      const VastraDropdown = (): React.ReactElement => {
         return (
            <FormControl sx={{ paddingTop: '2px', width: '400px', paddingBottom: '20px' }}>
               <CustomSelect defaultValue="" id="grouped-select">
                  <MenuItem value={1}>Annadana</MenuItem>
                  <MenuItem value={2}>Pooja Booking</MenuItem>
                  <MenuItem value={3}>Navarathri</MenuItem>
                  <MenuItem value={4}>Wedding</MenuItem>
               </CustomSelect>
            </FormControl>
         );
      };
      return (
         <>
            <Typography className={styles.SubHeading}>Vastra Purpose</Typography>
            <Grid className={styles.formLayout}>
               <Grid container spacing={2} sx={{ marginBottom: '16px', width: '858px' }}>
                  <Grid xs={12} sm={6} item>
                     <CustomInputLabel>Vastra Purpose ID</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        value={formData.id}
                        onChange={(e) => {
                           handleFieldChange('id', e.target.value);
                        }}
                     />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                     <CustomInputLabel>Name</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        value={formData.name}
                        onChange={(e) => {
                           handleFieldChange('Name', e.target.value);
                        }}
                     />
                  </Grid>
               </Grid>

               <Grid container spacing={2} sx={{ width: '830px' }}>
                  <Grid xs={12} sm={6} item>
                     <CustomInputLabel>Description</CustomInputLabel>
                     <TextareaAutosize minRows={2} style={{ borderRadius: '8px', background: '#FFF9E4' }} />
                  </Grid>
               </Grid>
               <Grid sx={{marginTop:"15px"}}>
                  <CustomInputLabel>Vastra Type</CustomInputLabel>
                  {VastraDropdown()}
               </Grid>
               <Grid xs={12} sm={6} item>
                     <CustomInputLabel>Amount</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        value={formData.amount}
                        onChange={(e) => {
                           handleFieldChange('amount', e.target.value);
                        }}
                     />
                  </Grid>
            </Grid>
            <Box sx={{ marginTop: '24px' }}>
               <CommonButton>Add</CommonButton>
            </Box>
         </>
      );
   };

   return (
      <Box className={styles.totalLayout}>
         {VastraDetailsPageOther()}
      </Box>
   );
};

export default VastraPurposeOther;
