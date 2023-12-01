import React, { useState } from 'react';
import { Grid, Typography, TextareaAutosize, Card } from '@mui/material';
import {
    CustomTextFeild,
    CustomInputLabel,
    StyledDateContainer,
    CustomSelect,
    CustomTimePicker,
    CustomTimeOutlinedIcon,
    CommonButton,
    CustomDeleteIcon,
} from 'components/common/StyledComponents/StyledFields';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ModeofPayment from 'components/common/modeOfPayment/modeOfPayment';
import { ValidationError, object, string } from 'yup';
import styles from './hallRental.module.scss'
import dayjs from 'dayjs';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface ErrorMessageTypes {
    name: string;
    nameOfHall: string;
    noOfHours: string;
    amount: string;
    description: string;
}

const HallRental = () => {

    const [formData, setFormData] = useState({
        name: "",
        nameOfHall: "",
        noOfHours: "",
        amount: "",
        description: "",
    })
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        name: "",
        nameOfHall: "",
        noOfHours: "",
        amount: "",
        description: "",
    })
    const validationSchema = object().shape({
        name: string().required('Name is required'),
        nameOfHall: string().required('Purpose Of Vastra is required'),
        noOfHours: string().required('Adornment Date is required'),
        amount: string().required('Amount in Dollars is required'),
        description: string().required('Description is required'),
    })
    const handleAdd = async () => {
        const errors: ErrorMessageTypes = {
            name: "",
            nameOfHall: "",
            noOfHours: "",
            amount: "",
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
    const ItemAddedData = [
        {
            Type: "Vinay",
            "Pooja Title": "06/11/2023",
            "Date Of Pooja": "abcd@gmail.com",
            "Priest Name": "Father",
            Deities: "-",
            Purpose: "Archana",
            Description: "Archana",
            Amount: "$200",
            "": (
                <div>
                    <CustomDeleteIcon />
                </div>
            ),
        },
    ]
    const HallsList = [
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
    const HallsDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Name OF Hall'
                    value={formData.nameOfHall}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('nameOfHall', e.target.value);
                        setErrorMessage({ ...errorMessage, nameOfHall: "" })
                    }}
                >
                    {HallsList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.nameOfHall ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.nameOfHall}</Typography> : ''}
            </FormControl>
        )
    }
    const BasicTimePicker = (): React.ReactElement => {
        return (
            <div style={{ minWidth: "100%", marginTop: "12px" }}>
                <StyledDateContainer>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <CustomTimePicker
                                slots={{
                                    openPickerIcon: CustomTimeOutlinedIcon,
                                }}
                                slotProps={{
                                    inputAdornment: {
                                        position: 'end',
                                    },
                                }}
                                views={['hours']}
                                format='HH'

                                value={
                                    formData.noOfHours ? dayjs(formData.noOfHours, 'Hh') : ''
                                }
                                onChange={(value) => {
                                    handleFieldChange('noOfHours', value);
                                    setErrorMessage({ ...errorMessage, noOfHours: "" })
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.noOfHours ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.noOfHours}</Typography> : ''}
                </StyledDateContainer>
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
                            Hall Rental
                        </Typography>
                        <Card className={styles.cardContainer}>
                            <div style={{ padding: "24px" }}>
                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Name</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            disabled={true}
                                            placeholder='kritii'
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("name", e.target.value);
                                                setErrorMessage({ ...errorMessage, name: '' })
                                            }}
                                        />
                                        {errorMessage.name ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.name}</Typography> : ''}

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Name Of Hall</CustomInputLabel>
                                        {HallsDropdown()}

                                    </Grid>
                                </Grid>


                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Number of Hours</CustomInputLabel>
                                        {BasicTimePicker()}
                                    </Grid>

                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Amount</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("amount", e.target.value);
                                                setErrorMessage({ ...errorMessage, amount: '' })
                                            }}
                                        />
                                        {errorMessage.amount ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.amount}</Typography> : ''}
                                    </Grid>
                                </Grid>
                                <Grid xs={30} sm={13} item>
                                    <CustomInputLabel>Description</CustomInputLabel>
                                    <TextareaAutosize
                                        style={{ height: "89px", width: "850px", border: "none" }}
                                        className={styles.textField}
                                        required
                                        onChange={(e) => {
                                            handleFieldChange('description', e.target.value);
                                            setErrorMessage({ ...errorMessage, description: "" })
                                        }}
                                    ></TextareaAutosize>
                                    {errorMessage.description ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.description}</Typography> : ''}
                                </Grid>
                            </div>
                        </Card>
                        <CommonButton sx={{ marginTop: "10px" }} onClick={handleAdd}>Add</CommonButton>
                        <div className={styles.familyDetails}>
                            <Typography sx={{ marginTop: "20px", marginBottom: "20px" }} component="div" className={styles.typoGraphy}>List of Item Added</Typography>
                            <GridTableComponent tableData={ItemAddedData} />
                            <div className={styles.notePointCountDivContainer}>
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <td>Total: <b>${200} </b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <ModeofPayment />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HallRental;
