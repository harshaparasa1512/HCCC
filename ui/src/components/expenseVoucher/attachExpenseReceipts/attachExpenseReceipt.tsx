import { Grid, Typography } from '@mui/material';
import styles from '../attachExpenseReceipts/attachExpenseReceipt.module.scss'
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';
const AttachExpenseReceipt = (): JSX.Element => {
    return (
        <div style={{display:"flex"}}>
            <LeftMainNavigation/>
            <div className={styles.BoxContainer}>
                <Typography component="div" className={styles.typoGraphyHeading}>
                    Expense Voucher
                </Typography>
                <div className={styles.formContainer}>
                    <Typography component="div" className={styles.typoGraphy}>
                        Attach Expense Receipts
                    </Typography>
                    <Grid>
                        <Typography className={styles.typographyAuthorize} align='center'>There are no pending expense vouchers.</Typography>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default AttachExpenseReceipt;