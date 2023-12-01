import React, { useState } from 'react'
import { Box, Card, Grid, Typography, TextareaAutosize, FormControl, MenuItem } from '@mui/material';
import {
    CustomTextFeild,
    CustomInputLabel,
    StyledDateContainer,
    CustomDatePicker,
    CustomCalendarTodayOutlinedIcon,
    CommonButton,
    CustomDeleteIcon,
    CustomSelect,
} from 'components/common/StyledComponents/StyledFields';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ModeofPayment from 'components/common/modeOfPayment/modeOfPayment';
import { ValidationError, object, string } from 'yup';
import dayjs from 'dayjs';
import ListOfItemAdded from 'components/common/ListOfItemAdded/listOfItemAdded';
import styles from './donorAdvisoryFunds.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';


interface ErrorMessageTypes {
    name: string;
    purposeOfDonation: string;
    noOfItem: string;
    ammountinDollars: string;
    disbursementReference: string;
    periodEnding: string;
    donorAdvisoryFunds_name: string;
    donorAdvisoryFunds_username: string;
    donorAdvisoryFunds_amount: string;
    description: string;
}

const DonorAdvisoryFunds = () => {
    const [membersList, setMembersList] = useState<Array<React.ReactElement>>([]);
    const [formData, setFormData] = useState({
        name: "",
        purposeOfDonation: "",
        noOfItem: "",
        ammountinDollars: "",
        disbursementReference: "",
        periodEnding: "",
        description: "",
    })
    const [addmorefields, setAddmorefields] = useState([{
        donorAdvisoryFunds_name: "",
        donorAdvisoryFunds_username: "",
        donorAdvisoryFunds_amount: "",
    }])
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        name: "",
        purposeOfDonation: "",
        noOfItem: "",
        ammountinDollars: "",
        disbursementReference: "",
        periodEnding: "",
        donorAdvisoryFunds_name: "",
        donorAdvisoryFunds_username: "",
        donorAdvisoryFunds_amount: "",
        description: "",
    })
    const validationSchema = object().shape({
        name: string().required('Name is required'),
        purposeOfDonation: string().required('Donation is required'),
        noOfItem: string().required('No. of item is required'),
        ammountinDollars: string().required('Amount in Dollars is required'),
        disbursementReference: string().required('Disbursement Reference is required'),
        periodEnding: string().required('Period Ending is required'),
        donorAdvisoryFunds_name: string().required('Donor Advisory Funds(name) is required'),
        donorAdvisoryFunds_username: string().required('Donor Advisory Funds(username) is required'),
        donorAdvisoryFunds_amount: string().required('Donor Advisory Funds(amount) is required'),
        description: string().required('Description is required'),
    })
    const handleAdd = async () => {
        const errors: ErrorMessageTypes = {
            name: "",
            purposeOfDonation: "",
            noOfItem: "",
            ammountinDollars: "",
            disbursementReference: "",
            periodEnding: "",
            donorAdvisoryFunds_name: "",
            donorAdvisoryFunds_username: "",
            donorAdvisoryFunds_amount: "",
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
    const PurposeDonationDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    defaultValue=""
                    id="grouped-select"
                    sx={{ width: "100%", height: "48px" }}
                    placeholder='Select pooja Type'
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
                                // format="DD-MM-YYYY"
                                value={
                                    formData.periodEnding ? dayjs(formData.periodEnding, 'MM-DD-YYYY') : ''
                                }
                                onChange={(value) => {
                                    handleFieldChange('periodEnding', value);
                                    setErrorMessage({ ...errorMessage, periodEnding: "" })
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.periodEnding ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.periodEnding}</Typography> : ''}
                </StyledDateContainer>
            </div>
        );
    };
    const handleAddmorefieldsChange = (index: number, field: string, value: any) => {
        setAddmorefields((prevFields) => {
            const newFields = [...prevFields];
            newFields[index] = {
                ...newFields[index],
                [field]: value,
            };
            return newFields;
        });
    };
    const handleAddMember = () => {
        const newMember = (
            <div key={membersList.length}>
                {Addmorefields(membersList.length)}
            </div>
        );

        setMembersList((prevList) => [...prevList, newMember]);
    };
    const handleDeleteMember = (index: number) => {
        setMembersList((prevList) => prevList.filter((_, i) => i !== index));
        console.log(index)
    };
    const Addmorefields = (index: number) => {
        return (
            <>
                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                    <Grid xs={12} sm={3} item>
                        <CustomInputLabel>Donor Advisory Funds (username)</CustomInputLabel>
                        <CustomTextFeild
                            className={styles.textField}
                            fullWidth
                            required
                            onChange={(e) => {
                                handleAddmorefieldsChange(index, "donorAdvisoryFunds_username", e.target.value);
                                setErrorMessage({ ...errorMessage, donorAdvisoryFunds_username: '' });
                            }}
                        />
                        {errorMessage.donorAdvisoryFunds_username ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.donorAdvisoryFunds_username}</Typography> : ''}

                    </Grid>
                    <Grid xs={12} sm={3} item>
                        <CustomInputLabel>Donor Advisory Funds (name)</CustomInputLabel>
                        <CustomTextFeild
                            className={styles.textField}
                            fullWidth
                            required
                            onChange={(e) => {
                                handleAddmorefieldsChange(index, "donorAdvisoryFunds_name", e.target.value);
                                setErrorMessage({ ...errorMessage, donorAdvisoryFunds_name: '' });
                            }}
                        />
                        {errorMessage.donorAdvisoryFunds_name ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.donorAdvisoryFunds_name}</Typography> : ''}
                    </Grid>
                    <Grid xs={12} sm={3} item>
                        <CustomInputLabel>Donor Advisory Funds (Amount)</CustomInputLabel>
                        <CustomTextFeild
                            className={styles.textField}
                            fullWidth
                            required
                            onChange={(e) => {
                                handleAddmorefieldsChange(index, "donorAdvisoryFunds_username", e.target.value);
                                setErrorMessage({ ...errorMessage, donorAdvisoryFunds_amount: '' });
                            }}
                        />
                        {errorMessage.donorAdvisoryFunds_amount ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.donorAdvisoryFunds_amount}</Typography> : ''}
                    </Grid>
                    <Grid xs={12} sm={3} item>
                        <Card className={styles.CardwithDeleteIconStyles} >
                            <Box sx={{ margin: '5px 0px 0px 15px' }}>
                                <div style={{ position: "absolute", right: "13px", top: "6px" }} onClick={() => handleDeleteMember(index)}>
                                    <CustomDeleteIcon
                                    />
                                </div>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </>
        )
    }

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
                            Donor Advisory Funds
                        </Typography>
                        <Card className={styles.cardContainer}>
                            <div style={{ padding: "24px" }}>
                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Name</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            disabled={true}
                                            placeholder='kriti'
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
                                        <CustomInputLabel>Purpose OF Donation</CustomInputLabel>
                                        {PurposeDonationDropdown()}
                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>No. of items</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("noOfItem", e.target.value);
                                                setErrorMessage({ ...errorMessage, noOfItem: '' })
                                            }}
                                        />
                                        {errorMessage.noOfItem ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.noOfItem}</Typography> : ''}

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Amount in Dollars</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("ammountinDollars", e.target.value);
                                                setErrorMessage({ ...errorMessage, ammountinDollars: '' })
                                            }}
                                        />
                                        {errorMessage.ammountinDollars ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.ammountinDollars}</Typography> : ''}

                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Disbursement Reference</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            // sx={{ width: "417px", height: "48px" }}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("disbursementReference", e.target.value);
                                                setErrorMessage({ ...errorMessage, disbursementReference: '' })
                                            }}
                                        />
                                        {errorMessage.disbursementReference ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.disbursementReference}</Typography> : ''}

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Period Ending</CustomInputLabel>
                                        {BasicDatePicker()}
                                    </Grid>
                                </Grid>
                                {/* {Addmorefields()} */}
                                <Grid xs={12} sm={3} item>
                                    {membersList.map((member) => (
                                        <div key={membersList.indexOf(member)}>
                                            {member}
                                        </div>
                                    ))}
                                </Grid>
                                <CommonButton sx={{ marginTop: '10px' }} onClick={handleAddMember}>
                                    Add More Members
                                </CommonButton>

                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
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
                                </Grid>
                            </div>
                        </Card>
                        <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                            <Box>
                                <CommonButton sx={{ marginTop: "10px" }} onClick={handleAdd}>Add</CommonButton>
                            </Box>
                        </Grid>
                        <div>
                            <ListOfItemAdded />
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
export default DonorAdvisoryFunds;
