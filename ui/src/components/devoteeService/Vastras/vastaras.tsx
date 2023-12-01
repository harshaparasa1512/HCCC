import React, { useState } from 'react';
import { Grid, Typography, TextareaAutosize, Card } from '@mui/material';
import {
    CustomTextFeild,
    CustomInputLabel,
    StyledDateContainer,
    CustomSelect,
    CustomDatePicker,
    CustomCalendarTodayOutlinedIcon,
    CommonButton,
    CustomDeleteIcon,
} from 'components/common/StyledComponents/StyledFields';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ModeofPayment from 'components/common/modeOfPayment/modeOfPayment';
import { ValidationError, object, string } from 'yup';
import dayjs from 'dayjs';
import styles from './vastaras.module.scss';
import ListOfItemAdded from 'components/common/ListOfItemAdded/listOfItemAdded';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

const Vastaras = () => {
    interface ErrorMessageTypes {
        name: string;
        purposeOfVastra: string;
        vastraCategory: string;
        deity: string;
        dateOfAdornment: string;
        ammountinDollars: string;
        vastraExchange: string;
        description: string;
    }
    const [formData, setFormData] = useState({
        name: "",
        purposeOfVastra: "",
        deity: "",
        vastraCategory: "",
        vastraExchange: "",
        dateOfAdornment: "",
        description: "",
    })
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        name: "",
        purposeOfVastra: "",
        deity: "",
        vastraCategory: "",
        vastraExchange: "",
        dateOfAdornment: "",
        ammountinDollars: "",
        description: "",
    })
    const validationSchema = object().shape({
        name: string().required('Name is required'),
        purposeOfVastra: string().required('Purpose Of Vastra is required'),
        dateOfAdornment: string().required('Adornment Date is required'),
        ammountinDollars: string().required('Ammount in Dollars is required'),
        vastraCategory: string().required('Vastra Category is required'),
        vastraExchange: string().required('Vastra Exchange is required'),
        description: string().required('Description is required'),
        deity: string().required('Deity is required'),
    })
    const handleAdd = async () => {
        const errors: ErrorMessageTypes = {
            name: "",
            purposeOfVastra: "",
            dateOfAdornment: "",
            ammountinDollars: "",
            vastraCategory: "",
            vastraExchange: "",
            deity: "",
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

    const purposeofvastraList = [
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
    const PurposeOfVastrasList = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Select Pooja Location'
                    value={formData.purposeOfVastra}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('purposeOfVastra', e.target.value);
                        setErrorMessage({ ...errorMessage, purposeOfVastra: "" })
                    }}
                >
                    {purposeofvastraList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.purposeOfVastra ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.purposeOfVastra}</Typography> : ''}
            </FormControl>
        )
    }
    const vastracategory = [
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
    const VastracategoryDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Select Pooja Location'
                    value={formData.vastraCategory}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('vastraCategory', e.target.value);
                        setErrorMessage({ ...errorMessage, vastraCategory: "" })
                    }}
                >
                    {vastracategory.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.vastraCategory ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.vastraCategory}</Typography> : ''}
            </FormControl>
        )
    }
    const vastraExchangeList = [
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
    const VastraExchangeDropdownList = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Select Pooja Location'
                    value={formData.vastraExchange}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('vastraExchange', e.target.value);
                        setErrorMessage({ ...errorMessage, vastraExchange: "" })
                    }}
                >
                    {vastraExchangeList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.vastraExchange ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.vastraExchange}</Typography> : ''}
            </FormControl>
        )
    }
    const DeityList = [
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
    const DeityDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Select Pooja Location'
                    value={formData.deity}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('deity', e.target.value);
                        setErrorMessage({ ...errorMessage, deity: "" })
                    }}
                >
                    {DeityList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.deity ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.deity}</Typography> : ''}
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
                                    formData.dateOfAdornment ? dayjs(formData.dateOfAdornment, 'MM-DD-YYYY') : ''
                                }
                                onChange={(value) => {
                                    handleFieldChange('dateOfAdornment', value);
                                    setErrorMessage({ ...errorMessage, dateOfAdornment: "" })
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.dateOfAdornment ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.dateOfAdornment}</Typography> : ''}
                </StyledDateContainer>
            </div>
        );
    };
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
                            Vastras
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
                                        <CustomInputLabel>Purpose OF Vastra</CustomInputLabel>
                                        {PurposeOfVastrasList()}

                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Ammount in Dollars</CustomInputLabel>
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
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Date Of Adornment</CustomInputLabel>
                                        {BasicDatePicker()}
                                    </Grid>

                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Vastra Category</CustomInputLabel>
                                        {VastracategoryDropdown()}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px", marginRight: "5px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Vastra Exchange</CustomInputLabel>
                                        {VastraExchangeDropdownList()}
                                    </Grid>

                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Deity</CustomInputLabel>
                                        {DeityDropdown()}
                                    </Grid>
                                </Grid>
                                <Grid xs={30} sm={13} item>
                                    <CustomInputLabel>Description</CustomInputLabel>
                                    <TextareaAutosize
                                        style={{ height: "79px", width: "850px", border: "none" }}
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
                        <ListOfItemAdded />
                        <div>
                            <ModeofPayment />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Vastaras;
