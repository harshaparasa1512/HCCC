/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Card, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from './scMember.module.scss';
import EmptyPage from 'components/common/emptyPages/emptyPage';
import EmptySCMember from 'assets/emptySCMember.svg';
import commonStyles from 'App.module.scss';
import {
   CommonButton,
   CustomCalendarOutlinedIcon,
   CustomLocationOutlinedIcon,
   CustomSearchFeild,
   CustomTextFeild,
} from 'components/common/StyledComponents/StyledFields';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { apiRequest, checkAuthToken, getaccessToken } from 'infrastructure/backendService';
import { useNavigate } from 'react-router-dom';

const ScMember = (): JSX.Element => {
   const [searchQuery, setSearchQuery] = useState<string>('');
   const [filteredScMemberDetails, setFilteredScMemberDetails] = useState<any[]>([]);
   const [SCmeetingList, setSCmeetingList] = useState<any[]>([
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCC_Bod_Meeting Minutes',
         'Uploaded Date': '11/11/2023',
         'File Url': 'https',
      },
   ]);

   const ScMemberDetails: any = [
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCCC_Bod_Meeting Minutes',
         'Uploaded Date': '10/11/2023',
         'File Url': 'https',
      },
      {
         'Meeting Dates': '10/11/2023',
         Document: 'HCC_Bod_Meeting Minutes',
         'Uploaded Date': '11/11/2023',
         'File Url': 'https',
      },
   ];

   const navigate = useNavigate();

   const getUserRoles = () => {
      // Replace this with your logic to get user roles
      return ['SC_MEMBER', 'DEVOTEE']; // Example roles
   };

   // useEffect(()=>{
   //    if(!checkAuthToken()) {
   //       navigate('/')
   //    }
   // },[getaccessToken()])

   // useEffect(()=>{
   //    apiRequest({
   //       method:'GET',
   //       endpoint:'/'
   //    })
   //    .then((res)=>{
   //       setSCmeetingList(res.data)
   //    })
   //    .catch((err)=>{
   //       console.log(err)
   //    })
   // },[])

   useEffect(() => {
      filterTableData();
   }, [searchQuery]);

   const userRoles = getUserRoles();

   const hasScMemberRole = userRoles.includes('SC_MEMBER');
   const hasDevoteeRole = userRoles.includes('DEVOTEE');

   const shouldShowScMember = hasScMemberRole && (hasDevoteeRole || userRoles.length === 1);

   const handleShowForm = (): void => {
      console.log('but...............');
   };

   const emptyPageButton = (): React.ReactElement => {
      return (
         <div style={{ marginTop: '14px' }}>
            <CommonButton className={commonStyles.saveButton} onClick={handleShowForm}>
               Donate
            </CommonButton>
         </div>
      );
   };

   const filterTableData = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();

      const filteredData = SCmeetingList.filter((item: any) => {
         const meetingDate = item['Meeting Dates'].toLowerCase();
         const uploadedDate = item['Uploaded Date'].toLowerCase();
         const documentName = item['Document'].toLowerCase();
         return (
            meetingDate.includes(lowerCaseQuery) ||
            uploadedDate.includes(lowerCaseQuery) ||
            documentName.includes(lowerCaseQuery)
         );
      });

      setFilteredScMemberDetails(filteredData);
   };

   const handleFileClick = (fileUrl: string) => {
      // Implement the action you want to take when a file is clicked
      console.log(`File clicked! Opening: ${fileUrl}`);
      // You can use window.open(fileUrl) to open the URL in a new tab/window
   };

   const SCMetingMinutesTableData = () => {
      // const keysToShow = Object.keys(SCmeetingList[0]).filter((key) => key !== 'File Url');
      const keysToShow = Object.keys(filteredScMemberDetails[0] || {}).filter(
         (key) => key !== 'File Url',
      );

      return (
         <div className={styles.tableContainer}>
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
                  {filteredScMemberDetails.map((item: any, rowIndex: number) => (
                     <tr key={rowIndex} className={styles.tableRow}>
                        {keysToShow.map((key, colIndex) => (
                           <>
                              {key === 'Document' ? (
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
         </div>
      );
   };

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
   };

   const SearchBox = () => {
      return (
         <div className={styles.searchBox}>
            <CustomSearchFeild
               id="input-with-icon-textfield"
               placeholder="Search"
               value={searchQuery}
               onChange={handleSearchChange}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#F05802' }} />
                     </InputAdornment>
                  ),
               }}
            />
         </div>
      );
   };

   const headerComponent = () => {
      return (
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'space-between',
               padding: '15px',
               alignItems: 'center',
            }}
         >
            <Typography className={styles.scheader}>SC Meeting Minutes</Typography>
            {SearchBox()}
         </Box>
      );
   };

   const SCMeetingMinutesComponent = () => {
      return (
         <div className={styles.scContainer}>
            {headerComponent()}
            {SCMetingMinutesTableData()}
         </div>
      );
   };

   const upComingSCmeetingCard = () => {
      return (
         <div className={styles.cardContainer}>
            <Typography component={'p'} className={styles.text}>
               SC Meeting to review Bylaw Amendments
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
               <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CustomLocationOutlinedIcon />
                  <Typography component={'p'} className={styles.innerText}>
                     Lakireddy Hall
                  </Typography>
               </div>
               <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CustomCalendarOutlinedIcon />
                  <Typography component={'p'} className={styles.innerText}>
                     11/05/2023
                  </Typography>
               </div>
            </Box>
         </div>
      );
   };

   const upComingSCmeeting = () => {
      return (
         <div className={styles.UpscContainer}>
            <Typography className={styles.scheader}>Upcoming SC Meeting</Typography>
            {upComingSCmeetingCard()}
         </div>
      );
   };

   const showBecomeMember = (): React.ReactElement => {
      return (
         <>
            <Grid item xs={6} md={8} />
            <Grid item xs={6} md={8} spacing={2}>
               <Card sx={{ width: '100%', height: '421px', padding: '24px', margin: '5px 0' }}>
                  <Box sx={{ justifyContent: 'space-between' }}>
                     <Typography
                        sx={{
                           color: '#313131',
                           fontFamily: 'Lato',
                           fontSize: '24px',
                           fontStyle: ' normal',
                           fontWeight: 600,
                           lineHeight: '140%',
                           paddingBottom: '8px',
                        }}
                     >
                        Want to be an SC Member?
                     </Typography>
                     <Typography
                        sx={{
                           fontSize: '16px',
                        }}
                     >
                        Interested in taking active role in steering the temple direction? Become a
                        Steering Committee member.
                     </Typography>
                  </Box>
                  <EmptyPage
                     imgUrl={EmptySCMember}
                     subComponent={emptyPageButton()}
                     typographyText={''}
                  />
               </Card>
            </Grid>
         </>
      );
   };

   const showScMember = (): React.ReactElement => {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={6} md={8} spacing={2}>
               {SCMeetingMinutesComponent()}
            </Grid>
            <Grid item xs={6} md={4} spacing={2}>
               {upComingSCmeeting()}
            </Grid>
         </Box>
      );
   };

   return (
      // <>
      //    {SCmeetingList.length === 0 ? (
      //       <>
      //       {showBecomeMember()}
      //       </>
      //    ) : (
      //       <>
      //       {showScMember()}
      //       </>
      //    )}
      // </>

      <>
         {shouldShowScMember && SCmeetingList.length !== 0 ? (
            <>{showScMember()}</>
         ) : 
            <>{showBecomeMember()}</>
          }
      </>
   );
};

export default ScMember;
