
import { Box, Card, Grid, TextareaAutosize, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    CustomTextFeild,
    CustomInputLabel,
    CustomSelect,
    CommonButton,
} from 'components/common/StyledComponents/StyledFields';

import styles from './donation.module.scss';
import { useState } from 'react';
import { ValidationError, object, string } from 'yup';
import ModeofPayment from 'components/common/modeOfPayment/modeOfPayment';
import ListOfItemAdded from 'components/common/ListOfItemAdded/listOfItemAdded';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface ErrorMessageTypes {
    name: string;
    purposeOfDonation: string;
    noOfItem: string;
    ammountinDollars: string;
    description: string
}

const ServiceDonation = () => {
    const [formData, setFormData] = useState({
        name: "",
        purposeOfDonation: "",
        noOfItem: "",
        ammountinDollars: "",
        description: "",
    })
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        name: "",
        purposeOfDonation: "",
        noOfItem: "",
        ammountinDollars: "",
        description: "",
    })
    const validationSchema = object().shape({
        name: string().required('Name is required'),
        purposeOfDonation: string().required('Donation is required'),
        noOfItem: string().required('No. of item is required'),
        ammountinDollars: string().required('Amount in Dollars is required'),
        description: string().required('Description is required'),
    })
    const handleAdd = async () => {
        const errors: ErrorMessageTypes = {
            name: "",
            purposeOfDonation: "",
            noOfItem: "",
            ammountinDollars: "",
            description: "",
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
    }
    const DonationPurposeList = [
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
    const DonationPurposeDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect IconComponent={KeyboardArrowDownIcon} className={styles.dropDownSelect} defaultValue="" id="grouped-select"
                    placeholder='select Type donation'
                    value={formData.purposeOfDonation}
                    onChange={(e) => {
                        handleFieldChange('purposeOfDonation', e.target.value);
                        setErrorMessage({ ...errorMessage, purposeOfDonation: "" })
                    }}>
                    {DonationPurposeList.map((item, index) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.purposeOfDonation ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.purposeOfDonation}</Typography> : ''}
            </FormControl>
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
                            Donation
                        </Typography>
                        <Card className={styles.cardContainer}>
                            <div style={{ padding: "24px" }}>
                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Name</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            disabled={true}
                                            placeholder='kriti'
                                            fullWidth
                                            required
                                            value={formData.name}
                                            onChange={(e) => {
                                                handleFieldChange('name', e.target.value);
                                                setErrorMessage({ ...errorMessage, name: "" })
                                            }}
                                        />
                                        {errorMessage.name ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.name}</Typography> : ''}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Purpose of Donation</CustomInputLabel>
                                        {DonationPurposeDropdown()}
                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>No. Of Item</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            value={formData.noOfItem}
                                            onChange={(e) => {
                                                handleFieldChange('noOfItem', e.target.value);
                                                setErrorMessage({ ...errorMessage, noOfItem: "" })
                                            }}
                                        />
                                        {errorMessage.noOfItem ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.noOfItem}</Typography> : ''}
                                    </Grid>
                                    <Grid />
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Amount In Dollars</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            value={formData.ammountinDollars}
                                            onChange={(e) => {
                                                handleFieldChange('ammountinDollars', e.target.value);
                                                setErrorMessage({ ...errorMessage, ammountinDollars: "" })
                                            }}
                                        />
                                        {errorMessage.ammountinDollars ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.ammountinDollars}</Typography> : ''}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={30} sm={13} item>
                                        <CustomInputLabel>Description</CustomInputLabel>
                                        <Box>
                                            <TextareaAutosize
                                                style={{ height: "89px", width: "850px", border: "none" }}
                                                className={styles.textField}
                                                required
                                                onChange={(e) => {
                                                    handleFieldChange('description', e.target.value);
                                                    setErrorMessage({ ...errorMessage, description: "" })
                                                }}></TextareaAutosize>
                                        </Box>
                                        {errorMessage.description ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.description}</Typography> : ''}
                                    </Grid>
                                </Grid>
                            </div>
                        </Card>
                    </div>
                    <CommonButton sx={{ marginTop: "10px" }} onClick={handleAdd}>Add</CommonButton>
                    <div>
                        <ListOfItemAdded />
                    </div>
                    <div>
                        <ModeofPayment />
                    </div>
                </div >
            </div>
        </>
    )
}
export default ServiceDonation;
