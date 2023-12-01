import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './meetingMinutes.module.scss';
import { MeetingMinutesProps } from 'infrastructure/GlobalContextProvider';
import { apiRequest, checkAuthToken, getaccessToken } from 'infrastructure/backendService';
import { useNavigate } from 'react-router-dom';

const MeetingMinutes = () => {
   const [momList, setMomList] = useState<MeetingMinutesProps[]>([
      {
         'Meeting Date': '10/4/2023',
         'View Docunment': 'HCCC_Bod_Meeting Minutes_03-31-2023',
         'File Size': '290.42 KB',
         'Uploaded On': '4/24/2023 11:14',
         'File Url': 'url',
      },
      {
         'Meeting Date': '10/4/2023',
         'View Docunment': 'HCCC_Bod_Meeting Minutes_03-31-2023',
         'File Size': '290.42 KB',
         'Uploaded On': '4/24/2023 11:14',
         'File Url': '',
      },
      {
         'Meeting Date': '10/4/2023',
         'View Docunment': 'HCCC_Bod_Meeting Minutes_03-31-2023',
         'File Size': '290.42 KB',
         'Uploaded On': '4/24/2023 11:14',
         'File Url': '',
      },
      {
         'Meeting Date': '10/4/2023',
         'View Docunment': 'HCCC_Bod_Meeting Minutes_03-31-2023',
         'File Size': '290.42 KB',
         'Uploaded On': '4/24/2023 11:14',
         'File Url': '',
      },
      {
         'Meeting Date': '10/4/2023',
         'View Docunment': 'HCCC_Bod_Meeting Minutes_03-31-2023',
         'File Size': '290.42 KB',
         'Uploaded On': '4/24/2023 11:14',
         'File Url': '',
      },
      {
         'Meeting Date': '10/4/2023',
         'View Docunment': 'HCCC_Bod_Meeting Minutes_03-31-2023',
         'File Size': '290.42 KB',
         'Uploaded On': '4/24/2023 11:14',
         'File Url': '',
      },
   ]);

   const navigate = useNavigate();

   // useEffect(()=>{
   //    if(!checkAuthToken()) {
   //       navigate('/')
   //    }
   // },[getaccessToken()])

//    useEffect(() => {
//       apiRequest({
//          method: 'GET',
//          endpoint: '/',
//       })
//          .then((res) => {
//             console.log(res);
//             setMomList(res.data);
//          })
//          .catch((err) => {
//             console.log(err);
//          });
//    }, []);

   const handleFileClick = (fileUrl: string) => {
      // Implement the action you want to take when a file is clicked
      console.log(`File clicked! Opening: ${fileUrl}`);
      // You can use window.open(fileUrl) to open the URL in a new tab/window
   };

   const tableRender = () => {
      const keysToShow = Object.keys(momList[0]).filter((key) => key !== 'File Url');

      return (
         <table style={{ width: '100%' }} className={styles.tableContainer}>
            <thead>
               <tr className={styles.headerTableRow}>
                  {keysToShow.map((key: any, index: number) => (
                     <th className={styles.tableHorizontal} key={index}>
                        {key}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className={styles.tableBody}>
               {momList.map((item: any, rowIndex) => (
                  <tr key={rowIndex}>
                     {keysToShow.map((key, colIndex) => (
                        <>
                           {key === 'View Docunment' ? (
                              <td
                                 className={`${styles.tableDiagonal} ${styles.documentName}`}
                                 key={colIndex}
                                 onClick={() => handleFileClick(item['File Url'])}
                              >
                                 {item[key]}
                              </td>
                           ) : (
                              <td className={styles.tableDiagonal} key={colIndex}>
                                 {item[key]}
                              </td>
                           )}
                        </>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      );
   };
   return (
      <Box>
         <h1 className={styles.header}>Meeting Minutes</h1>
         <h3 className={styles.subHeader}>List of MOM</h3>
         {tableRender()}
      </Box>
   );
};

export default MeetingMinutes;
