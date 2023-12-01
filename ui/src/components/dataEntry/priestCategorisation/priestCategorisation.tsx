import { Card, Typography, Grid, TextareaAutosize } from '@mui/material';
import styles from '../managePolicies/managePolicies.module.scss';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { object, string, ValidationError } from 'yup';
import {
    CustomSelect,
    CommonButton,
    CustomInputLabel,
    CustomTextFeild,
} from 'components/common/StyledComponents/StyledFields';
import { useState } from 'react';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

type ErrorMessageTypes = {
    priestName: string,
    priestCode: string,
    poojaType: string,
};

const DataEntryPriestcategorisation = () => {

    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        priestName: '',
        priestCode: '',
        poojaType: '',

    });

    const validationSchema = object().shape({
        priestName: string().required('priest Name is required'),
        priestCode: string().required('Priest Code is required'),
        poojaType: string().required('Pooja Type is required'),
    });

    const [formData, setFormData] = useState({
        priestName: '',
        priestCode: '',
        poojaType: '',
    });

    const handleSave = async (): Promise<void> => {
        const errors: ErrorMessageTypes = {
            priestName: '',
            priestCode: '',
            poojaType: '',
        };

        try {
            // Validate the form data against the validation schema
            await validationSchema.validate(formData, { abortEarly: false });
            // If validation passes, you can submit the form
            setErrorMessage(errors);
            alert('Details Saved Successfully');

            // Call your API or perform other actions here
            //  saveApiCall();
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

    const handleFieldChange = (field: string, value: any) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const priestNameList = [
        {
            catogery: 'category 1',
        },
        {
            catogery: 'category 2',
        },
        {
            catogery: 'category 3',
        },
        {
            catogery: 'category 4',
        },
        {
            catogery: 'category 5',
        },
        {
            catogery: 'category 6',
        },
    ];


    const priestName = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    onChange={(e) => handleFieldChange('priestName', e.target.value)}
                >
                    {priestNameList.map((item, index: number) => (
                        <MenuItem key={index} value={item.catogery}>
                            {item.catogery}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.priestName && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.priestName}</Typography>
                )}
            </FormControl>
        );
    };

    const typeofPooja = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    onChange={(e) => handleFieldChange('poojaType', e.target.value)}
                >
                    {priestNameList.map((item, index: number) => (
                        <MenuItem key={index} value={item.catogery}>
                            {item.catogery}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.poojaType && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.poojaType}</Typography>
                )}
            </FormControl>
        );
    };

    const priestCategorisation = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Priest Categorisation ( Shiva/Vishnu)</Typography>
                </div>
                <Card sx={{ minHeight: "312px", maxHeight: "312px", overflowY: "scroll", boxShadow: "0px 2px 20px 0px rgba(237, 237, 237, 0.80)" }}>
                    <Grid container spacing={2} sx={{ marginTop: "0px", display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Grid item xs={12} sm={3}>
                            <CustomInputLabel>Priest Name</CustomInputLabel>
                            {priestName()}
                        </Grid>
                        <Grid xs={12} sm={3} item>
                            <CustomInputLabel>Priest Code</CustomInputLabel>
                            <CustomTextFeild
                                className={styles.textField}
                                fullWidth
                                required
                                onChange={(e) => handleFieldChange('priestCode', e.target.value)}
                            />
                            {errorMessage.priestCode && (
                                <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.priestCode}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <CustomInputLabel>Type of Pooja</CustomInputLabel>
                            {typeofPooja()}
                        </Grid>
                    </Grid>
                </Card>
                <CommonButton sx={{ marginTop: "10px", marginBottom: "10px" }} onClick={handleSave}>Submit</CommonButton>
            </div>
        )
    }


    return (
        <div style={{ display: "flex" }}>
            <LeftMainNavigation />
            <div className={styles.mainContainer}>
                {priestCategorisation()}
            </div>
        </div>
    )
}

export default DataEntryPriestcategorisation
