import styles from './donationPurpose.module.scss';
import { Card, Grid, TextareaAutosize, Typography } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { CommonButton, CustomCheckbox, CustomInputLabel, CustomTextFeild } from 'components/common/StyledComponents/StyledFields';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef, useState } from 'react';
import { object, string, ValidationError } from 'yup';
import { apiRequest } from 'infrastructure/backendService';


type ErrorMessageTypes = {
    accountNumbers: string;
    description: string;
    tabgibleValue: string;
    tangiblePercentage: string;
    minAmountToImpValue: string;
};

const DonationPurpose = () => {
    const tableRef = useRef(null);
    const [showAddButton, setShowAddButton] = useState<boolean>(true);
    const [showAddDonationType, setShowAddDonationType] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        accountNumbers: '',
        description: '',
        tabgibleValue: '',
        tangiblePercentage: '',
        minAmountToImpValue: '',
    });
    const [formData, setFormData] = useState({
        accountNumbers: '',
        description: '',
        tabgibleValue: '',
        tangiblePercentage: '',
        minAmountToImpValue: '',
    });

    const validationSchema = object().shape({
        accountNumbers: string().required('Pooja Title is required'),
        description: string().required('Description is required'),
        tabgibleValue: string().required('Hour is required'),
        tangiblePercentage: string().required('Min  is required'),
        minAmountToImpValue: string().required('Suggested Donation is required')
    });

    const donationPurposeDetails = [
        {
            "Account Number": "3232134324",
            "Description": "Ashtottara Archana (All Deities)",
            "Action": (
                <div style={{ display: "flex" }}>
                    <EditIcon className={styles.editAnddeleteIcon} />
                    <DeleteIcon className={styles.editAnddeleteIcon} />
                </div>
            ),
        },
        {
            "Account Number": "3232134324",
            "Description": "Ashtottara Archana (All Deities)",
            "Action": (
                <div style={{ display: "flex" }}>
                    <EditIcon className={styles.editAnddeleteIcon} />
                    <DeleteIcon className={styles.editAnddeleteIcon} />
                </div>
            ),
        },
    ];

    const handleSave = async (): Promise<void> => {

        const errors: ErrorMessageTypes = {
            accountNumbers: '',
            description: '',
            tabgibleValue: '',
            tangiblePercentage: '',
            minAmountToImpValue: '',
        };

        try {
            // Validate the form data against the validation schema
            await validationSchema.validate(formData, { abortEarly: false });
            // If validation passes, you can submit the form
            setErrorMessage(errors);
            alert('Details Saved Successful');

            // Call your API or perform other actions here
            saveApiCall();

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

    const saveApiCall = () => {
        const reqBody = {
            accountNumbers: formData.accountNumbers,
            description: formData.description,
            tabgibleValue: formData.tabgibleValue,
            tangiblePercentage: formData.tangiblePercentage,
            minAmountToImpValue: formData.minAmountToImpValue,
            // relation:formData.
            // added required parameters
        };
        apiRequest({
            method: 'POST',
            endpoint: '/',
            body: JSON.stringify(reqBody),
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleFieldChange = (field: string, value: any) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };


    const handleAddDonationType = () => {
        alert("Added Donation Type....")
    }

    const handleAddNew = () => {
        setShowAddDonationType(true);
        setShowAddButton(false);
    }

    const addDonationType = () => {
        return (
            <div>
                <Typography className={styles.header}>Add Donation Purpose</Typography>
                <Card className={styles.cardConatiner}>
                    <Grid sx={{ marginTop: "0px", display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column" }}>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Account Number</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.accountNumbers}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, accountNumbers: '' });
                                        handleFieldChange('accountNumbers', e.target.value);
                                    }}
                                    className={errorMessage.accountNumbers ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.accountNumbers && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.accountNumbers}</Typography>
                                )}
                            </Grid>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Description</CustomInputLabel>
                                <TextareaAutosize
                                    style={{ padding: "14px 717px 55px 16px", backgroundColor: "#fff9e4", border: "none", borderRadius: "8px" }}
                                    required
                                    value={formData.description}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, description: '' });
                                        handleFieldChange('description', e.target.value);
                                    }}
                                    className={errorMessage.description ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.description && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.description}</Typography>
                                )}
                            </Grid>
                            <Grid container spacing={2} sx={{ padding: "0px 0px 0px 14px" }}>
                                <Grid xs={12} sm={3} item>
                                    <div style={{ display: "flex", alignItems: 'center', marginTop: '25px' }}>
                                        <CustomCheckbox />
                                        <CustomInputLabel>Tangible Value</CustomInputLabel>
                                    </div>
                                    <CustomTextFeild
                                        fullWidth
                                        required
                                        value={formData.tabgibleValue}
                                        onChange={(e) => {
                                            setErrorMessage({ ...errorMessage, tabgibleValue: '' });
                                            handleFieldChange('tabgibleValue', e.target.value);
                                        }}
                                        className={errorMessage.tabgibleValue ? styles.errorTextFeild : ""}
                                    />
                                    {errorMessage.tabgibleValue && (
                                        <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.tabgibleValue}</Typography>
                                    )}
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <div style={{ display: "flex", alignItems: 'center', marginTop: '25px' }}>
                                        <CustomCheckbox />
                                        <CustomInputLabel>Tangible Percentage</CustomInputLabel>
                                    </div>
                                    <CustomTextFeild
                                        fullWidth
                                        required
                                        value={formData.tangiblePercentage}
                                        onChange={(e) => {
                                            setErrorMessage({ ...errorMessage, tangiblePercentage: '' });
                                            handleFieldChange('tangiblePercentage', e.target.value);
                                        }}
                                        className={errorMessage.tangiblePercentage ? styles.errorTextFeild : ""}
                                    />
                                    {errorMessage.tangiblePercentage && (
                                        <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.tangiblePercentage}</Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Min.Amount to imp_tan.value</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.minAmountToImpValue}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, minAmountToImpValue: '' });
                                        handleFieldChange('minAmountToImpValue', e.target.value);
                                    }}
                                    className={errorMessage.minAmountToImpValue ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.minAmountToImpValue && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.minAmountToImpValue}</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
                <CommonButton className={styles.addnewButton} onClick={handleSave}>
                    Add
                </CommonButton>
            </div>
        )
    }

    const donationTypeTableData = () => {
        return (
            <div className={styles.donationTableContainer}>
                {showAddButton ?
                    <div className={styles.subContainer}>
                        <Typography className={styles.header}>Donation Purpose</Typography>
                        <CommonButton className={styles.addnewButton} onClick={handleAddNew}>
                            Add New
                        </CommonButton>
                    </div> : ''}
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={donationPurposeDetails} tableRef={tableRef} />
                </div>
            </div>
        )
    }


    return (
        <div className={styles.mainContainer}>
            {showAddDonationType ? addDonationType() : ''}
            {donationTypeTableData()}
        </div>
    )
}

export default DonationPurpose