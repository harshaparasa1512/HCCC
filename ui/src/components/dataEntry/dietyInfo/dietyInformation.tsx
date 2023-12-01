import { Card, Typography, Grid, TextareaAutosize } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useState, useEffect, useRef } from 'react';
import styles from '../managePolicies/managePolicies.module.scss';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { object, string, ValidationError } from 'yup';
import {
    CustomSelect,
    CommonButton,
    CustomInputLabel,
    CustomTextFeild,
} from 'components/common/StyledComponents/StyledFields';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

type ErrorMessageTypes = {
    dietyName: string;
    description: string;
    primaryPriests: string;
    secondaryPriest: string;
    majorFestival: string;
};

const DataEntryDietyInformation = () => {
    const tableRef = useRef(null);
    const [showDietyInfoDetails, setShowDietyInfoDetails] = useState<boolean>(true);
    const [showEditDietyInfo, setShowEditDietyInfo] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        dietyName: '',
        description: '',
        primaryPriests: '',
        secondaryPriest: '',
        majorFestival: '',

    });

    const validationSchema = object().shape({
        dietyName: string().required('Diety name is required'),
        description: string().required('Description is required'),
        primaryPriests: string().required('Primary Priest is required'),
        secondaryPriest: string().required('Secondary Priest is required'),
        majorFestival: string().required('Major Festival is required'),
    });

    const [formData, setFormData] = useState({
        dietyName: '',
        description: '',
        primaryPriests: '',
        secondaryPriest: '',
        majorFestival: '',
    });

    const handleSave = async (): Promise<void> => {
        const errors: ErrorMessageTypes = {
            dietyName: '',
            description: '',
            primaryPriests: '',
            secondaryPriest: '',
            majorFestival: '',
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

    const handleEditClick = () => {
        setShowEditDietyInfo(true);
        setShowDietyInfoDetails(false);

    }

    const handleDeleteClick = () => {
        alert("delete")
    }

    const deityInformationDetails = [
        {
            "Diety Name": "Title Name 123",
            "Description": "Vinay",
            "Image Path": "Link",
            "Primary Priest": "Ravadas",
            "Major Festivals": "Nov 23, 2005Kala Bhairava Ashtami",
            "Action": (
                <div>
                    <EditIcon className={styles.editAnddeleteIcon} onClick={handleEditClick} />
                    <DeleteIcon className={styles.editAnddeleteIcon} onClick={handleDeleteClick} />
                </div>
            ),
        },
        {
            "Diety Name": "Title Name 456",
            "Description": "Hari",
            "Image Path": "Link",
            "Primary Priest": "Ravadas",
            "Major Festivals": "Nov 23, 2005Kala Bhairava Ashtami",
            "Action": (
                <div>
                    <EditIcon className={styles.editAnddeleteIcon} onClick={handleEditClick} />
                    <DeleteIcon className={styles.editAnddeleteIcon} onClick={handleDeleteClick} />
                </div>
            ),
        },
    ]

    const primaryPriestList = [
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


    const deityInformation = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Deity Information</Typography>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={deityInformationDetails} tableRef={tableRef} />
                </div>
            </div>
        )
    }


    const primaryPriest = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    onChange={(e) => handleFieldChange('primaryPriests', e.target.value)}
                >
                    {primaryPriestList.map((item, index: number) => (
                        <MenuItem key={index} value={item.catogery}>
                            {item.catogery}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.primaryPriests && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.primaryPriests}</Typography>
                )}
            </FormControl>
        );
    };

    const secondaryPriest = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    id="grouped-select"
                    placeholder="Select Nakshatram"
                    onChange={(e) => handleFieldChange('secondaryPriest', e.target.value)}
                >
                    {primaryPriestList.map((item, index: number) => (
                        <MenuItem key={index} value={item.catogery}>
                            {item.catogery}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.secondaryPriest && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.secondaryPriest}</Typography>
                )}
            </FormControl>
        );
    };


    const editDietyInformation = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Edit Diety Information</Typography>
                </div>
                <Card sx={{ minHeight: "554px", maxHeight: "564px", overflowY: "scroll", boxShadow: "0px 2px 20px 0px rgba(237, 237, 237, 0.80)" }}>
                    <Grid container spacing={2} sx={{ marginTop: "0px", display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Grid xs={12} sm={3} item>
                            <CustomInputLabel>Diety Name</CustomInputLabel>
                            <CustomTextFeild
                                className={styles.textField}
                                fullWidth
                                required
                                onChange={(e) => handleFieldChange('dietyName', e.target.value)}
                            />
                            {errorMessage.dietyName && (
                                <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.dietyName}</Typography>
                            )}
                        </Grid>
                        <Grid xs={12} sm={3} item>
                            <CustomInputLabel>Description</CustomInputLabel>
                            <TextareaAutosize
                                style={{ padding: "14px 80px 55px 16px", height: "20px", width: "191px", backgroundColor: "#fff9e4", border: "none", borderRadius: "8px" }}
                                required
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                            />
                            {errorMessage.description && (
                                <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.description}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <CustomInputLabel>Primary Priest</CustomInputLabel>
                            {primaryPriest()}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <CustomInputLabel>Secondary Priest</CustomInputLabel>
                            {secondaryPriest()}
                        </Grid>
                        <Grid xs={12} sm={3} item>
                            <CustomInputLabel>Major Festivals</CustomInputLabel>
                            <TextareaAutosize
                                style={{ padding: "14px 80px 55px 16px", height: "20px", width: "191px", backgroundColor: "#fff9e4", border: "none", borderRadius: "8px" }}
                                required
                                onChange={(e) => handleFieldChange('majorFestival', e.target.value)}
                            />
                            {errorMessage.majorFestival && (
                                <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.majorFestival}</Typography>
                            )}
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
                {showDietyInfoDetails ? deityInformation() : ""}
                {showEditDietyInfo ? editDietyInformation() : ""}
            </div>
        </div>
    )
}

export default DataEntryDietyInformation
