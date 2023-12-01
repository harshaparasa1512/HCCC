import { CommonButton } from 'components/common/StyledComponents/StyledFields';
import EmptyPage from 'components/common/emptyPages/emptyPage';

import { Card, Typography } from '@mui/material';

const TimeToDonate = ():JSX.Element => {
   const handleShowForm = (): void => {
      console.log('but...............');
   };

   const emptyPageButton = (): React.ReactElement => {
      return (
         <div >
            <CommonButton onClick={handleShowForm}>Donate</CommonButton>
         </div>
      );
   };
   return (
      <Card
         sx={{
            height: '426px',
            width: '100%',
            borderRadius: ' 8px',
            background: ' #FFF',
            boxShadow: ' 0px 2px 20px 0px rgba(237, 237, 237, 0.80)',
         }}
      >
         <Typography
            sx={{
               color: '#313131',
               fontFamily: 'Lato',
               fontSize: '24px',
               fontStyle: ' normal',
               fontWeight: 600,
               lineHeight: '140%',
               paddingTop: '24px',
               paddingLeft: '24px',
            }}
         >
            Time to donate Stock
         </Typography>
         <EmptyPage imgUrl="./images/TimeDonateStock.svg"  subComponent={emptyPageButton()} typographyText={''} />
      </Card>
   );
};

export default TimeToDonate;
