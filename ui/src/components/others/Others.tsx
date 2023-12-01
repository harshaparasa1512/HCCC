import { Box, Card, Typography } from '@mui/material';
import styles from './Others.module.scss';

const OthersInfo = [
   {
      image: "/images/VolunteerRegistratration.svg",
      title: 'Volunteer Registration ',
      url:"https://www.livermoretemple.org/hints/humanservices/Main.html"
   },
   {
      image: "/images/Prayer.svg",
      title: 'Sahana Vavathu Prayer',
      url:"https://www.facebook.com/Livermoretemple/videos/vb.618494134938095/817907461663427/?type=2&theater"
   },
   {
      image: "/images/AboutTempleSmall.svg",
      title: 'About Temple',
      url:"https://hccccars.org/",
   },
   {
      image: "/images/FAQ.svg",
      title: 'FAQ',
      url:"http://hints15dev.westus2.cloudapp.azure.com/hintspgsql/content/asp/help.asp?menuID=21"
   },
];

   const handleCardClick = (url: string) => {
      window.open(url, '_blank'); // Opens the URL in a new tab
   }

const Others = (): JSX.Element => {
   return (
      <>
         <Typography
            sx={{
               fontFamily: 'Lato',
               fontSize: '25px',
               fontStyle: 'normal',
               fontWeight: 700,
               color: '#313131',
               marginTop: '40px',
               marginBottom:"24px"
            }}
         >
            Other
         </Typography>
         <Box className={styles.totalLayout}>
            {OthersInfo.map((info, i) => (
               <Card key={i} className={styles.singleLayout} onClick={() => { handleCardClick(info.url); }}>
                  <img src={info.image} className={styles.image} />
                  <Typography className={styles.titleStyles}>{info.title}</Typography>
               </Card>
            ))}
         </Box>
      </>
   );
};

export default Others;
