import { Card, Grid, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    CustomTextFeild,
    CustomInputLabel,
    CustomSelect,
    StyledDateContainer,
    CustomDatePicker,
    CustomCalendarTodayOutlinedIcon,
    CommonButton,
    CustomTimePicker,
    CustomTimeOutlinedIcon
} from 'components/common/StyledComponents/StyledFields';

import styles from './poojaBooking.module.scss'
import { ValidationError, object, string } from 'yup';
import { useState } from 'react';
import dayjs from 'dayjs';
import ModeofPayment from 'components/common/modeOfPayment/modeOfPayment';
import ListOfItemAdded from 'components/common/ListOfItemAdded/listOfItemAdded';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface ErrorMessageTypes {
    name: string;
    poojaLocation: string;
    PoojaPriest: string;
    pooja: string;
    poojaDate: string;
    timeSelected: string;
    poojaTime: string;
    donation: string;
    timeselectedMinutes: string;
}

const PoojaBooking = () => {

    const [formData, setFormData] = useState({
        name: "",
        poojaLocation: "",
        PoojaPriest: "",
        poojaDate: "",
        pooja: "",
        timeSelected: "",
        timeselectedMinutes: "",
        poojaTime: "",
        donation: "",
    })
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        name: "",
        poojaLocation: "",
        timeSelected: "",
        pooja: "",
        PoojaPriest: "",
        timeselectedMinutes: "",
        poojaDate: "",
        poojaTime: "",
        donation: "",
    })
    const validationSchema = object().shape({
        name: string().required('Name is required'),
        poojaLocation: string().required('Pooja Location is required'),
        PoojaPriest: string().required('Priest is required'),
        pooja: string().required('Pooja is required'),
        poojaDate: string().required('Poojadate is required'),
        poojaTime: string().required('PoojaTime is required'),
        donation: string().required("Donation is required"),
        timeSelected: string().required('Time is required'),
        timeselectedMinutes: string().required('Priest selected Time is required')
    })
    const handleAdd = async () => {
        const errors: ErrorMessageTypes = {
            name: "",
            poojaLocation: "",
            PoojaPriest: "",
            pooja: "",
            poojaDate: "",
            poojaTime: "",
            timeSelected: "",
            timeselectedMinutes: "",
            donation: "",
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

    };
    const PoojaLocationList = [
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
    const TypeofPooja = [
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
    const poojaLocationDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Select Pooja Location'
                    value={formData.poojaLocation}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('poojaLocation', e.target.value);
                        setErrorMessage({ ...errorMessage, poojaLocation: "" })
                    }}
                >
                    {PoojaLocationList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.poojaLocation ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.poojaLocation}</Typography> : ''}
            </FormControl>
        )
    }
    const poojaDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    defaultValue=""
                    id="grouped-select"
                    placeholder='Select pooja Type'
                    value={formData.pooja}
                    onChange={(e) => {
                        handleFieldChange('pooja', e.target.value);
                        setErrorMessage({ ...errorMessage, pooja: "" })
                    }}>
                    {TypeofPooja.map((item, index) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.pooja ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.pooja}</Typography> : ''}
            </FormControl>
        )
    }
    const SelectPriestDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    defaultValue=""
                    id="grouped-select"
                    placeholder='Select priest'
                    value={formData.PoojaPriest}
                    onChange={(e) => {
                        handleFieldChange('PoojaPriest', e.target.value);
                        setErrorMessage({ ...errorMessage, PoojaPriest: "" })
                    }}>
                    {TypeofPooja.map((item, index) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.PoojaPriest ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.PoojaPriest}</Typography> : ''}
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
                                format="DD-MM-YYYY"
                                value={
                                    formData.poojaDate ? dayjs(formData.poojaDate, 'MM-DD-YYYY') : ''
                                }
                                onChange={(value) => {
                                    handleFieldChange('poojaDate', value);
                                    setErrorMessage({ ...errorMessage, poojaDate: "" })
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.poojaDate ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.poojaDate}</Typography> : ''}
                </StyledDateContainer>
            </div>
        );
    };
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
                                views={['hours', 'minutes', 'seconds']}

                                value={
                                    formData.timeSelected ? dayjs(formData.timeSelected, 'H:MM A') : ''
                                }
                                onChange={(value) => {
                                    handleFieldChange('timeSelected', value);
                                    setErrorMessage({ ...errorMessage, timeSelected: "" })
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.timeSelected ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.timeSelected}</Typography> : ''}
                </StyledDateContainer>
            </div>
        );
    };
    const BasicTimePickerForPriest = (): React.ReactElement => {
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
                                views={['minutes']}

                                value={
                                    formData.timeselectedMinutes ? dayjs(formData.timeselectedMinutes, 'MM') : ''
                                }
                                onChange={(value) => {
                                    handleFieldChange('timeselectedMinutes', value);
                                    setErrorMessage({ ...errorMessage, timeselectedMinutes: "" })
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errorMessage.timeselectedMinutes ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.timeselectedMinutes}</Typography> : ''}
                </StyledDateContainer>
            </div>
        );
    };
    return (
        <>
            <div style={{ display: "flex" }}>
                <LeftMainNavigation/>
                <div className={styles.BoxContainer}>
                    <Typography component="div" className={styles.typoGraphyHeading}>
                        Devotee Service
                    </Typography>
                    <div className={styles.formContainer}>
                        <Typography component="div" className={styles.typoGraphy}>
                            Pooja Booking
                        </Typography>
                        <Card className={styles.cardContainer}>
                            <div className={styles.formFields}>
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
                                        <CustomInputLabel>Pooja Location</CustomInputLabel>
                                        {poojaLocationDropdown()}
                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Pooja</CustomInputLabel>
                                        {poojaDropdown()}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Pooja Date</CustomInputLabel>
                                        {BasicDatePicker()}
                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Pooja Time</CustomInputLabel>
                                        {BasicTimePicker()}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Select Priest</CustomInputLabel>
                                        {SelectPriestDropdown()}
                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Priest Schedule Time </CustomInputLabel>
                                        {BasicTimePickerForPriest()}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Donation</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("donation", e.target.value);
                                                setErrorMessage({ ...errorMessage, donation: '' })
                                            }}
                                        />
                                        {errorMessage.donation ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.donation}</Typography> : ''}
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
                </div>
            </div>

        </>
    )

}
export default PoojaBooking;
