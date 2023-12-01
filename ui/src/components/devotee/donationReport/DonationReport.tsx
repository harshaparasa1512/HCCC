import { Box, FormControl, MenuItem, Typography } from '@mui/material';
import {
   CommonButton,
   CustomInputLabel,
   CustomSelect,
} from 'components/common/StyledComponents/StyledFields';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useRef, useState } from 'react';
import styles from './DonationReport.module.scss';
import { useNavigate } from 'react-router-dom';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

const DonationReportData = [
   {
      name: 'Donations through Credit Card',
      price: 10,
   },
   {
      name: 'Donations through Check',
      price: 20,
   },
   {
      name: 'Donations through Stock',
      price: 30,
   },
   {
      name: 'Donations through Abharana',
      price: 500,
   },

   {
      name: 'Donations through Coin',
      price: 55,
   },
   {
      name: 'Donations through PayPal',
      price: 100,
   },
   {
      name: 'Donations through Zelle',
      price: 23,
   },
   {
      name: 'Donations through Direct Deposit',
      price: 1000,
   },
   {
      name: 'Donations through Cash',
      price: 55,
   },
   {
      name: 'Donations through Manual Report',
      price: 76,
   },
   {
      name: 'Donations through Employee matching donation',
      price: 80,
   },
];

const DonationReport = (): JSX.Element => {
   const Years = [
      {
         year: 2021,
      },
      {
         year: 2022,
      },
      {
         year: 2023,
      },
      {
         year: 2024,
      },
      {
         year: 2025,
      },
   ];
   const [selectedYear, setSelectedYear] = useState('');

   const navigate = useNavigate();

   // useEffect(()=>{
   //    if(!checkAuthToken()) {
   //       navigate('/')
   //    }
   // },[getaccessToken()])

   const handleYearChange = (event) => {
      setSelectedYear(event.target.value);
   };
   const pdfRef = useRef();

   const [loader, setloader] = useState(false);
   // const downloadPDF = () => {
   //    const yearToDownload = selectedYear || new Date().getFullYear().toString();
   //    const input = pdfRef.current;
   //    void html2canvas(input).then((canvas) => {
   //       const imgData = canvas.toDataURL('image/png');
   //       const pdf = new jsPDF('p', 'mm', 'a4', true);
   //       const pdfWidth = pdf.internal.pageSize.getWidth();
   //       const pdfHeight = pdf.internal.pageSize.getHeight();
   //       const imgWidth = canvas.width;
   //       const imgHeight = canvas.height;
   //       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
   //       const imgX = (pdfWidth - imgWidth * ratio) / 2;
   //       const imgY = 30;
   //       pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
   //       pdf.save(`report_${yearToDownload}.pdf`);
   //       const newWindow = window.open('', '_blank');
   //       newWindow.document.write('<html><head><title>PDF Preview</title></head><body>');
   //       newWindow.document.write('<iframe width="100%" height="100%" src="' + pdf.output('datauristring') + '"></iframe>');
   //       newWindow.document.write('</body></html>');
   //    });
   // };

   const handlePrintClick = () => {
      setloader(true);
      const yearToDownload = selectedYear || new Date().getFullYear().toString();
      const input = pdfRef.current;

      html2canvas(input).then((canvas) => {
         const imgData = canvas.toDataURL('image/png');
         const pdf = new jsPDF('p', 'mm', 'a4', true);
         const pdfWidth = pdf.internal.pageSize.getWidth();
         const pdfHeight = pdf.internal.pageSize.getHeight();
         const imgWidth = canvas.width;
         const imgHeight = canvas.height;
         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
         const imgX = (pdfWidth - imgWidth * ratio) / 2;
         const imgY = 30;
         pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

         // Open a new window with the PDF preview
         const newWindow = window.open('', '_blank');
         newWindow?.document.write('<html><head><title>PDF Preview</title></head><body>');
         newWindow?.document.write(
            '<iframe  width="70%" height=100%" src="' + pdf.output('datauristring') + '"></iframe>',
         );
         newWindow?.document.write('</body></html>');
         
      });

      setloader(false);
   };

   const calculateTotal = (): number => {
      // Use the reduce function to sum up all the prices
      const total = DonationReportData.reduce((sum, item) => sum + item.price, 0);
      return total;
   };

   const HeaderDonation = (): React.ReactElement => {
      return (
         <Box className={styles.Header}>
            <img src="/images/TempleOldLogo.png" className={styles.HeaderImage} />
            <Box className={styles.TempleAddress}>
               <Typography className={styles.TempleNameData}>Shiva -Vishnu Temple</Typography>
               <Typography className={styles.TempleAddressData}>
                  Hindu Community and Cultural Center<br />A Registered Non-Profit Organization<br />Tax ID:
                  94-2427126, Inc: D08215891232,<br /> Arrowhead Ave, Livermore, CA 94551 <br />Tel: (925)
                  449-6255, Fax: (925) 455-0404.
               </Typography>
            </Box>
         </Box>
      );
   };

   const DonationDropdown = (): React.ReactElement => {
      const currentYear = new Date().getFullYear();
      return (
         <FormControl sx={{ paddingTop: '5px', paddingBottom: '24px', width: '405px' }}>
            <CustomSelect
               sx={{ color: '#000' }}
               IconComponent={KeyboardArrowDownIcon}
               defaultValue={currentYear.toString()}
               id="grouped-select"
               onChange={handleYearChange}
            >
               {Years.map((item, i) => (
                  <MenuItem value={item.year} key={i}>
                     {item.year}
                  </MenuItem>
               ))}
            </CustomSelect>
         </FormControl>
      );
   };
   return (
      <>
         <Typography
            sx={{
               color: '#414141',
               fontFamily: 'Lato',
               fontSize: '32px',
               fontStyle: 'normal',
               fontWeight: 700,
               lineHeight: '140%',
               paddingBottom: '11px',
            }}
         >
            Donation Report
         </Typography>

         <Box className={styles.dropdown}>
            <CustomInputLabel>Year</CustomInputLabel>
            {DonationDropdown()}
         </Box>

         <Box ref={pdfRef} className={styles.reportContent}>
            <Box>{HeaderDonation()}</Box>

            <Typography className={styles.SignInName}>
               Monday, October 16, 2023
               <br /> Devotee Sign-in Name: KRITI05
            </Typography>
            <Typography className={styles.SignInAddress}>
               KRITI MATHUR501, C WING OLYMPIA
               <br />
               SOCIETY,PUNE, IN - 452010
            </Typography>

            <Typography className={styles.loggedInMember}>Dear KRITI MATHUR, </Typography>
            <Typography className={styles.loogedMemberGratitude}>
               Thank you for your generous donation to Hindu Community and Cultural Center,
               Shiva-Vishnu Temple, Livermore, California for the year 2022 :
            </Typography>
            {DonationReportData.map((item, i) => (
               <Box className={styles.paymentDetails} key={i}>
                  <Typography className={styles.paymentDetailsData}>{item.name}:</Typography>
                  <Typography className={styles.paymentDetailsData}>$ {item.price}</Typography>
               </Box>
            ))}
            <Box className={styles.paymentDetails} sx={{ paddingTop: '5px' }}>
               <Typography>
                  <b>Total Donations for the Year 2022 :</b>
               </Typography>
               <Typography>
                  <b>${calculateTotal()}</b>
               </Typography>
            </Box>

            <Typography className={styles.AboutData}>
               This information is a record of contributions you made to HCCC during 2022 and
               tangible value of goods and services received by you in return for these
               contributions during the 2022 was $0.00.
            </Typography>

            <Typography className={styles.AboutData}>
               Please take a moment to review and verify the above amounts for accuracy. If you find
               any discrepancies, please contact us as soon as possible. Please indicate your
               Sign-in Name in your correspondence.
            </Typography>
            <Typography className={styles.AboutData}>
               We appreciate your patronage and look forward to your continued involvement with the
               Shiva-Vishnu Temple.
            </Typography>

            <Box className={styles.ClosingSignature}>
               <Typography className={styles.SignatureData}>
                  Prabhakar Bhanoori, Chairman
               </Typography>
               <Typography className={styles.SignatureData}>
                  Sailaja Malireddy, President
               </Typography>
            </Box>
         </Box>
         <Box className={styles.Button}>
            <CommonButton onClick={handlePrintClick} disabled={loader}>
               {loader ? 'Loading....' : 'Print'}
            </CommonButton>
         </Box>
      </>
   );
};

export default DonationReport;
