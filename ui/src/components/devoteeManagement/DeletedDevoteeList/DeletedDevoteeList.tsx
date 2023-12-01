import styles from './DeletedDevoteeList.module.scss';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const DeletedDevoteeData = [
   {
      name: 'Teena Joy',
   },
   {
      name: 'Kiran Kumar',
   },
   {
      name: 'Ajay Dev',
   },
];

const DeletedDevoteeList = (): JSX.Element => {
   return (
      <Box className={styles.totalLayout}>
         <Typography className={styles.SubHeading}>Deleted Devotee List</Typography>
         <Box className={styles.tableHeading}>
            <Typography className={styles.NameAction}>Name</Typography>
            <Typography className={styles.NameAction}>Actions</Typography>
         </Box>
         {DeletedDevoteeData.map((item, index) => (
            <Box
               key={index}
               className={styles.singleRow}
               style={{
                  backgroundColor: index % 2 === 0 ? '#FFF9E4' : '#fff',
               }}
            >
               <Typography className={styles.nameStyles}>{item.name}</Typography>
               <Box className={styles.restoreDeleteButtons}>
                  <Box sx={{ display: 'flex', gap:"8px" }}>
                     <img src="/images/restore.svg" className={styles.Image}/>
                     <Typography className={styles.Restore}>Restore</Typography>
                  </Box>
                  <Box sx={{ display: 'flex',gap:"8px" }}>
                     {/* <img src={DeleteIcon} /> */}
                     <DeleteIcon className={styles.DeleteIcon}/>
                     <Typography className={styles.Restore}>Delete</Typography>
                  </Box>
               </Box>
            </Box>
         ))}
      </Box>
   );
};

export default DeletedDevoteeList;
