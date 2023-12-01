import { Grid, Typography } from '@mui/material';
import styles from '../attachExpenseReceipts/attachExpenseReceipt.module.scss'
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';
const Authorize = (): JSX.Element => {
    return (
        <div style={{display:"flex"}}>
            <LeftMainNavigation/>
            <div className={styles.BoxContainer}>
                <Typography component="div" className={styles.typoGraphyHeading}>
                    Expense Voucher
                </Typography>
                <div className={styles.formContainer}>
                    <Typography component="div" className={styles.typoGraphy}>
                        Authorize Expense Requests
                    </Typography>
                    <Grid>
                        <Typography className={styles.typographyAuthorize} align='center'>There are no pending Requests</Typography>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Authorize;