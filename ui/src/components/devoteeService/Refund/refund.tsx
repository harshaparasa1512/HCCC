import { Box, Card, FormControl, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, styled, Typography } from '@mui/material';
import {
    CustomTextFeild,
    CustomInputLabel,
    CustomSelect
} from 'components/common/StyledComponents/StyledFields';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CardContent from '@mui/material/CardContent';

import styles from './refund.module.scss';
import { useState } from 'react';
import { object, string, ValidationError } from 'yup';
import commonStyles from 'App.module.scss';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface ErrorMessageTypes {
    signinName: string;
    referenceNumber: string;
    typeofrefund: string;
    refundamount: string;
    reasonforrefund: string;
    checkNumber: string;
}
const CustomRadioButton = styled(Radio)`
  & svg {
    color: #F05802;
    height: 24px;
    width:24px;
  }
`;

const Refund = () => {
    const [formData, setFormData] = useState({
        signinName: "",
        referenceNumber: "",
        refundamount: "",
        typeofrefund: "",
        reasonforrefund: "",
        checkNumber: "",
    })
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        signinName: "",
        referenceNumber: "",
        refundamount: "",
        typeofrefund: "",
        checkNumber: "",
        reasonforrefund: "",
    })
    const validationSchema = object().shape({
        signinName: string().required('Sign name is required'),
        referenceNumber: string().required('Reference Number is required'),
        refundamount: string().required('Refund Amount is required'),
        typeofrefund: string().required('Type of Refund required'),
        checkNumber: string().required('Check Number is required'),
        reasonforrefund: string().required('Reason for refund'),
    })
    const handleRefund = async () => {
        const errors: ErrorMessageTypes = {
            signinName: "",
            referenceNumber: "",
            refundamount: "",
            typeofrefund: "",
            checkNumber: "",
            reasonforrefund: "",
        }
        try {
            // Validate the form data against the validation schema
            await validationSchema.validate(formData, { abortEarly: false });
            // If validation passes, you can submit the form
            setErrorMessage(errors);
            alert('Data is Here');

            // Call your API or perform other actions here
            //  saveApiCall();

        } catch (error) {
            // Handle validation errors

            if (error instanceof ValidationError) {
                error.inner.forEach((e) => {
                    if (e.path) {
                        errors[e.path as keyof ErrorMessageTypes] = e.message;
                    }
                });
            }
            setErrorMessage(errors);
        }
    }

    const handleFieldChange = (field: string, value: any) => {

        setFormData({
            ...formData,
            [field]: value,
        });

    };
    const typeofrefundList = [
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
    const TypeOfRefund = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Select Pooja Location'
                    value={formData.typeofrefund}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('typeofrefund', e.target.value);
                        setErrorMessage({ ...errorMessage, typeofrefund: "" })
                    }}
                >
                    {typeofrefundList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.typeofrefund ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.typeofrefund}</Typography> : ''}
            </FormControl>
        )
    }
    const handleButtons = () => {
        return (
            <div>
                <button className={commonStyles.cancelButton}>
                    Cancel
                </button>
                <button className={commonStyles.saveButton} onClick={handleRefund}>
                    Refund
                </button>
            </div>
        );
    };

    const radioButtons = (): React.ReactElement => {
        return (
            <RadioGroup sx={{ display: "flex", flexDirection: "row" }}>
                <FormControlLabel value="cash" control={<CustomRadioButton sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />} label="Cash" />
                <FormControlLabel value="check" control={<CustomRadioButton sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />} label="Check" />
            </RadioGroup>
        )
    }
    return (
        <>
            <div style={{ display: "flex" }}>
                <LeftMainNavigation />
                <div className={styles.BoxContainer}>
                    <Typography component="div" className={styles.typoGraphyHeading}>
                        Devotee Service
                    </Typography>
                    <div className={styles.formContainer}>
                        <Typography component="div" className={styles.typoGraphy}>
                            Refund
                        </Typography>
                        <Card className={styles.cardContainer}>
                            <div style={{ padding: "24px" }}>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Sign-In Name</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            disabled={true}
                                            placeholder='kritii'
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("signinName", e.target.value);
                                                setErrorMessage({ ...errorMessage, signinName: '' })
                                            }}
                                        />
                                        {errorMessage.signinName ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.signinName}</Typography> : ''}

                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Reference Number</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("referenceNumber", e.target.value)
                                                setErrorMessage({ ...errorMessage, referenceNumber: '' });
                                            }}
                                        />
                                        {errorMessage.referenceNumber ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.referenceNumber}</Typography> : ''}

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Type Of Refund</CustomInputLabel>
                                        {TypeOfRefund()}
                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Refund Amount</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("refundamount", e.target.value)
                                                setErrorMessage({ ...errorMessage, refundamount: '' });
                                            }}
                                        />
                                        {errorMessage.refundamount ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.refundamount}</Typography> : ''}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Reason for Refund</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("reasonforrefund", e.target.value)
                                                setErrorMessage({ ...errorMessage, reasonforrefund: '' });
                                            }}
                                        />
                                        {errorMessage.reasonforrefund ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.reasonforrefund}</Typography> : ''}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <CardContent className={styles.cardContent}>
                                        <div className={styles.boxContent}>
                                            <div className={styles.boxContent1}>
                                                <Typography component="div" className={styles.typoGraphyText}>
                                                    Check Number
                                                </Typography>
                                                {radioButtons()}
                                            </div>
                                        </div>
                                    </CardContent>

                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Check Number</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("checkNumber", e.target.value)
                                                setErrorMessage({ ...errorMessage, checkNumber: '' });
                                            }}
                                        />
                                        {errorMessage.checkNumber ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.checkNumber}</Typography> : ''}
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </div>
                    <Box>
                        <Grid xs={12} item>
                            <div style={{ marginTop: '10px' }}>{handleButtons()}</div>
                        </Grid>
                    </Box>
                </div>

            </div>
        </>
    )
}

export default Refund;
