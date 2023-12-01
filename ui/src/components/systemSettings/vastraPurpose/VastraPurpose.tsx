import { Box, Typography } from '@mui/material';
import styles from './VastraPurpose.module.scss';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useRef, useState } from 'react';
import { CommonButton, CustomDeleteIcon } from 'components/common/StyledComponents/StyledFields';
import VastraPurposeOther from './VastraPurposeOther';

const VastraPurpose = (): JSX.Element => {
   const tableRef = useRef(null);
   const [isAdding, setIsAdding] = useState(false);
   
   const handleAddNewClick = () => {
      setIsAdding((pv) => !pv);
   };

   const VastraPurposeDetails = [
      {
         'Vastra purpose ID': 'VP003',
         Name: 'Pattu Saree',
         Amount: 100,
         '': <CustomDeleteIcon />,
      },
      {
         'Vastra purpose ID': 'VP003',
         Name: 'Pattu Saree',
         Amount: 100,
         '': <CustomDeleteIcon />,
      },
      {
         'Vastra purpose ID': 'VP003',
         Name: 'Pattu Saree',
         Amount: 100,
         '': <CustomDeleteIcon />,
      },
   ];
   const VastraDetailsyPage = () => {
      return !isAdding ? (
         <>
            <Box className={styles.titleButton}>
               <Typography className={styles.SubHeading}>Vastra Purpose</Typography>
               <CommonButton onClick={handleAddNewClick}>Add New</CommonButton>
            </Box>

            <Box className={styles.tableContainer}>
               <GridTableComponent tableData={VastraPurposeDetails} tableRef={tableRef} />
            </Box>
         </>
      ) : (
         <VastraPurposeOther />
      );
   };

   return <Box className={styles.totalLayout}>{VastraDetailsyPage()}</Box>;
};

export default VastraPurpose;
