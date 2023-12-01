import { Card, Typography, Grid, TextareaAutosize, FormControl, MenuItem, RadioGroup, FormControlLabel } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './poojaDetails.module.scss';
import { CommonButton, CustomInputLabel, CustomRadioButton, CustomSelect, CustomTextFeild } from 'components/common/StyledComponents/StyledFields';
import { object, string, ValidationError } from 'yup';
import { apiRequest } from 'infrastructure/backendService';


type ErrorMessageTypes = {
    poojaTitle: string;
    description: string;
    requiredHours: string;
    requiredMins: string;
    suggestedDonation: string;
    incomeAccounts: string;
};

const PoojaDetails = () => {
    const tableRef = useRef(null);
    const [showPoojaDetailsFields, setShowPoojaDetailsFields] = useState<boolean>(false);
    const [showPoojaDetailsPage, setShowPoojaDetailsPage] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        poojaTitle: '',
        description: '',
        requiredHours: '',
        requiredMins: '',
        suggestedDonation: '',
        incomeAccounts: '',
    });
    const [formData, setFormData] = useState({
        poojaTitle: '',
        description: '',
        requiredHours: '',
        requiredMins: '',
        suggestedDonation: '',
        incomeAccounts: '',
    });

    const validationSchema = object().shape({
        poojaTitle: string().required('Pooja Title is required'),
        description: string().required('Description is required'),
        requiredHours: string().required('Hour is required'),
        requiredMins: string().required('Min  is required'),
        suggestedDonation: string().required('Suggested Donation is required'),
        incomeAccounts: string().required('Income Account is required')
    });

    const priestSeniorityDetails = [
        {
            "Name of the Pooja": "Ashtottara Archana (All Deities)",
            "Time": "15min",
            "Donation (in dollors)": "51",
            "Priest": "No",
            "For Devotee": "Yes",
            "Action": (
                <div style={{ display: "flex" }}>
                    <EditIcon className={styles.editAnddeleteIcon} />
                    <DeleteIcon className={styles.editAnddeleteIcon} />
                </div>
            ),
        },
        {
            "Name of the Pooja": "Ashtottara Archana (All Deities)",
            "Time": "25min",
            "Donation (in dollors)": "100",
            "Priest": "No",
            "For Devotee": "Yes",
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

    const handleSave = async (): Promise<void> => {

        const errors: ErrorMessageTypes = {
            poojaTitle: '',
            description: '',
            requiredHours: '',
            requiredMins: '',
            suggestedDonation: '',
            incomeAccounts: '',
        };

        try {
            // Validate the form data against the validation schema
            await validationSchema.validate(formData, { abortEarly: false });
            // If validation passes, you can submit the form
            setErrorMessage(errors);
            alert('Details Saved Successful');

            // Call your API or perform other actions here
            //  saveApiCall();

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
            poojaTitle: formData.poojaTitle,
            description: formData.description,
            requiredHours: formData.requiredHours,
            requiredMins: formData.requiredMins,
            suggestedDonation: formData.suggestedDonation,
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


    const handleAddPoojaDetails = () => {
        setShowPoojaDetailsPage(false);
        setShowPoojaDetailsFields(true);
    }

    const handleAddDetails = () => {
        alert("Poja Details Added")
    }

    const radioButtons = (): React.ReactElement => {
        return (
            <RadioGroup className={styles.formGroup}>
                <FormControlLabel value="yes" control={<CustomRadioButton sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} />} label={<span style={{ fontSize: 14 }}>Yes</span>} />
                <FormControlLabel value="no" control={<CustomRadioButton sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} />} label={<span style={{ fontSize: 14 }}>No</span>} />
            </RadioGroup>
        )
    }

    const poojaDetailsPage = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.subTitle}>Pooja Details</Typography>
                    <CommonButton className={styles.addnewButton} onClick={handleAddPoojaDetails}>
                        Add New
                    </CommonButton>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={priestSeniorityDetails} tableRef={tableRef} />
                </div>
            </div>
        );
    };

    const timeRequiredHours = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    value={formData.requiredHours}
                    onChange={(e) => {
                        setErrorMessage({ ...errorMessage, requiredHours: '' });
                        handleFieldChange('requiredHours', e.target.value);
                    }}
                    className={errorMessage.requiredHours ? styles.errorTextFeild : ""}
                >
                    {hoursList.map((item, index: number) => (
                        <MenuItem key={index} value={item.hour}>
                            {item.hour}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.requiredHours && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.requiredHours}</Typography>
                )}
            </FormControl>
        );
    };

    const timeRequiredMinutes = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    value={formData.requiredMins}
                    onChange={(e) => {
                        setErrorMessage({ ...errorMessage, requiredMins: '' });
                        handleFieldChange('requiredMins', e.target.value);
                    }}
                    className={errorMessage.requiredMins ? styles.errorTextFeild : ""}
                >
                    {hoursList.map((item, index: number) => (
                        <MenuItem key={index} value={item.hour}>
                            {item.hour}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.requiredMins && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.requiredMins}</Typography>
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

    const poojaDetailsFields = () => {
        return (
            <div>
                <Typography className={styles.header}>Pooja Details</Typography>
                <Card className={styles.cardConatiner}>
                    <Grid sx={{ display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column" }}>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Pooja Title</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.poojaTitle}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, poojaTitle: '' });
                                        handleFieldChange('poojaTitle', e.target.value);
                                    }}
                                    className={errorMessage.poojaTitle ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.poojaTitle && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.poojaTitle}</Typography>
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
                        </Grid>
                        <Grid container spacing={2} sx={{ marginTop: "0px", }}>
                            <Grid item xs={12} sm={3}>
                                <CustomInputLabel>Time Required Hours</CustomInputLabel>
                                {timeRequiredHours()}
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <CustomInputLabel>Time Required Minutes</CustomInputLabel>
                                {timeRequiredMinutes()}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginTop: "0px", }}>
                            <Grid item xs={12} sm={3}>
                                <CustomInputLabel>Priest Required?</CustomInputLabel>
                                {radioButtons()}
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <CustomInputLabel>For Devotee</CustomInputLabel>
                                {radioButtons()}
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
            {showPoojaDetailsPage ? poojaDetailsPage() : ''}
            {showPoojaDetailsFields ? poojaDetailsFields() : ''}
        </div>
    )
}

export default PoojaDetails