import { Box, Card, Grid, Typography } from '@mui/material';
import {
    CustomTextFeild,
    CustomInputLabel,
    CommonButton
} from 'components/common/StyledComponents/StyledFields';

import styles from './searchDevotee.module.scss'
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useState } from 'react';
import { object, string, ValidationError } from 'yup';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface ErrorMessageTypes {
    signinName: string;
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    phonenumber: string;
    email: string;
    zipcode: string;
}

const SearchDevotee = () => {

    const [formData, setFormData] = useState({
        signinName: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        email: "",
        city: "",
        state: "",
        zipcode: ""
    })
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        signinName: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        email: "",
        city: "",
        state: "",
        zipcode: "",

    })
    const validationSchema = object().shape({
        signinName: string().required('Sign name is required'),
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        email: string().email('Invalid email address').required('Email is required'),
        phonenumber: string().required('Phone Number is required'),
        city: string().required('City is required'),
        state: string().required('State is required'),
        zipcode: string().required('Zipcode is required'),
    })
    const handleSearch = async () => {
        const errors: ErrorMessageTypes = {
            signinName: "",
            firstName: "",
            lastName: "",
            phonenumber: "",
            email: "",
            city: "",
            state: "",
            zipcode: "",
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
    const searchData = [
        {
            "Sign-In Name": "hemanth",
            Name: "hemu123",
            Address: "Hyd",
            Email: "hyz@gmail.com",
            PhoneNo: "787080890",
            Details: "Details"
        },
        {
            SignInName: "kumar",
            Name: "kumar123",
            Address: "kolkata",
            Email: "kolkata@gmail.com",
            PhoneNo: "787084590",
            Details: "Details"
        },
    ]
    const handleFieldChange = (field: string, value: any) => {

        setFormData({
            ...formData,
            [field]: value,
        });

    };

    return (
        <>
            <div style={{ display: "flex" }}>
                <LeftMainNavigation />
                <div>
                    <div className={styles.BoxContainer}>
                        <Typography component="div" className={styles.typoGraphyHeading}>
                            Devotee Service
                        </Typography>
                        <Typography component="div" className={styles.typoGraphy}>
                            Search Devotee
                        </Typography>
                        <div className={styles.formContainer}>
                            <Card className={styles.cardContainer}>
                                <div style={{ padding: "24px" }}>
                                    <Grid container spacing={2}>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Sign-In Name</CustomInputLabel>
                                            <CustomTextFeild
                                                className={styles.textField}
                                                fullWidth
                                                disabled={true}
                                                placeholder='kriti'
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("signinName", e.target.value);
                                                    setErrorMessage({ ...errorMessage, signinName: '' })
                                                }}
                                            />
                                            {errorMessage.signinName ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.signinName}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>First Name</CustomInputLabel>
                                            <CustomTextFeild
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("firstName", e.target.value)
                                                    setErrorMessage({ ...errorMessage, firstName: '' });
                                                }}
                                            />
                                            {errorMessage.firstName ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.firstName}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Last Name</CustomInputLabel>
                                            <CustomTextFeild
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("lastName", e.target.value)
                                                    setErrorMessage({ ...errorMessage, lastName: '' });
                                                }}
                                            />
                                            {errorMessage.lastName ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.lastName}</Typography> : ''}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>City</CustomInputLabel>
                                            <CustomTextFeild
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("city", e.target.value)
                                                    setErrorMessage({ ...errorMessage, city: '' });
                                                }}
                                            />
                                            {errorMessage.city ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.city}</Typography> : ''}
                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>State</CustomInputLabel>
                                            <CustomTextFeild
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("state", e.target.value)
                                                    setErrorMessage({ ...errorMessage, state: '' });
                                                }}
                                            />
                                            {errorMessage.state ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.state}</Typography> : ''}
                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Zip code</CustomInputLabel>
                                            <CustomTextFeild
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("zipcode", e.target.value)
                                                    setErrorMessage({ ...errorMessage, zipcode: '' });
                                                }}
                                            />
                                            {errorMessage.zipcode ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.zipcode}</Typography> : ''}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Phone Number</CustomInputLabel>
                                            <CustomTextFeild
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("phonenumber", e.target.value)
                                                    setErrorMessage({ ...errorMessage, phonenumber: '' });
                                                }}
                                            />
                                            {errorMessage.phonenumber ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.phonenumber}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Email Id</CustomInputLabel>
                                            <CustomTextFeild
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("email", e.target.value)
                                                    setErrorMessage({ ...errorMessage, email: '' });
                                                }}
                                            />
                                            {errorMessage.email ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.email}</Typography> : ''}
                                        </Grid>
                                    </Grid>
                                </div>
                            </Card>
                        </div>
                        <Box>
                            <Grid xs={12} item>
                                <CommonButton className={styles.search} onClick={handleSearch}>Search</CommonButton>
                            </Grid>
                        </Box>
                        <div className={styles.familyDetails}>
                            <Typography sx={{ marginTop: "20px", marginBottom: "20px" }} component="div" className={styles.typoGraphy}>Special Events</Typography>
                            <GridTableComponent tableData={searchData} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SearchDevotee;
