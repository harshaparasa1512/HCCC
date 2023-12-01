import { Card, Typography, Grid, TextareaAutosize } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useState, useEffect, useRef } from 'react';
import styles from '../managePolicies/managePolicies.module.scss';
import { object, string, ValidationError } from 'yup';
import {
    CustomEditIcon,
    CustomDeleteIcon,
    CommonButton,
    CustomInputLabel,
    CustomTextFeild,
} from 'components/common/StyledComponents/StyledFields';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

type ErrorMessageTypes = {
    policyTitle: string;
    description: string;
};

const DataEntryManagePolicy = () => {
    const tableRef = useRef(null);
    const [showManagePolicies, setShowManagePolicies] = useState<boolean>(false);
    const [showManagePolicyDetails, setShowManagePolicyDetails] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        policyTitle: '',
        description: '',
    });

    const validationSchema = object().shape({
        policyTitle: string().required('Policy Title is required'),
        description: string().required('Description is required'),
    });

    const [formData, setFormData] = useState({
        policyTitle: '',
        description: '',
    });

    const handleSave = async (): Promise<void> => {
        const errors: ErrorMessageTypes = {
            policyTitle: '',
            description: '',
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

    const managePolicyDetails = [
        {
            "S.No": "1",
            "Policy Title": "Title Name 123",
            "Date Entered": "11/11/2023",
            "Date Last Modified": "13/11/2023",
            Action: (
                <div>
                    <CustomEditIcon />
                    <CustomDeleteIcon />
                </div>
            ),
        },
        {
            "S.No": "2",
            "Policy Title": "Title Name 456",
            "Date Entered": "11/11/2023",
            "Date Last Modified": "13/11/2023",
            Action: (
                <div>
                    <CustomEditIcon />
                    <CustomDeleteIcon />
                </div>
            ),
        },
    ];

    const handleAddnew = () => {
        setShowManagePolicies(true);
        setShowManagePolicyDetails(false);
    };

    const managePolicies = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Manage Policies</Typography>
                    <CommonButton className={styles.addnewButton} onClick={handleAddnew}>
                        Add New
                    </CommonButton>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={managePolicyDetails} tableRef={tableRef} />
                </div>
            </div>
        );
    };

    const addNewPolicy = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Add New Policy</Typography>
                </div>
                <Card sx={{ height: "271px", boxShadow: "0px 2px 20px 0px rgba(237, 237, 237, 0.80)" }}>
                    <Grid container spacing={2} sx={{ marginTop: "0px", display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Grid xs={12} sm={3} item>
                            <CustomInputLabel>Policy Title</CustomInputLabel>
                            <CustomTextFeild
                                className={styles.textField}
                                fullWidth
                                required
                                value={formData.policyTitle}
                                onChange={(e) => handleFieldChange('policyTitle', e.target.value)}
                            />
                            {errorMessage.policyTitle && (
                                <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.policyTitle}</Typography>
                            )}
                        </Grid>
                        <Grid xs={12} sm={3} item>
                            <CustomInputLabel>Description</CustomInputLabel>
                            <TextareaAutosize
                                style={{ padding: "14px 717px 55px 16px", backgroundColor: "#fff9e4", border: "none", borderRadius: "8px" }}
                                required
                                value={formData.description}
                                onChange={(e) => handleFieldChange('description', e.target.value)}
                            />
                            {errorMessage.description && (
                                <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.description}</Typography>
                            )}
                        </Grid>
                    </Grid>
                </Card>
                <CommonButton sx={{ marginTop: "10px", marginBottom: "10px" }} onClick={handleSave}>
                    Add New
                </CommonButton>
            </div>
        );
    };

    return (
        <div style={{ display: "flex" }}>
            <LeftMainNavigation />
            <div className={styles.mainContainer}>
                {showManagePolicyDetails ? managePolicies() : ""}
                {showManagePolicies ? addNewPolicy() : ""}
            </div>
        </div>
    );
};

export default DataEntryManagePolicy;
