import { Card, FormControl, Grid, MenuItem, TextareaAutosize, Typography } from '@mui/material';
import styles from './eventHalls.module.scss';
import { CommonButton, CustomInputLabel, CustomSelect, CustomTextFeild } from 'components/common/StyledComponents/StyledFields';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { object, string, ValidationError } from 'yup';
import { apiRequest } from 'infrastructure/backendService';
import dayjs from 'dayjs';

type ErrorMessageTypes = {
    hallName: string;
    description: string;
    capacity: string;
    minMinute: string;
    minHours: string;
    hourlyFee: string;
    minutesFee: string;
    setUpCleaning: string;
    securityDesposit: string;
    cancelationFee: string;
    incomeAccounts: string;
};

const EventHalls = () => {
    const tableRef = useRef(null);
    const [showAddEventHallFields, setShowAddEventHallFields] = useState<boolean>(false);
    const [showEventHallTableInfo, setShowEventHallTableInfo] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        hallName: '',
        description: '',
        capacity: '',
        minMinute: '',
        minHours: '',
        hourlyFee: '',
        minutesFee: '',
        setUpCleaning: '',
        securityDesposit: '',
        cancelationFee: '',
        incomeAccounts: '',
    });
    const [formData, setFormData] = useState({
        hallName: '',
        description: '',
        capacity: '',
        minMinute: '',
        minHours: '',
        hourlyFee: '',
        minutesFee: '',
        setUpCleaning: '',
        securityDesposit: '',
        cancelationFee: '',
        incomeAccounts: '',
    });

    const validationSchema = object().shape({
        hallName: string().required('Hall Name is required'),
        description: string().required('Description is required'),
        capacity: string().required('Capacity is required'),
        minMinute: string().required('Min Minutes is required'),
        minHours: string().required('Min Hours is required'),
        hourlyFee: string().required('Hour Fee is required'),
        minutesFee: string().required('Minutes Fee is required'),
        setUpCleaning: string().required('Setup And Cleaning is required'),
        securityDesposit: string().required('Security Deposit is required'),
        cancelationFee: string().required('Cancellation Fee is required'),
        incomeAccounts: string().required('Income Account is required')
    });

    const eventHallInfoDetails = [
        {
            "Name of the Hall": "Assembly Hall with Dressing Room",
            "Min(hours)": "1",
            "Min(Fees)": "1",
            "Hourly(Fees)": "1",
            "Furniture setup(Break-down & Cleaning)": "1",
            "Security Deposit": "500",
            "Cancellation": "1",
            "Action": (
                <div style={{ display: "flex" }}>
                    <EditIcon className={styles.editAnddeleteIcon} />
                    <DeleteIcon className={styles.editAnddeleteIcon} />
                </div>
            ),
        },
        {
            "Name of the Hall": "Assembly Hall with Dressing Room",
            "Min(hours)": "1",
            "Min(Fees)": "1",
            "Hourly(Fees)": "1",
            "Furniture setup(Break-down & Cleaning)": "1",
            "Security Deposit": "500",
            "Cancellation": "1",
            "Action": (
                <div style={{ display: "flex" }}>
                    <EditIcon className={styles.editAnddeleteIcon} />
                    <DeleteIcon className={styles.editAnddeleteIcon} />
                </div>
            ),
        },
    ];

    const hoursList = [
        {
            hour: '0',
        },
        {
            hour: '1',
        },
        {
            hour: '2',
        },
        {
            hour: '3',
        },
    ];

    const minHoursList = [
        {
            minHour: '0',
        },
        {
            minHour: '10',
        },
        {
            minHour: '20',
        },
        {
            minHour: '30',
        },
    ];

    const minMinutesList = [
        {
            minutes: '0',
        },
        {
            minutes: '10',
        },
        {
            minutes: '20',
        },
        {
            minutes: '30',
        },
    ];

    const handleSave = async (): Promise<void> => {

        const errors: ErrorMessageTypes = {
            hallName: '',
            description: '',
            capacity: '',
            minMinute: '',
            minHours: '',
            hourlyFee: '',
            minutesFee: '',
            setUpCleaning: '',
            securityDesposit: '',
            cancelationFee: '',
            incomeAccounts: '',
        };

        try {
            // Validate the form data against the validation schema
            await validationSchema.validate(formData, { abortEarly: false });
            // If validation passes, you can submit the form
            setErrorMessage(errors);
            alert('Details Saved Successful');

            // Call your API or perform other actions here
            saveApiCall();

        } catch (error: any) {
            // Handle validation errors

            if (error instanceof ValidationError) {
                error.inner.forEach((e: any) => {
                    if (e.path) {
                        errors[e.path as keyof ErrorMessageTypes] = e.message;
                    }
                });
            }
            setErrorMessage(errors);
        }
    };

    const saveApiCall = () => {
        const reqBody = {
            hallName: formData.hallName,
            description: formData.description,
            capacity: formData.capacity,
            minMinute: formData.minMinute,
            minHours: formData.minHours,
            hourlyFee: formData.hourlyFee,
            minutesFee: formData.minutesFee,
            setUpCleaning: formData.setUpCleaning,
            securityDesposit: formData.securityDesposit,
            cancelationFee: formData.cancelationFee,
            incomeAccounts: formData.incomeAccounts,
            // relation:formData.
            // added required parameters
        };
        apiRequest({
            method: 'POST',
            endpoint: '/',
            body: JSON.stringify(reqBody),
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleFieldChange = (field: string, value: any) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleAddNew = () => {
        setShowAddEventHallFields(true);
        setShowEventHallTableInfo(false);
    }

    const handleAddDetails = () => {
        alert("addedddddddd......")
    }


    const eventHallInfoTable = () => {
        return (
            <div className={styles.eventHallTableContainer}>
                <div className={styles.subContainer}>
                    <Typography className={styles.header}>Event Hall Information</Typography>
                    <CommonButton className={styles.addnewButton} onClick={handleAddNew}>
                        Add New
                    </CommonButton>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={eventHallInfoDetails} tableRef={tableRef} />
                </div>
            </div>
        )
    }

    const minHours = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    value={formData.minHours}
                    onChange={(e) => {
                        setErrorMessage({ ...errorMessage, minHours: '' });
                        handleFieldChange('minHours', e.target.value);
                    }}
                    className={errorMessage.minHours ? styles.errorTextFeild : ""}
                >
                    {minHoursList.map((item, index: number) => (
                        <MenuItem key={index} value={item.minHour}>
                            {item.minHour}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.minHours && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.minHours}</Typography>
                )}
            </FormControl>
        );
    };


    const minMinutes = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    value={formData.minMinute}
                    onChange={(e) => {
                        setErrorMessage({ ...errorMessage, minMinute: '' });
                        handleFieldChange('minMinute', e.target.value);
                    }}
                    className={errorMessage.minMinute ? styles.errorTextFeild : ""}
                >
                    {minMinutesList.map((item, index: number) => (
                        <MenuItem key={index} value={item.minutes}>
                            {item.minutes}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.minMinute && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.minMinute}</Typography>
                )}
            </FormControl>
        );
    };

    const incomeAccount = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    value={formData.incomeAccounts}
                    onChange={(e) => {
                        setErrorMessage({ ...errorMessage, incomeAccounts: '' });
                        handleFieldChange('incomeAccounts', e.target.value);
                    }}
                    className={errorMessage.incomeAccounts ? styles.errorTextFeild : ""}
                >
                    {hoursList.map((item, index: number) => (
                        <MenuItem key={index} value={item.hour}>
                            {item.hour}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.incomeAccounts && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.incomeAccounts}</Typography>
                )}
            </FormControl>
        );
    };

    const addEventHallInfoFields = () => {
        return (
            <div>
                <Typography className={styles.header}>Add Donation Type</Typography>
                <Card className={styles.cardConatiner}>
                    <Grid sx={{ marginTop: "0px", display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column" }}>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Hall Name</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.hallName}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, hallName: '' });
                                        handleFieldChange('hallName', e.target.value);
                                    }}
                                    className={errorMessage.hallName ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.hallName && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.hallName}</Typography>
                                )}
                            </Grid>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Description</CustomInputLabel>
                                <TextareaAutosize
                                    style={{ padding: "14px 717px 55px 16px", backgroundColor: "#fff9e4", border: "none", borderRadius: "8px" }}
                                    required
                                    value={formData.description}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, description: '' });
                                        handleFieldChange('description', e.target.value);
                                    }}
                                    className={errorMessage.description ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.description && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.description}</Typography>
                                )}
                            </Grid>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Capacity</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.capacity}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, capacity: '' });
                                        handleFieldChange('capacity', e.target.value);
                                    }}
                                    className={errorMessage.capacity ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.capacity && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.capacity}</Typography>
                                )}
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: "0px", padding: "0px 0px 0px 16px" }}>
                                <Grid item xs={12} sm={1.5}>
                                    <CustomInputLabel>Min Hour</CustomInputLabel>
                                    {minHours()}
                                </Grid>
                                <Grid item xs={12} sm={1.5}>
                                    <CustomInputLabel>Min Mins</CustomInputLabel>
                                    {minMinutes()}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginTop: "0px", }}>
                            <Grid item xs={12} sm={3}>
                                <CustomInputLabel>Min Fee</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.minutesFee}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, minutesFee: '' });
                                        handleFieldChange('minutesFee', e.target.value);
                                    }}
                                    className={errorMessage.minutesFee ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.minutesFee && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.minutesFee}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <CustomInputLabel>Hourly Fee</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.hourlyFee}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, hourlyFee: '' });
                                        handleFieldChange('hourlyFee', e.target.value);
                                    }}
                                    className={errorMessage.hourlyFee ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.hourlyFee && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.hourlyFee}</Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginTop: "0px", }}>
                            <Grid item xs={12} sm={3}>
                                <CustomInputLabel>Setup & Cleaning</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.setUpCleaning}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, setUpCleaning: '' });
                                        handleFieldChange('setUpCleaning', e.target.value);
                                    }}
                                    className={errorMessage.setUpCleaning ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.setUpCleaning && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.setUpCleaning}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <CustomInputLabel>Security Deposit</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.securityDesposit}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, securityDesposit: '' });
                                        handleFieldChange('securityDesposit', e.target.value);
                                    }}
                                    className={errorMessage.securityDesposit ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.securityDesposit && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.securityDesposit}</Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginTop: "0px", }}>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Cancellaion Fee</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.cancelationFee}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, cancelationFee: '' });
                                        handleFieldChange('cancelationFee', e.target.value);
                                    }}
                                    className={errorMessage.cancelationFee ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.cancelationFee && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.cancelationFee}</Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginTop: "0px", }}>
                            <Grid item xs={12} sm={3}>
                                <CustomInputLabel>Income Account</CustomInputLabel>
                                {incomeAccount()}
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                <CommonButton sx={{ marginTop: "10px", }} className={styles.addnewButton} onClick={handleSave}>
                    Add
                </CommonButton>
            </div>
        )
    }

    return (
        <div className={styles.mainContainer}>
            {showEventHallTableInfo ? eventHallInfoTable() : ''}
            {showAddEventHallFields ? addEventHallInfoFields() : ''}
        </div>
    )
}

export default EventHalls