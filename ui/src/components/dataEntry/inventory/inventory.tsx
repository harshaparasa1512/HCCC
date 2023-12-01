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
    CustomCheckbox
} from 'components/common/StyledComponents/StyledFields';
import { useState } from 'react';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

type ErrorMessageTypes = {
    itemName: string;
    categorys: string;
    itemTypes: string;
    description: string;
    quantity: string;
    values: string;
    comments: string;
};

const DataEntryInventory = () => {

    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        itemName: '',
        categorys: '',
        itemTypes: '',
        description: '',
        quantity: '',
        values: '',
        comments: ''
    });

    const validationSchema = object().shape({
        itemName: string().required('Policy Title is required'),
        categorys: string().required('Description is required'),
        itemTypes: string().required('Policy Title is required'),
        description: string().required('Description is required'),
        quantity: string().required('Policy Title is required'),
        values: string().required('Description is required'),
        comments: string().required('Description is required')
    });

    const [formData, setFormData] = useState({
        itemName: '',
        categorys: '',
        itemTypes: '',
        description: '',
        quantity: '',
        values: '',
        comments: ''
    });

    const handleSave = async (): Promise<void> => {
        const errors: ErrorMessageTypes = {
            itemName: '',
            categorys: '',
            itemTypes: '',
            description: '',
            quantity: '',
            values: '',
            comments: ''
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

    const categoryList = [
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


    const category = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    onChange={(e) => handleFieldChange('categorys', e.target.value)}
                >
                    {categoryList.map((item, index: number) => (
                        <MenuItem key={index} value={item.catogery}>
                            {item.catogery}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.categorys && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.categorys}</Typography>
                )}
            </FormControl>
        );
    };

    const itemType = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    onChange={(e) => handleFieldChange('itemTypes', e.target.value)}
                >
                    {categoryList.map((item, index: number) => (
                        <MenuItem key={index} value={item.catogery}>
                            {item.catogery}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.itemTypes && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.itemTypes}</Typography>
                )}
            </FormControl>
        );
    };

    const inventory = () => {
        return (
            <>
                <div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className={styles.subContainer}>
                            <Typography className={styles.title}>Inventory</Typography>
                        </div>
                        <Card sx={{ minHeight: "720px", maxHeight: "720px", overflowY: "scroll", boxShadow: "0px 2px 20px 0px rgba(237, 237, 237, 0.80)" }}>
                            <Grid container spacing={2} sx={{ marginTop: "0px", display: "flex", flexDirection: "column", padding: "20px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Name of the Item</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                        onChange={(e) => handleFieldChange('itemName', e.target.value)}
                                    />
                                    {errorMessage.itemName && (
                                        <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.itemName}</Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <CustomInputLabel>Catogery</CustomInputLabel>
                                    {category()}
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <CustomInputLabel>Item Type</CustomInputLabel>
                                    {itemType()}
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Description</CustomInputLabel>
                                    <TextareaAutosize
                                        style={{ padding: "14px 80px 55px 16px", height: "10px", width: "191px", backgroundColor: "#fff9e4", border: "none", borderRadius: "8px" }}
                                        required
                                        onChange={(e) => handleFieldChange('description', e.target.value)}
                                    />
                                    {errorMessage.description && (
                                        <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.description}</Typography>
                                    )}
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Quantity</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                        onChange={(e) => handleFieldChange('quantity', e.target.value)}
                                    />
                                    {errorMessage.quantity && (
                                        <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.quantity}</Typography>
                                    )}
                                </Grid>
                                <Grid xs={12} sm={6} item sx={{ display: "flex" }}>
                                    <Grid xs={12} sm={6} item>
                                        <CustomInputLabel>Value</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => handleFieldChange('values', e.target.value)}
                                        />
                                        {errorMessage.values && (
                                            <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.values}</Typography>
                                        )}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{ display: 'flex', alignItems: 'center', marginTop: '25px' }}
                                    >
                                        <CustomCheckbox />
                                        <CustomInputLabel>Insured</CustomInputLabel>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Comments</CustomInputLabel>
                                    <TextareaAutosize
                                        style={{ padding: "14px 80px 55px 16px", height: "10px", width: "191px", backgroundColor: "#fff9e4", border: "none", borderRadius: "8px" }}
                                        required
                                        onChange={(e) => handleFieldChange('comments', e.target.value)}
                                    />
                                    {errorMessage.comments && (
                                        <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.comments}</Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Card>
                        <div>
                            <CommonButton sx={{ marginTop: "10px", marginBottom: "10px" }} onClick={handleSave}>Submit</CommonButton>
                        </div>
                    </div>
                </div>

            </>
        )
    }



    return (
        <div style={{display:"flex"}}>
         <LeftMainNavigation />
        <div className={styles.mainContainer}>
            {inventory()}
        </div>
        </div>
    )
}

export default DataEntryInventory;
