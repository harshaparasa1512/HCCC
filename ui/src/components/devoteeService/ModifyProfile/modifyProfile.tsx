import { Box, Card, FormControl, Grid, MenuItem, Typography } from '@mui/material';
import {
    CustomTextFeild,
    CustomInputLabel,
    CommonButton,
    CustomTextFeildforFamily,
    CustomSelect,
    CustomEditIcon,
    CustomDeleteIcon
} from 'components/common/StyledComponents/StyledFields';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './modifyProfile.module.scss'
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useState } from 'react';
import commonStyles from 'App.module.scss';
import { object, string, ValidationError } from 'yup';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface ErrorMessageTypes {
    signinName: string;
    firstName: string;
    lastName: string;
    middlename: string;
    firstNameFamilyForm: string;
    lastNameFamilyForm: string;
    middleNameFamilyForm: string;
    weddingAnniversary: string;
    dob: string;
    dobFamilyForm: string;
    city: string;
    preferedLanguage: string;
    state: string;
    nakshatram: string;
    stateFamilyForm: string;
    nakshatramFamilyForm: string;
    gothramFamilyForm: string;
    addressFamilyForm: string;
    countryFamilyForm: string;
    zipcodeFamilyForm: string;
    contactNoFamilyForm: string;
    emailFamilyForm: string;
    cityFamilyForm: string;
    gothram: string;
    address: string;
    country: string;
    zipcode: string;
    relation: string;
    contactNo: string;
    email: string;
}

const ModifyProfile = () => {

    const [formData, setFormData] = useState({
        signinName: "",
        firstName: "",
        lastName: "",
        middlename: "",
        weddingAnniversary: "",
        dob: "",
        preferedLanguage: "",
        nakshatram: "",
        gothram: "",
        contactNo: "",
        email: "",
        address: "",
        zipcode: "",
        country: "",
        city: "",
        state: "",
        nakshatramFamilyForm: "",
        gothramFamilyForm: "",
        addressFamilyForm: "",
        countryFamilyForm: "",
        zipcodeFamilyForm: "",
        contactNoFamilyForm: "",
        emailFamilyForm: "",
        cityFamilyForm: "",
        firstNameFamilyForm: "",
        stateFamilyForm: "",
        lastNameFamilyForm: "",
        middleNameFamilyForm: "",
        dobFamilyForm: "",
        relation: "",
    })
    const handleCancel = () => {
        setFormData({
            signinName: "",
            firstName: "",
            lastName: "",
            middlename: "",
            weddingAnniversary: "",
            dob: "",
            preferedLanguage: "",
            nakshatram: "",
            gothram: "",
            contactNo: "",
            email: "",
            address: "",
            zipcode: "",
            country: "",
            city: "",
            state: "",
            nakshatramFamilyForm: "",
            gothramFamilyForm: "",
            addressFamilyForm: "",
            countryFamilyForm: "",
            zipcodeFamilyForm: "",
            contactNoFamilyForm: "",
            emailFamilyForm: "",
            cityFamilyForm: "",
            stateFamilyForm: "",
            firstNameFamilyForm: "",
            lastNameFamilyForm: "",
            middleNameFamilyForm: "",
            dobFamilyForm: "",
            relation: "",
        })
    }
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        signinName: "",
        firstName: "",
        lastName: "",
        middlename: "",
        weddingAnniversary: "",
        dob: "",
        preferedLanguage: "",
        nakshatram: "",
        gothram: "",
        contactNo: "",
        email: "",
        address: "",
        zipcode: "",
        country: "",
        city: "",
        state: "",
        nakshatramFamilyForm: "",
        gothramFamilyForm: "",
        addressFamilyForm: "",
        countryFamilyForm: "",
        zipcodeFamilyForm: "",
        contactNoFamilyForm: "",
        emailFamilyForm: "",
        cityFamilyForm: "",
        stateFamilyForm: "",
        firstNameFamilyForm: "",
        lastNameFamilyForm: "",
        middleNameFamilyForm: "",
        dobFamilyForm: "",
        relation: "",
    })
    const validationSchema = object().shape({
        signinName: string().required('Sign name is required'),
        firstName: string().required('First Name is required'),
        firstNameFamilyForm: string().required('First Name is required'),
        middlename: string().required('Middle Name is required'),
        middleNameFamilyForm: string().required('Middle Name is required'),
        lastName: string().required('Last Name is required'),
        lastNameFamilyForm: string().required('Last Name is required'),
        zipcode: string().required('Zipcode is required'),
        zipcodeFamilyForm: string().required('Zipcode is required'),
        address: string().required('Address is required'),
        addressFamilyForm: string().required('Address is required'),
        dob: string().required('DOB is required'),
        dobFamilyForm: string().required('DOB is required'),
        relation: string().required('Relation is required'),
        email: string().email('Invalid email address').required('Email is required'),
        emailFamilyForm: string().email('Invalid email address').required('Email is required'),
        contactNo: string().required('Contact Number is required'),
        contactNoFamilyForm: string().required('Contact Number is required'),
        city: string().required('City is required'),
        cityFamilyForm: string().required('City is required'),
        weddingAnniversary: string().required('Wedding Anniversary is required'),
        nakshatram: string().required('Nakshatram is required'),
        nakshatramFamilyForm: string().required('Nakshatram is required'),
        gothram: string().required('Gothram is required'),
        gothramFamilyForm: string().required('Gothram is required'),
        preferedLanguage: string().required('Preferedlanguage is required'),
        country: string().required('Country is required'),
        countryFamilyForm: string().required('Country is required'),
        state: string().required('State is required'),
        stateFamilyForm: string().required('State is required'),
    })
    const handleSearch = async () => {
        const errors: ErrorMessageTypes = {
            signinName: "",
            firstName: "",
            lastName: "",
            middlename: "",
            weddingAnniversary: "",
            dob: "",
            preferedLanguage: "",
            nakshatram: "",
            gothram: "",
            contactNo: "",
            email: "",
            address: "",
            zipcode: "",
            country: "",
            city: "",
            state: "",
            nakshatramFamilyForm: "",
            gothramFamilyForm: "",
            addressFamilyForm: "",
            stateFamilyForm: "",
            countryFamilyForm: "",
            zipcodeFamilyForm: "",
            contactNoFamilyForm: "",
            emailFamilyForm: "",
            cityFamilyForm: "",
            firstNameFamilyForm: "",
            lastNameFamilyForm: "",
            middleNameFamilyForm: "",
            dobFamilyForm: "",
            relation: "",
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
    const specialEventData = [
        {
            Event: "Perform Birthday Archana",
            Date: "july 19",
            Email: "hyz@gmail.com",
            Relation: "father",
            Action: (
                <div>
                    <CustomEditIcon />
                    <CustomDeleteIcon />
                </div>
            ),
        },
        {
            Event: "Subscribe to weekly Email?",
            Date: "---",
            Email: "hyz@gmail.com",
            Relation: "father",
            Action: (
                <div>
                    <CustomEditIcon />
                    <CustomDeleteIcon />
                </div>
            ),
        },
    ]
    const handleFieldChange = (field: string, value: any) => {

        setFormData({
            ...formData,
            [field]: value,
        });

    };
    const NakshatraList = [
        {
            label: 'Ashvini',
        },
        {
            label: 'Bharani',
        },
        {
            label: 'Krithika',
        },
        {
            label: 'Rohini',
        },
        {
            label: 'Mrigashirsha',
        },
        {
            label: 'Ardra',
        },
        {
            label: 'Punarvasu',
        },
        {
            label: 'Pushya',
        },
        {
            label: 'Ashlesha',
        },
        {
            label: 'Magha',
        },
        {
            label: 'Purva Phalguni',
        },
        {
            label: 'Uttara Phalguni',
        },
        {
            label: 'Hasta',
        },
        {
            label: 'Chitra',
        },
        {
            label: 'Swati',
        },
        {
            label: 'Vishakha',
        },
        {
            label: 'Anuradha',
        },
        {
            label: 'Jyeshtha',
        },
        {
            label: 'Mula',
        },
        {
            label: 'Purva Ashadha',
        },
        {
            label: 'Uttara Ashadha',
        },
        {
            label: 'Shravana',
        },
        {
            label: 'Dhanishtha',
        },
        {
            label: 'Shatabhisha',
        },
        {
            label: 'Purva Bhadrapada',
        },
        {
            label: 'Uttara Bhadrapada',
        },
        {
            label: 'Revati',
        },
    ];

    const gothramList = [
        {
            label: 'gothramName',
        },
        {
            label: 'gothramName',
        },
        {
            label: 'gothramName',
        },
        {
            label: 'gothramName',
        },
        {
            label: 'gothramName',
        },
        {
            label: 'gothramName',
        },
    ];
    const preferredLanguageList = [
        {
            label: 'English',
        },
        {
            label: 'Hindi',
        },
        {
            label: "Telugu",
        }
    ]
    const nakshatramDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    value={formData.nakshatram}
                    onChange={(e) => {
                        handleFieldChange('nakshatram', e.target.value)
                        setErrorMessage({ ...errorMessage, nakshatram: "" })
                    }}
                >
                    {NakshatraList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.nakshatram ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.nakshatram}</Typography> : ''}
            </FormControl>
        );
    };
    const gothramDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Gothram"
                    value={formData.gothram}
                    onChange={(e) => {
                        handleFieldChange('gothram', e.target.value)
                        setErrorMessage({ ...errorMessage, gothram: "" })
                    }}
                >
                    {gothramList.map((item, index) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.gothram ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.gothram}</Typography> : ''}
            </FormControl>
        );
    };
    const nakshatramDropdownForAddfamily = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    value={formData.nakshatramFamilyForm}
                    onChange={(e) => {
                        handleFieldChange('nakshatramFamilyForm', e.target.value)
                        setErrorMessage({ ...errorMessage, nakshatramFamilyForm: "" })
                    }
                    }
                >
                    {NakshatraList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.nakshatramFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.nakshatramFamilyForm}</Typography> : ''}
            </FormControl>
        );
    };
    const gothramDropdownForAddFamily = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Gothram"
                    value={formData.gothramFamilyForm}
                    onChange={(e) => {
                        handleFieldChange('gothramFamilyForm', e.target.value);
                        setErrorMessage({ ...errorMessage, gothramFamilyForm: "" })
                    }}
                >
                    {gothramList.map((item, index) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.gothramFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.gothramFamilyForm}</Typography> : ''}
            </FormControl >
        );
    };
    const preferredLangualistDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Select Pooja Location'
                    value={formData.preferedLanguage}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('preferedLanguage', e.target.value);
                        setErrorMessage({ ...errorMessage, preferedLanguage: "" })
                    }}
                >
                    {preferredLanguageList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.preferedLanguage ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.preferedLanguage}</Typography> : ''}
            </FormControl>
        )
    }
    const handleButtons = () => {
        return (
            <div>
                <button className={commonStyles.cancelButton} onClick={handleCancel}>
                    Cancel
                </button>
                <button className={commonStyles.saveButton} onClick={handleSearch}>
                    Add Family
                </button>
            </div>
        );
    };
    return (
        <>
            <div style={{display:"flex"}}>
                <LeftMainNavigation/>
                <div className={styles.BoxContainer}>
                    <Typography component="div" className={styles.typoGraphyHeading}>
                        Devotee Service
                    </Typography>
                    <div className={styles.formContainer}>
                        <Typography component="div" className={styles.typoGraphy}>
                            Modify Profile
                        </Typography>
                        <Card className={styles.cardContainer}>
                            <div style={{ padding: "24px" }}>
                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Sign-In Name</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            disabled={true}
                                            placeholder='kritii'
                                            onChange={(e) => {
                                                handleFieldChange("signinName", e.target.value);
                                                setErrorMessage({ ...errorMessage, signinName: '' })
                                            }}
                                        />
                                        {errorMessage.signinName ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.signinName}</Typography> : ''}

                                    </Grid>
                                </Grid>
                                <Typography component="div" className={styles.typoGraphy}>
                                    Basic Information
                                </Typography>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
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
                                        <CustomInputLabel>Middel Name</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            sx={{ margin: "0 auto" }}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("middlename", e.target.value)
                                                setErrorMessage({ ...errorMessage, middlename: '' });
                                            }}
                                        />
                                        {errorMessage.middlename ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.middlename}</Typography> : ''}

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
                                        <CustomInputLabel>DOB</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.dateField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("dob", e.target.value)
                                                setErrorMessage({ ...errorMessage, dob: '' });
                                            }}
                                        />
                                        {errorMessage.dob ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.dob}</Typography> : ''}
                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Wedding Anniversary</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.dateField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("weddingAnniversary", e.target.value)
                                                setErrorMessage({ ...errorMessage, weddingAnniversary: '' });
                                            }}
                                        />
                                        {errorMessage.weddingAnniversary ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.weddingAnniversary}</Typography> : ''}

                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Prefered Language</CustomInputLabel>
                                        {preferredLangualistDropdown()}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Nakshatram</CustomInputLabel>
                                        {nakshatramDropdown()}
                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Gothram</CustomInputLabel>
                                        {gothramDropdown()}
                                    </Grid>
                                </Grid>
                                <Typography component="div" className={styles.typoGraphy}>
                                    Contact Info
                                </Typography>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Address</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("address", e.target.value)
                                                setErrorMessage({ ...errorMessage, address: '' });
                                            }}
                                        />
                                        {errorMessage.address ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.address}</Typography> : ''}

                                    </Grid>
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
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>ZipCode</CustomInputLabel>
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
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Country</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("country", e.target.value)
                                                setErrorMessage({ ...errorMessage, country: '' });
                                            }}
                                        />
                                        {errorMessage.country ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.country}</Typography> : ''}

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Contact No</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("contactNo", e.target.value)
                                                setErrorMessage({ ...errorMessage, contactNo: '' });
                                            }}
                                        />
                                        {errorMessage.contactNo ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.contactNo}</Typography> : ''}

                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Email</CustomInputLabel>
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
                </div>

            </div>
            <div className={styles.familyDetails}>
                <Typography sx={{ marginTop: "20px", marginBottom: "20px" }} component="div" className={styles.typoGraphy}>Special Events</Typography>
                <GridTableComponent tableData={specialEventData} />
            </div>
            <Box>
                <Grid xs={12} item>
                    <CommonButton className={styles.search} onClick={handleSearch}>Add More</CommonButton>
                </Grid>
            </Box>
            <Grid>
                <Typography component="div" className={styles.typoGraphyHeading} sx={{ marginTop: "15px" }}>
                    Family Member
                </Typography>
                <div>
                    <div className={styles.BoxContainerforfamily}>
                        <div className={styles.formContainerfamily}>
                            <Card className={styles.cardContainerfamily}>
                                <div style={{ padding: "24px 44px 18px 24px" }}>
                                    <Grid container spacing={2}>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>First Name</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("firstNameFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, firstNameFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.firstNameFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.firstNameFamilyForm}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Middel Name</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("middleNameFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, middleNameFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.middleNameFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.middleNameFamilyForm}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Last Name</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("lastNameFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, lastNameFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.lastNameFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.lastNameFamilyForm}</Typography> : ''}

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>DOB</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("dobFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, dobFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.dobFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.dobFamilyForm}</Typography> : ''}
                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Relation</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("relation", e.target.value)
                                                    setErrorMessage({ ...errorMessage, relation: '' });
                                                }}
                                            />
                                            {errorMessage.relation ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.relation}</Typography> : ''}

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Address</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("addressFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, addressFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.addressFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.addressFamilyForm}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>City</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("cityFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, cityFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.cityFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.cityFamilyForm}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>State</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("stateFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, stateFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.stateFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.stateFamilyForm}</Typography> : ''}

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>ZipCode</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("zipcodeFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, zipcodeFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.zipcodeFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.zipcodeFamilyForm}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Country</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("countryFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, countryFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.countryFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.countryFamilyForm}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Contact No</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("contactNoFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, contactNoFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.contactNoFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.contactNoFamilyForm}</Typography> : ''}

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Email</CustomInputLabel>
                                            <CustomTextFeildforFamily
                                                className={styles.textField}
                                                fullWidth
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange("emailFamilyForm", e.target.value)
                                                    setErrorMessage({ ...errorMessage, emailFamilyForm: '' });
                                                }}
                                            />
                                            {errorMessage.emailFamilyForm ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.emailFamilyForm}</Typography> : ''}

                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Nakshatram</CustomInputLabel>
                                            {nakshatramDropdownForAddfamily()}
                                        </Grid>
                                        <Grid xs={12} sm={3} item>
                                            <CustomInputLabel>Gothram</CustomInputLabel>
                                            {gothramDropdownForAddFamily()}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ marginTop: "15px", marginBottom: "20px" }}>
                                        <Grid sx={{ paddingLeft: "580px" }}>{handleButtons()}</Grid>
                                    </Grid>
                                </div>



                            </Card>

                        </div>
                    </div>
                </div>
            </Grid>
        </>
    )
}

export default ModifyProfile;
