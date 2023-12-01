import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from './donationHistory.module.scss';
import Button from '@mui/material/Button';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { DonationHistoryProps } from 'infrastructure/GlobalContextProvider';
import { useDownloadExcel } from 'react-export-table-to-excel';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import commonStyles from 'App.module.scss';
import emptyDonationHistoryfrom from 'assets/emptyDonationHistory.svg';
import EmptyPage from 'components/common/emptyPages/emptyPage';
import { CommonButton } from 'components/common/StyledComponents/StyledFields';
import { Card, Typography } from '@mui/material';
import { apiRequest } from 'infrastructure/backendService';

export default function DonationHistory(): JSX.Element {
   const [totalAmount, setTotalAmount] = useState<number>(0);
   const [donationHistoryData, setDonationHistoryData] = useState<DonationHistoryProps[]>([]);
   const tableRef = useRef(null);

   const data: DonationHistoryProps[] = [
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 100,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 100,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 76,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 76,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 76,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 76,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 76,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 76,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 76,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 76,
      },
      {
         RecieptNo: '12345',
         Date: 'date',
         Purpose: 'hhhh',
         mode: 'Gpay',
         amount: 76,
      },
   ];

   useEffect(() => {
      apiRequest({
         method: 'GET',
         endpoint: '',
      })
         .then((res) => {
            console.log(res.data);
            setDonationHistoryData(res.data);
         })
         .catch((err) => {
            console.log(err);
            setDonationHistoryData(data); // comment this line after getting response 200 from the server
         });
   }, []);

   useEffect(() => {
      calculateTotal();
   }, []);

   const calculateTotal = (): void => {
      let total = 0;
      data.map((item: any) => {
         return (total += item.amount);
      });
      setTotalAmount(total);
   };

   const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: 'Donation History',
      sheet: 'Donation History',
   });

   const donateButtonComponent = (): React.ReactElement => {
      return (
         <>
            <div className={styles.buttonContainer}>
               <CommonButton>Donate Now</CommonButton>
            </div>
         </>
      );
   };

   const nameAndButton = (): React.ReactElement => {
      return (
         <div className={styles.nameAndButton}>
            <p className={styles.heading}>Donation History</p>
            {donateButtonComponent()}
         </div>
      );
   };

   const donationHistoryFooter = (): React.ReactElement => {
      return (
         <div className={styles.notePointCountDivContainer}>
            <table style={{ width: '100%' }}>
               <tbody>
                  <tr>
                     <td>Note : $200 away to become SC member</td>
                     <td style={{ width: '22%' }}></td>
                     <td>
                        Total Date Donation : <b>${totalAmount} </b>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      );
   };

   const handleShowForm = (): void => {
      console.log('but...............');
   };

   const emptyPageButton = (): React.ReactElement => {
      return (
         <div>
            <CommonButton className={commonStyles.saveButton} onClick={handleShowForm}>
               Donate Now
            </CommonButton>
         </div>
      );
   };

   const subContainer = (): React.ReactElement => {
      return (
         <>
            {nameAndButton()}
            <GridTableComponent tableData={data} tableRef={tableRef} />
            {donationHistoryFooter()}
         </>
      );
   };

   const renderWithData = () => {
      return <>{subContainer()}</>;
   };

   const renderEmptyData = (): React.ReactElement => {
      return (
         <>
            <Typography className={styles.heading}>Donation History</Typography>
            <EmptyPage
               imgUrl={emptyDonationHistoryfrom}
               subComponent={emptyPageButton()}
               typographyText="You have not donated"
            />
         </>
      );
   };

   return (
      <Card className={styles.donationHistoryMainContainer}>
         {donationHistoryData.length === 0 ? renderEmptyData() : renderWithData()}
      </Card>
   );
}
