/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styles from './donationType.module.scss';
import { Card, Grid, TextareaAutosize, Typography } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { CommonButton, CustomInputLabel, CustomTextFeild } from 'components/common/StyledComponents/StyledFields';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef, useState } from 'react';
import { object, string, ValidationError } from 'yup';
import { apiRequest } from 'infrastructure/backendService';


type ErrorMessageTypes = {
    name: string;
    description: string;
};

const DonationType = () => {
    const tableRef = useRef(null);
    const [showAddButton, setShowAddButton] = useState<boolean>(true);
    const [showAddDonationType, setShowAddDonationType] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        name: '',
        description: '',
    });
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const validationSchema = object().shape({
        name: string().required('Name is required'),
        description: string().required('Description is required'),
    });

    const donationTypeDetails = [
        {
            "No": "1",
            "Name": "Vinay",
            "Description": "Ashtottara Archana (All Deities)",
            "Action": (
                <DeleteIcon className={styles.editAnddeleteIcon} />
            ),
        },
        {
            "No": "2",
            "Name": "Hari",
            "Description": "Ashtottara Archana (All Deities)",
            "Action": (
                <DeleteIcon className={styles.editAnddeleteIcon} />
            ),
        },
    ];

    const handleSave = async (): Promise<void> => {

        const errors: ErrorMessageTypes = {
            name: '',
            description: '',
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
            name: formData.name,
            description: formData.description,
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
                <Typography className={styles.header}>Add Donation Type</Typography>
                <Card className={styles.cardConatiner}>
                    <Grid sx={{ marginTop: "0px", display: "flex", flexDirection: "column", padding: "20px" }}>
                        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column" }}>
                            <Grid xs={12} sm={3} item>
                                <CustomInputLabel>Name</CustomInputLabel>
                                <CustomTextFeild
                                    fullWidth
                                    required
                                    value={formData.name}
                                    onChange={(e) => {
                                        setErrorMessage({ ...errorMessage, name: '' });
                                        handleFieldChange('name', e.target.value);
                                    }}
                                    className={errorMessage.name ? styles.errorTextFeild : ""}
                                />
                                {errorMessage.name && (
                                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.name}</Typography>
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
                        </Grid>
                    </Grid>
                </Card>
                <CommonButton className={styles.addnewButton} onClick={handleSave}>
                    Add Donation Type
                </CommonButton>
            </div>
        )
    }

    const donationTypeTableData = () => {
        return (
            <div className={styles.donationTableContainer}>
                {showAddButton ?
                    <div className={styles.subContainer}>
                        <Typography className={styles.header}>Donation Type</Typography>
                        <CommonButton className={styles.addnewButton} onClick={handleAddNew}>
                            Add New
                        </CommonButton>
                    </div> : ''}
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={donationTypeDetails} tableRef={tableRef} />
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

export default DonationType