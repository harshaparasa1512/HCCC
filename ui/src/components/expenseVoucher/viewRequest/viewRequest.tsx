import { Box, Card, FormControl, Grid, MenuItem, Typography } from '@mui/material';
import styles from './viewRequest.module.scss'
import { CustomCalendarTodayOutlinedIcon, CustomDatePicker, CustomInputLabel, CustomSelect, StyledDateContainer } from 'components/common/StyledComponents/StyledFields';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import commonStyles from 'App.module.scss'
import { useState } from 'react';
import { ValidationError, object, string } from 'yup';
import dayjs from 'dayjs';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface ErrorMessageTypes {
    fromDate: string;
    ToDate: string;
    searchCriteria: string;
}

const ViewRequest = (): JSX.Element => {

    const [formData, setFormData] = useState({
        fromDate: "",
        ToDate: "",
        searchCriteria: ""
    })
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        fromDate: "",
        ToDate: "",
        searchCriteria: ""
    })
    const handleCancel = () => {
        setFormData({
            fromDate: "",
            ToDate: "",
            searchCriteria: ""
        })
    }
    const validationSchema = object().shape({
        fromDate: string().required('From Date is required'),
        ToDate: string().required('To Date is required'),
        searchCriteria: string().required('Search Criteris is required')
    })
    const handleSubmit = async () => {
        const errors: ErrorMessageTypes = {
            fromDate: "",
            ToDate: "",
            searchCriteria: ""
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
    const handleButtons = () => {
        return (
            <div>
                <button className={commonStyles.cancelButton} onClick={handleCancel}>
                    Cancel
                </button>
                <button className={commonStyles.saveButton} onClick={handleSubmit}>
                    submit
                </button>
            </div>
        );
    };
    const BasicDatePicker = (): React.ReactElement => {
        return (
            <div style={{ minWidth: "100%", marginTop: "12px" }}>
                <StyledDateContainer>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <CustomDatePicker
                                slots={{
                                    openPickerIcon: CustomCalendarTodayOutlinedIcon,
                                }}
                                slotProps={{
                                    inputAdornment: {
                                        position: 'end',
                                    },
                                }}
                                format="DD-MM-YYYY"
                                value={
                                    formData.fromDate ? dayjs(formData.fromDate, 'MM-DD-YYYY') : ''
                                }
                                onChange={(value) => {
                                    handleFieldChange('fromDate', value);
                                    setErrorMessage({ ...errorMessage, fromDate: "" })
                                }}
                                className={errorMessage.fromDate ? styles.errorTextFeild : ""}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.fromDate ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.fromDate}</Typography> : ''}
                </StyledDateContainer>
            </div>
        );
    };
    const BasicToDatePicker = (): React.ReactElement => {
        return (
            <div style={{ minWidth: "100%", marginTop: "12px" }}>
                <StyledDateContainer>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <CustomDatePicker
                                slots={{
                                    openPickerIcon: CustomCalendarTodayOutlinedIcon,
                                }}
                                slotProps={{
                                    inputAdornment: {
                                        position: 'end',
                                    },
                                }}
                                format="DD-MM-YYYY"
                                value={
                                    formData.fromDate ? dayjs(formData.ToDate, 'MM-DD-YYYY') : ''
                                }
                                onChange={(value) => {
                                    handleFieldChange('ToDate', value);
                                    setErrorMessage({ ...errorMessage, ToDate: "" })
                                }}
                                className={errorMessage.ToDate ? styles.errorTextFeild : ""}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.ToDate ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.ToDate}</Typography> : ''}
                </StyledDateContainer>
            </div>
        );
    };
    const searchCriteriaList = [
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
    const searchCriteriaDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={errorMessage.searchCriteria ? styles.errorTextFeild : ""}
                    placeholder='Select To Date'
                    value={formData.searchCriteria}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('searchCriteria', e.target.value);
                        setErrorMessage({ ...errorMessage, searchCriteria: "" })
                    }}
                >
                    {searchCriteriaList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.searchCriteria ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.searchCriteria}</Typography> : ''}
            </FormControl>
        )
    }
    return (
        <div style={{display:"flex"}}>
            <LeftMainNavigation/>
            <div className={styles.BoxContainer}>
                <Typography component="div" className={styles.typoGraphyHeading}>
                    Expenses Voucher
                </Typography>
                <div className={styles.formContainer}>
                    <Typography component="div" className={styles.typoGraphy}>
                        View Requests
                    </Typography>
                    <Card className={styles.cardContainer}>
                        <div className={styles.formFields}>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Search By Date From</CustomInputLabel>
                                    {BasicDatePicker()}
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Search By Date To</CustomInputLabel>
                                    {BasicToDatePicker()}
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Search Criteria</CustomInputLabel>
                                    {searchCriteriaDropdown()}
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                </div>
            </div>
            <Box>
                <Grid xs={12} item>
                    <div style={{ marginTop: '10px' }}>{handleButtons()}</div>
                </Grid>
            </Box>
        </div>
    );
};

export default ViewRequest;