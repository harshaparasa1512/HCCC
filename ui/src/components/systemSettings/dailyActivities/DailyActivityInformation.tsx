
import { useRef } from 'react';
import styles from './DailyActivitiesInformation.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DailyActivities from './DailyActivities';
import { Box } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';

const DailyActivityInformation = (): JSX.Element => {
   const tableRef = useRef(null);

   const DailyActivitiesDetails = [
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box  sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
      {
         No: '1',
         'Activity Name': 'Temple Open',
         'Schedule Date': '1/1/2024',
         'Schedule Time': '9:00 AM',
         Action: (
            <Box sx={{display:"flex", gap:"27px"}}>
               {' '}
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} />
            </Box>
         ),
      },
   ];

   const DailyActivitiesTable = () => {
      return (
         <Box className={styles.tableContainer}>
            <GridTableComponent tableData={DailyActivitiesDetails} tableRef={tableRef} />
         </Box>
      );
   };
   return (
      <>
         <Box >
            <DailyActivities />
         </Box>
         <Box className={styles.formLayout}>{DailyActivitiesTable()}</Box>
      </>
   );
};

export default DailyActivityInformation;
