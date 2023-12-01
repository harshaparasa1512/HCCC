import { Card, FormControl, Grid, MenuItem, TextareaAutosize, Typography } from '@mui/material'
import styles from './sponsorship.module.scss';
import { CommonButton, CustomCalendarTodayOutlinedIcon, CustomDatePicker, CustomInputLabel, CustomSelect, CustomTextFeild, StyledDateContainer } from 'components/common/StyledComponents/StyledFields';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { object, string, ValidationError } from 'yup';
import { apiRequest } from 'infrastructure/backendService';
import dayjs from 'dayjs';

interface ErrorMessageTypes  {
    donationPurposes: string;
    title: string;
    description: string;
    amountInDollars: string;
    startDate: string;
    donationPurposesName: string;
};

interface ErrorMessageDevottee  {
    registedDevoteeLink: string,
    newDevoteeLink: string,
};

const Sponsorship = () => {
    const [showAddDonationFields, setShowAddDonationFields] = useState<boolean>(false);
    const [showSponsorshipCard, setShowSponsorshipCard] = useState<boolean>(true);
    const [showDevotteeLinks, setShowDevotteeLinks] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        donationPurposes: '',
        title: '',
        description: '',
        amountInDollars: '',
        startDate: '',
        donationPurposesName: '',
    });
    const [errorDevotteeMessage, setDevotteeErrorMessage] = useState<ErrorMessageDevottee>({
        registedDevoteeLink: '',
        newDevoteeLink: '',
    });
    const [formData, setFormData] = useState({
        donationPurposes: '',
        title: '',
        description: '',
        amountInDollars: '',
        startDate: '',
        donationPurposesName: '',
    });

    const [devoteeFormData, setDevoteeFormData] = useState({
        registedDevoteeLink: '',
        newDevoteeLink: '',
    });

    const validationSchema = object().shape({
        donationPurposes: string().required('Donation Purpose is required'),
        title: string().required('Title is required'),
        description: string().required('Description is required'),
        amountInDollars: string().required('Amount In Dollars is required'),
        startDate: string().required('Date is required'),
        donationPurposesName: string().required('Donation Purpose is required')
    });

    const validationSchemaDevotteeLinks = object().shape({
        registedDevoteeLink: string().required('Register Devottee Link is required'),
        newDevoteeLink: string().required('New Devottee Link is required')
    });

    const donationDetailsList = [
        {
            account: '0',
        },
        {
            account: '1',
        },
        {
            account: '2',
        },
        {
            account: '3',
        },
    ];

    const handleSave = async (): Promise<void> => {

        const errors: ErrorMessageTypes = {
            donationPurposes: '',
            title: '',
            description: '',
            amountInDollars: '',
            startDate: '',
            donationPurposesName: '',
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
            donationPurposes: formData.donationPurposes,
            title: formData.title,
            description: formData.description,
            amountInDollars: formData.amountInDollars,
            startDate: formData.startDate,
            donationPurposesName: formData.donationPurposesName,
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

    const handleAddDevotteeLink = async (): Promise<void> => {

        const errors: ErrorMessageDevottee = {
            registedDevoteeLink: '',
            newDevoteeLink: '',
        };

        try {
            // Validate the form data against the validation schema
            await validationSchemaDevotteeLinks.validate(devoteeFormData, { abortEarly: false });
            // If validation passes, you can submit the form
            setDevotteeErrorMessage(errors);
            alert('Details Saved Successful');
            handleSponsorship()

            // Call your API or perform other actions here
            // addSponsorshipApiCall();

        } catch (error: any) {
            // Handle validation errors

            if (error instanceof ValidationError) {
                error.inner.forEach((e: any) => {
                    if (e.path) {
                        errors[e.path as keyof ErrorMessageDevottee] = e.message;
                    }
                });
            }
            setDevotteeErrorMessage(errors);
        }
    };

    const addSponsorshipApiCall = () => {
        const reqBody = {
            registedDevoteeLink: devoteeFormData.registedDevoteeLink,
            newDevoteeLink: devoteeFormData.newDevoteeLink,
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

    const handleSponsorship = () => {
        setShowAddDonationFields(true);
        setShowSponsorshipCard(false);
    }

    const handleDropdownChange = (field: string, value: any) => {
        if (value === '') {
            setShowDevotteeLinks(false);
            console.log("falseeeee.....")
        } else {
            setShowDevotteeLinks(true);
            console.log("trueeeeeee.....")
        }
        setFormData({
            ...formData,
            [field]: value,
        });
    }

    const handleDevotteeFieldChange = (field: string, value: any) => {
        setDevoteeFormData({
            ...devoteeFormData,
            [field]: value,
        });
    };



    const donationPurposeDropdown = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    value={formData.donationPurposes}
                    onChange={(e) => {
                        setErrorMessage({ ...errorMessage, donationPurposes: '' });
                        handleDropdownChange('donationPurposes', e.target.value);
                    }}
                    className={errorMessage.donationPurposes ? styles.errorTextFeild : ""}
                >
                    {donationDetailsList.map((item, index: number) => (
                        <MenuItem key={index} value={item.account}>
                            {item.account}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.donationPurposes && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.donationPurposes}</Typography>
                )}
            </FormControl>
        );
    };

    const registeredAndNewDevotteeLinks = () => {
        return (
            <div>
                <p style={{ padding: "0px 0px 0px 20px" }}>Please copy the following links (for registered devotees and unregistered devotees) separately, and paste them in the 'event flyer' at the appropriate location. This event flyer is associated with the scrolling message. For registered devotees (for the link 'click here') copy the link named 'Registered Devotee Link'. For the devotees who has to register (for the link 'clicking here'), copy the link named 'New Devotee Link'.</p>
                <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", padding: "20px" }}>
                    <Grid xs={12} sm={3} item>
                        <CustomInputLabel>Register Devotte Link</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={devoteeFormData.registedDevoteeLink}
                            onChange={(e) => {
                                setDevotteeErrorMessage({ ...errorDevotteeMessage, registedDevoteeLink: '' });
                                handleDevotteeFieldChange('registedDevoteeLink', e.target.value);
                            }}
                            className={errorDevotteeMessage.registedDevoteeLink ? styles.errorTextFeild : ""}
                        />
                        {errorDevotteeMessage.registedDevoteeLink && (
                            <Typography sx={{ color: "red", fontSize: "12px" }}>{errorDevotteeMessage.registedDevoteeLink}</Typography>
                        )}
                    </Grid>
                    <Grid xs={12} sm={3} item>
                        <CustomInputLabel>New Devotte Link</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={devoteeFormData.newDevoteeLink}
                            onChange={(e) => {
                                setDevotteeErrorMessage({ ...errorDevotteeMessage, newDevoteeLink: '' });
                                handleDevotteeFieldChange('newDevoteeLink', e.target.value);
                            }}
                            className={errorDevotteeMessage.newDevoteeLink ? styles.errorTextFeild : ""}
                        />
                        {errorDevotteeMessage.newDevoteeLink && (
                            <Typography sx={{ color: "red", fontSize: "12px" }}>{errorDevotteeMessage.newDevoteeLink}</Typography>
                        )}
                    </Grid>
                </Grid>

            </div>
        )
    }

    const sponsorshipCard = () => {
        return (
            <div>
                <Typography className={styles.header}>Sponsorship</Typography>
                <p>You can add, modify or delete the sponsorships for a income account. Please select the name of a income account from the drop down box below. Once you select the name of the income account, it will show the existing sponsorships for that particular income account. You can add sponsorships.
                    To modify an existing sponsorship, select the corresponding sponsorship by selecting the radio button and clicking on the 'Modify sponsorship' button.
                    To delete an existing sponsorship, select the corresponding sponsorship by checking the 'delete' box and clicking on the 'Delete' button.</p>
                <Card className={styles.cardConatiner}>
                    <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Grid item xs={12} sm={3}>
                            <CustomInputLabel>Donation Purpose</CustomInputLabel>
                            {donationPurposeDropdown()}
                        </Grid>
                    </Grid>
                    {showDevotteeLinks ? registeredAndNewDevotteeLinks() : ''}
                </Card>
                {showDevotteeLinks ?
                    <CommonButton className={styles.addnewButton} onClick={handleAddDevotteeLink}>
                        Add Sponsorship
                    </CommonButton> : ''}
            </div>
        )
    }

    const BasicDatePicker = (): React.ReactElement => {
        return (
            <div style={{ minWidth: '100%' }}>
                <StyledDateContainer sx={{ backgroundColor: "#FFF9E4", borderRadius: "8px", height: "48px" }}>
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
                                    formData.startDate ? dayjs(formData.startDate, 'MM-DD-YYYY') : ''
                                }
                                onChange={(value) => {
                                    setErrorMessage({ ...errorMessage, startDate: '' });
                                    handleFieldChange('dateOfBirth', value);
                                }}
                                className={errorMessage.startDate ? styles.errorTextFeild : ""}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.startDate ? (
                        <Typography sx={{ color: 'red', fontSize: '12px' }}>
                            {errorMessage.startDate}
                        </Typography>
                    ) : (
                        ''
                    )}
                </StyledDateContainer>
            </div>
        );
    };

    const addDonationFields = () => {
        return (
            <div>
                <Typography className={styles.header}>Add Donation Type</Typography>
                <Card className={styles.cardConatiner}>
                    <Grid sx={{ marginTop: "0px", display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column" }}>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Donation Purpose</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.donationPurposesName}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, donationPurposesName: '' });
                                        handleFieldChange('donationPurposesName', e.target.value);
                                    }}
                                    className={errorMessage.donationPurposesName ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.donationPurposesName && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.donationPurposesName}</Typography>
                                )}
                            </Grid>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Title</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.title}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, title: '' });
                                        handleFieldChange('title', e.target.value);
                                    }}
                                    className={errorMessage.title ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.title && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.title}</Typography>
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
                                <CustomInputLabel>Amount in dollars</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.amountInDollars}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, amountInDollars: '' });
                                        handleFieldChange('amountInDollars', e.target.value);
                                    }}
                                    className={errorMessage.amountInDollars ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.amountInDollars && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.amountInDollars}</Typography>
                                )}
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: '0px', padding: "0px 0px 0px 20px" }}>
                                <Grid item xs={12} sm={3}>
                                    <CustomInputLabel>Start Date</CustomInputLabel>
                                    {BasicDatePicker()}
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <CustomInputLabel>End Date</CustomInputLabel>
                                    {BasicDatePicker()}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                <CommonButton className={styles.addnewButton} onClick={handleSave}>
                    Submit
                </CommonButton>
            </div>
        )
    }

    return (
        <div className={styles.mainContainer}>
            {showSponsorshipCard ? sponsorshipCard() : ''}
            {showAddDonationFields ? addDonationFields() : ''}
        </div>
    )
}

export default Sponsorship