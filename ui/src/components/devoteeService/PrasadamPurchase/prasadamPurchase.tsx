import React, { useState } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import {
    CustomTextFeild,
    CustomInputLabel,
    CustomSelect,
    CommonButton,
    CustomDeleteIcon,
} from 'components/common/StyledComponents/StyledFields';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import ModeofPayment from 'components/common/modeOfPayment/modeOfPayment';
import { ValidationError, object, string } from 'yup';
import styles from './prasadamPurchase.module.scss';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';




interface ErrorMessageTypes {
    name: string;
    prasadam: string;
    quantity: string;
    amount: string;
}

const PrasadamPurchase = () => {
    const [formData, setFormData] = useState({
        name: "",
        prasadam: "",
        quantity: "",
        amount: "",
    })
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        name: "",
        prasadam: "",
        quantity: "",
        amount: "",
    })
    const validationSchema = object().shape({
        name: string().required('Name is required'),
        prasadam: string().required('Prasadam is required'),
        quantity: string().required('Quantity is required'),
        amount: string().required('Ammount is required'),
    })
    const handleAdd = async () => {
        const errors: ErrorMessageTypes = {
            name: "",
            prasadam: "",
            quantity: "",
            amount: "",
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
    const PrasadamList = [
        {
            label: "laddu",
        },
        {
            label: "laddu",
        },
        {
            label: "chakkarkeli",
        },
        {
            label: "chakkarkeli",
        },
        {
            label: "chakkarkeli",
        }
    ]
    const PrasadamDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Prasadam'
                    value={formData.prasadam}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('prasadam', e.target.value);
                        setErrorMessage({ ...errorMessage, prasadam: "" })
                    }}
                >
                    {PrasadamList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.prasadam ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.prasadam}</Typography> : ''}
            </FormControl>
        )
    }
    const Quantity = [
        {
            label: "1",
        },
        {
            label: "2",
        },
        {
            label: "3",
        },
        {
            label: "4",
        },
        {
            label: "5",
        }
    ]
    const QuantityCount = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    placeholder='Quantity'
                    value={formData.quantity}
                    defaultValue=""
                    id="grouped-select"
                    onChange={(e) => {
                        handleFieldChange('quantity', e.target.value);
                        setErrorMessage({ ...errorMessage, quantity: "" })
                    }}
                >
                    {Quantity.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.quantity ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.quantity}</Typography> : ''}
            </FormControl>
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
                            Prasadam Purchase
                        </Typography>
                        <Card className={styles.cardContainer}>
                            <div style={{ padding: "24px" }}>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Name</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
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
                                        <CustomInputLabel>Prasadam</CustomInputLabel>
                                        {PrasadamDropdown()}

                                    </Grid>
                                </Grid>


                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Quantity</CustomInputLabel>
                                        {QuantityCount()}
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
export default PrasadamPurchase;
