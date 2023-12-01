import { CommonButton, CustomInputLabel, CustomSelect } from 'components/common/StyledComponents/StyledFields';
import styles from './managementTeamcategory.module.scss';
import { Card, FormControl, Grid, MenuItem, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { object, string, ValidationError } from 'yup';
import { apiRequest } from 'infrastructure/backendService';
import { useState } from 'react';

type ErrorMessageTypes = {
    boardOfDirectors: string;
    executiveCommittees: string;
    steeringCommittees: string;
};

const ManagementTeamCategory = () => {
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        boardOfDirectors: '',
        executiveCommittees: '',
        steeringCommittees: '',
    });
    const [formData, setFormData] = useState({
        boardOfDirectors: '',
        executiveCommittees: '',
        steeringCommittees: '',
    });

    const validationSchema = object().shape({
        boardOfDirectors: string().required('Pooja Title is required'),
        executiveCommittees: string().required('Description is required'),
        steeringCommittees: string().required('Hour is required')
    });



    const boardOfDirectorsList = [
        {
            label: 'Chairman Administration',
        },
        {
            label: 'Chairman Administration 2',
        },
    ];

    const executiveCommitteeList = [
        {
            label: 'Chairman Food Committee',
        },
        {
            label: 'Chairman Food Committee 2',
        },
    ];

    const steeringCommitteeList = [
        {
            label: 'Chairman Treasury',
        },
        {
            label: 'Chairman Treasury 2',
        },
    ];

    const handleSave = async (): Promise<void> => {

        const errors: ErrorMessageTypes = {
            boardOfDirectors: '',
            executiveCommittees: '',
            steeringCommittees: '',
        };

        try {
            // Validate the form data against the validation schema
            await validationSchema.validate(formData, { abortEarly: false });
            // If validation passes, you can submit the form
            setErrorMessage(errors);
            alert('Details Saved Successful');

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

    const saveApiCall = () => {
        const reqBody = {
            poojaTiboardOfDirectorstle: formData.boardOfDirectors,
            executiveCommittees: formData.executiveCommittees,
            steeringCommittees: formData.steeringCommittees,
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

    const handleSubmit = () => {
        alert("Addded.........")
    }

    const boardOfDirectordsDropdown = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    id="grouped-select"
                    placeholder="Select Option"
                    value={formData.boardOfDirectors}
                    onChange={(e) => {
                        setErrorMessage({ ...errorMessage, boardOfDirectors: '' });
                        handleFieldChange('boardOfDirectors', e.target.value);
                    }}
                    className={errorMessage.boardOfDirectors ? styles.errorTextFeild : ""}
                >
                    {boardOfDirectorsList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.boardOfDirectors && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.boardOfDirectors}</Typography>
                )}
            </FormControl>
        );
    };

    const executiveCommitteeDropdown = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    id="grouped-select"
                    placeholder="Select Option"
                    value={formData.executiveCommittees}
                    onChange={(e) => {
                        setErrorMessage({ ...errorMessage, executiveCommittees: '' });
                        handleFieldChange('executiveCommittees', e.target.value);
                    }}
                    className={errorMessage.executiveCommittees ? styles.errorTextFeild : ""}
                >
                    {executiveCommitteeList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.executiveCommittees && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.executiveCommittees}</Typography>
                )}
            </FormControl>
        );
    };

    const steeringCommitteeDropdown = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    id="grouped-select"
                    placeholder="Select Option"
                    value={formData.steeringCommittees}
                    onChange={(e) => {
                        setErrorMessage({ ...errorMessage, steeringCommittees: '' });
                        handleFieldChange('steeringCommittees', e.target.value);
                    }}
                    className={errorMessage.steeringCommittees ? styles.errorTextFeild : ""}
                >
                    {steeringCommitteeList.map((item, index: number) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.steeringCommittees && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.steeringCommittees}</Typography>
                )}
            </FormControl>
        );
    };

    const ManagementTeamCategoryFields = () => {
        return (
            <div>
                <Typography className={styles.header}>Management Team Category</Typography>
                <Card className={styles.cardConatiner}>
                    <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column", padding: "24px" }}>
                        <Grid item xs={12} sm={3}>
                            <CustomInputLabel>Board Of Directors</CustomInputLabel>
                            {boardOfDirectordsDropdown()}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <CustomInputLabel>Executive Committee</CustomInputLabel>
                            {executiveCommitteeDropdown()}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <CustomInputLabel>Steering Committee</CustomInputLabel>
                            {steeringCommitteeDropdown()}
                        </Grid>
                    </Grid>
                </Card>
                <CommonButton className={styles.addnewButton} onClick={handleSave}>
                    Submit
                </CommonButton>
            </div>
        )
    }
    return (
        <div className={styles.mainContainer}>
            {ManagementTeamCategoryFields()}
        </div>
    )
}

export default ManagementTeamCategory