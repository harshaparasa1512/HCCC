import { Box, Grid, TextareaAutosize, Typography } from '@mui/material';
import styles from './AddVastraTypeTable.module.scss';
import {
   CustomInputLabel,
   CustomTextFeild,
   CommonButton,
   CustomDeleteIcon,
} from 'components/common/StyledComponents/StyledFields';
import { useRef, useState } from 'react';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';

const AddVastraTypeTable = (): JSX.Element => {
   const tableRef = useRef(null);
   const VastraPurposeDetails = [
      {
         Name: 'Shirt Hints 2',
         Description: 'Hints 2 test',
         Amount: 100,
         Action: <CustomDeleteIcon />,
      },
   ];
   const [formData, setFormData] = useState({
      name: '',
      description: '',
      amount: '',
   });

   const handleFieldChange = (field: any, value: any): any => {
      setFormData({
         ...formData,
         [field]: value,
      });
   };

   const VastraTypeTablePage = () => {
      return (
         <>
            <Typography className={styles.SubHeading}>Add Vastra Types</Typography>
            <Box className={styles.tableContainer}>
               <GridTableComponent tableData={VastraPurposeDetails} tableRef={tableRef} />
            </Box>
         </>
      );
   };
   const AddVastraPageForm = (): JSX.Element => {
      return (
         <>
            <Typography className={styles.formName}>Add Vastra</Typography>
            <Grid className={styles.formLayout}>
               <Grid container spacing={2} sx={{ marginBottom: '16px', width: '858px' }}>
                  <Grid xs={12} sm={6} item>
                     <CustomInputLabel>Name</CustomInputLabel>
                     <CustomTextFeild
                        fullWidth
                        required
                        value={formData.name}
                        onChange={(e) => {
                           handleFieldChange('name', e.target.value);
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

               <Grid xs={12} sm={6} item>
                  <CustomInputLabel sx={{ paddingTop: '22px' }}>Amount</CustomInputLabel>
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
         {VastraTypeTablePage()}
         {AddVastraPageForm()}
      </Box>
   );
};

export default AddVastraTypeTable;
