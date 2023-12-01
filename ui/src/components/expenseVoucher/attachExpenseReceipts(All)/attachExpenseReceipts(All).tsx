import { Card, FormControl, Grid, MenuItem, Typography } from '@mui/material';
import { CustomDeleteIcon, CustomInputLabel, CustomSelect, CustomTextFeild, CustomInfo } from 'components/common/StyledComponents/StyledFields';
import styles from '../attachExpenseReceipts/attachExpenseReceipt.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';


const AttachExpenseReceiptsAll = (): JSX.Element => {

    const ReceiptList = [
        {
            label: "option1",
        },
        {
            label: "option2",
        },
        {
            label: "option3",
        },
        {
            label: "option4",
        },
        {
            label: "option5",
        }
    ]
    const selectExpenseReceipt = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Select Pooja Location'
                    defaultValue=""
                    id="grouped-select"
                >
                    {ReceiptList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
            </FormControl>
        )
    }
    const itemReceiptData = [
        {
            "File Name": "AC24PR.pdf",
            Amount: "$200",
            Description: "Temp Help at front desk from 3/17 to 3/30/14",
            "upload On": "3/25/2012 8:41:22pm",
            Action: (
                <div>
                    <CustomDeleteIcon />
                </div>
            ),
        },
    ]
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
                    <Card className={styles.cardContainer}>
                        <div className={styles.formFields}>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Select expensive voucher</CustomInputLabel>
                                    {selectExpenseReceipt()}
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <div style={{ position: "relative", top: "38px", paddingLeft: "16px", display: "flex" }}>
                                        <CustomInfo />
                                        <Typography className={styles.detailsText}>Details</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                    <Typography component="div" className={styles.typoGraphy}>
                        Receipts
                    </Typography>
                    <Card className={styles.cardContainer}>
                        <GridTableComponent tableData={itemReceiptData} />
                        <div className={styles.notePointCountDivContainer}>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td>Total: <b>${200} </b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Typography className={styles.requestText}>All requests for reimbursement must be submitted only through the respective Functional Committee Chairperson or President</Typography>
                    </Card>
                </div>
                <Card className={styles.cardContainer}>
                    <div className={styles.formFields}>
                        <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Reference No</CustomInputLabel>
                                <CustomTextFeild
                                    className={styles.textField}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Date Of Submission</CustomInputLabel>
                                <CustomTextFeild
                                    className={styles.textField}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Submitted By:</CustomInputLabel>
                                <CustomTextFeild
                                    className={styles.textField}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>/Year Of Budget:</CustomInputLabel>
                                <CustomTextFeild
                                    className={styles.textField}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Card>
                <div>
                    <Card className={styles.cardContainer}>
                        <div className={styles.formFields}>
                            <Typography component="div" className={styles.typoGraphyForsubtitles}>
                                Main Account
                            </Typography>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Account Id</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Account Name</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Budget</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card className={styles.cardContainer}>
                        <div className={styles.formFields}>
                            <Typography component="div" className={styles.typoGraphyForsubtitles}>
                                Sub Account
                            </Typography>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Account Id</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Account Name</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Budget</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required

                                    />
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Total Approved Expenses</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Total Expenses Requested Including Current</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Remaining balance after current expenses</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                    <Card className={styles.cardContainer}>
                        <div className={styles.formFields}>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Short Title</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Current Expenses Details</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Current Amount</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Mail Check to</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Devotee sponsored?</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default AttachExpenseReceiptsAll;