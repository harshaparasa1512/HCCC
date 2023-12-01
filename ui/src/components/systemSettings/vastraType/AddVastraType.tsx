import { Box, Typography } from '@mui/material';
import styles from './AddVastraType.module.scss';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useRef, useState } from 'react';
import { CommonButton, CustomDeleteIcon } from 'components/common/StyledComponents/StyledFields';
import AddVastraTypeTable from './AddVastraTypeTable';

const AddVastraType = (): JSX.Element => {
   const tableRef = useRef(null);
   const [isAdding, setIsAdding] = useState(false);

   const handleAddNewClick = () => {
      setIsAdding((pv) => !pv);
   };

   const VastraPurposeDetails = [
      {
         Name: 'Shirt Hints 2',
         Description: 'Hints 2 test',
         Amount: 100,
         Action: <CustomDeleteIcon />,
      },
   ];
   const VastraTypePage = (): JSX.Element => {
      return !isAdding ? (

         <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
               <Typography className={styles.SubHeading}>Add Vastra Types</Typography>
               <CommonButton onClick={handleAddNewClick}>Add New Vastra Type</CommonButton>
            </Box>
            <Box className={styles.tableContainer}>
               <GridTableComponent tableData={VastraPurposeDetails} tableRef={tableRef} />
            </Box>
         </>
      ): (
         <AddVastraTypeTable />
      )
   };

   return (
      <Box className={styles.totalLayout}>
         {VastraTypePage()}
      </Box>
   );
};

export default AddVastraType;
