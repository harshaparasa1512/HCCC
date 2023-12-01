import styles from './familyDetails.module.scss';
import { Grid, TextField, styled, Typography } from '@mui/material';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import commonStyles from '../../../../App.module.scss';
import { CustomCalendarTodayOutlinedIcon, CustomDatePicker, CustomInputLabel, StyledDateContainer } from 'components/common/StyledComponents/StyledFields';
import { apiRequest } from 'infrastructure/backendService';
import { object, string, ref, ValidationError } from 'yup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const CustomTextFeild = styled(TextField)`
   & input {
      padding: 8px;
      height: 25px;
   }
   & fieldset {
      border-style: unset;
   }
`;


const CustomSelect = styled(Select)`
    & svg {
      color: #F05802;
    }
    & div {
      overflow: unset;
      padding: 8px;
      border-radius: 8px;
      background:#FFF9E4;
      min-width: 0 !important;
    }
   & input {
      padding: 8px;
      height: 25px;
   }
   & fieldset {
      border-style: unset;
   }
`;


interface ErrorMessageTypes {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    relation: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    email: string;
    contactNo: string;
}

export default function FamilyDetails() {
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        relation: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        contactNo: '',
        email: '',
    });

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        relation: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        contactNo: '',
        email: '',
    });

    const validationSchema = object().shape({
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        middleName: string().required('Middle Name is required'),
        dateOfBirth: string().required('DOB is required'),
        relation: string().required('relation is required'),
        email: string().email('Invalid email address').required('Email is required'),
        address: string().required('Address is required'),
        country: string().required('Country is required'),
        city: string().required('city is required'),
        state: string().required('state is required'),
        zipcode: string().required('zipcode is required'),
        contactNo: string().required('Phone Number is required'),
    });

    const handleCancel = () => {
        setFormData({
            firstName: '',
            middleName: '',
            lastName: '',
            dateOfBirth: '',
            relation: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            contactNo: '',
            email: '',

        });
    }

    const saveApiCall = () => {
        const reqBody = {
            firstname: formData.firstName,
            middleName: formData.middleName,
            lastname: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            relation: formData.relation,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipcode: formData.zipcode,
            country: formData.country,
            phoneWork: formData.contactNo,
            email: formData.email,
            // dateOfRegistration : "",
            // relation:'',
            // updateDate : "",
        };
        apiRequest({
            method: 'POST',
            endpoint: 'http://localhost:9005/devotee-management/familyMembers',
            body: JSON.stringify(reqBody),
            includeToken: true,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleFieldChange = (field: string, value: any) => {
        if (field === 'dateOfBirth' || field === 'weddinganniversary') {
            const formattedDate = dayjs(value, 'MM-DD-YYYY');

            setFormData({
                ...formData,
                [field]: formattedDate.isValid() ? formattedDate.format('MM-DD-YYYY') : '',
            });
            console.log(dayjs(value).format('MM-DD-YYYY'));
        } else {
            setFormData({
                ...formData,
                [field]: value,
            });
        }
    };

    const handleSave = async (): Promise<void> => {
        const errors: ErrorMessageTypes = {
            firstName: '',
            middleName: '',
            lastName: '',
            dateOfBirth: '',
            relation: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            contactNo: '',
            email: '',
        };

        try {
            // Validate the form data against the validation schema
            await validationSchema.validate(formData, { abortEarly: false });
            // If validation passes, you can submit the form
            setErrorMessage(errors);
            // alert('Registration Successful');
            // Call your API or perform other actions here
            saveApiCall();
            // console.log("Register Successful")
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

    const handleButtons = () => {
        return (
            <div>
                <button className={commonStyles.cancelButton} onClick={handleCancel}>Cancel</button>
                <button className={commonStyles.saveButton} onClick={handleSave}>Save</button>
            </div>
        )
    }

    const BasicDatePicker = (): React.ReactElement => {
        return (
            <div style={{ minWidth: '100%', marginTop: '12px' }}>
                <StyledDateContainer sx={{ backgroundColor: "white", borderRadius: "8px"}}>
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
                                    formData.dateOfBirth ? dayjs(formData.dateOfBirth, 'MM-DD-YYYY') : ''
                                }
                                onChange={(value) => {
                                    setErrorMessage({ ...errorMessage, dateOfBirth: '' });
                                    handleFieldChange('dateOfBirth', value);
                                }}
                                className={errorMessage.dateOfBirth ? styles.errorDateFeild : ""}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.dateOfBirth ? (
                        <Typography sx={{ color: 'red', fontSize: '12px' }}>
                            {errorMessage.dateOfBirth}
                        </Typography>
                    ) : (
                        ''
                    )}
                </StyledDateContainer>
            </div>
        );
    };


    return (
        <div className={styles.BoxContainer}>
            <div className={styles.formContainer}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={3} item>
                        <CustomInputLabel>First Name</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.firstName}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, firstName: '' });
                                handleFieldChange('firstName', e.target.value);
                            }}
                            className={errorMessage.firstName ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.firstName && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.firstName}
                            </Typography>
                        )}
                    </Grid>
                    <Grid xs={12} sm={3} item>
                        <CustomInputLabel>Middle Name</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.middleName}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, middleName: '' });
                                handleFieldChange('middleName', e.target.value);
                            }}
                            className={errorMessage.middleName ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.middleName && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.middleName}
                            </Typography>
                        )}
                    </Grid>
                    <Grid xs={12} sm={3} item>
                        <CustomInputLabel>Last Name</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.lastName}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, lastName: '' });
                                handleFieldChange('lastName', e.target.value);
                            }}
                            className={errorMessage.lastName ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.lastName && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.lastName}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <CustomInputLabel>DOB</CustomInputLabel>
                        {BasicDatePicker()}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <CustomInputLabel>Relation</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.relation}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, relation: '' });
                                handleFieldChange('relation', e.target.value);
                            }}
                            className={errorMessage.relation ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.relation && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.relation}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <CustomInputLabel>Address</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.address}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, address: '' });
                                handleFieldChange('address', e.target.value);
                            }}
                            className={errorMessage.address ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.address && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.address}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <CustomInputLabel>City</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.city}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, city: '' });
                                handleFieldChange('city', e.target.value);
                            }}
                            className={errorMessage.city ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.city && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.city}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <CustomInputLabel>State</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.state}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, state: '' });
                                handleFieldChange('state', e.target.value);
                            }}
                            className={errorMessage.state ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.state && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.state}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <CustomInputLabel>Zipcode</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.zipcode}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, zipcode: '' });
                                handleFieldChange('zipcode', e.target.value);
                            }}
                            className={errorMessage.zipcode ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.zipcode && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.zipcode}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <CustomInputLabel>Country</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.country}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, country: '' });
                                handleFieldChange('country', e.target.value);
                            }}
                            className={errorMessage.country ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.country && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.country}
                            </Typography>
                        )}
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <CustomInputLabel>Contact No</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.contactNo}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, contactNo: '' });
                                handleFieldChange('contactNo', e.target.value);
                            }}
                            className={errorMessage.contactNo ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.contactNo && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.contactNo}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <CustomInputLabel>Email</CustomInputLabel>
                        <CustomTextFeild
                            fullWidth
                            required
                            value={formData.email}
                            onChange={(e) => {
                                setErrorMessage({ ...errorMessage, email: '' });
                                handleFieldChange('email', e.target.value);
                            }}
                            className={errorMessage.email ? styles.errorTextFeild : styles.textField}
                        />
                        {errorMessage.email && (
                            <Typography sx={{ color: 'red', fontSize: '12px' }}>
                                {errorMessage.email}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                <div style={{ display: "flex", float: "right", marginTop: "-40px" }}>
                    {handleButtons()}
                </div>
            </div>
        </div>
    )
}