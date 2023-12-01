import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, styled } from '@mui/material';
import Button, { type ButtonProps } from '@mui/material/Button';
import styles from '../userLogin/login.module.scss';
import commonStyles from '../../../App.module.scss';
import { object, string, ref, ValidationError } from 'yup';
import { CustomTextFeild, CommonButton, CustomInputLabel } from '../../../components/common/StyledComponents/StyledFields';
import { apiRequest, checkAuthToken, getaccessToken } from 'infrastructure/backendService';
import { loginScreen } from '../userLogin/login';
import { useNavigate } from 'react-router-dom';

interface UserForm {
    oldpassword: string;
    newpassword: string;
    renternewpassword: string;
    // secretQuestion: string,
    // secretAnswer: string,
    // confirmanswertosecretquesstion: string;
}

type ErrorMessageTypes = {
    oldpassword: string;
    newpassword: string;
    renternewpassword: string;
    // secretQuestion: string,
    // secretAnswer: string,
    // confirmanswertosecretquesstion: string;

};

export default function ChangePassword() {

    const [userForm, setUserForm] = useState<UserForm>({
        oldpassword: '',
        newpassword: '',
        renternewpassword: '',
        // secretQuestion: '',
        // secretAnswer: '',
        // confirmanswertosecretquesstion: ''
    });
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        oldpassword: '',
        newpassword: '',
        renternewpassword: '',
        // secretQuestion: '',
        // secretAnswer: '',
        // confirmanswertosecretquesstion: ''
    });

    const navigate = useNavigate();

useEffect(()=>{
if(!checkAuthToken()) {
navigate('/')
}
   },[getaccessToken()])

    const handleFieldChange = (field: any, value: any): void => {
        setUserForm({
            ...userForm,
            [field]: value,
        });
    };

    const validationSchema = object().shape({
        oldpassword: string().required('Old Password is required'),
        newpassword: string().required('New Password is required'),
        renternewpassword: string()
            .required('Re- Enter New Password is required')
            .oneOf([ref('newpassword'), ''], 'New Password and Re- Enter Password must match'),
        // secretQuestion: string().required('Secret Question is required'),
        // secretAnswer: string().required('Secret Answer is required'),
        // confirmanswertosecretquesstion: string()
        //     .required('Confirm Secret Answer is required')
        //     .oneOf([ref('secretAnswer'), ''], 'Secret Answerd and Confirm Secret Answer must match'),
    });

    const submitApiCall = () => {
        const reqBody = {
            oldPassword: userForm.oldpassword,
            newPassword: userForm.newpassword,
            confirmNewPassword: userForm.renternewpassword,
            username: "002TEM" 
            // username: sessionStorage.getItem('username')
            // relation:formData.
            // added required parameters
        };
        apiRequest({
            method: 'POST',
            endpoint: '/devotee-management/devotee/changePassword',
            body: JSON.stringify(reqBody),
            includeToken: true,
        })
            .then((res) => {
                console.log(res, "resssssssssssss");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCancel = () => {
        setUserForm({
            oldpassword: '',
            newpassword: '',
            renternewpassword: '',
            // secretQuestion: '',
            // secretAnswer: '',
            // confirmanswertosecretquesstion: ''
        })
    }

    const handleSubmit = async (): Promise<void> => {
        const errors: ErrorMessageTypes = {
            oldpassword: '',
            newpassword: '',
            renternewpassword: '',
            // secretQuestion: '',
            // secretAnswer: '',
            // confirmanswertosecretquesstion: ''
        };
        try {
            // Validate the form data against the validation schema
            await validationSchema.validate(userForm, { abortEarly: false });
            // If validation passes, you can submit the form
            setErrorMessage(errors);

            // Call your API or perform other actions here
            submitApiCall();

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


    const userNameField = (): React.ReactElement => {
        return (
            <>
                <Box>
                    {/* <Grid container spacing={2} sx={{ marginTop: '0px' }}> */}
                        <Grid xs={12} sm={6} item sx={{ paddingBottom: "16px" }}>
                            <CustomInputLabel className={styles.profileLabels}>Old Password</CustomInputLabel>
                            <CustomTextFeild
                                error={!!errorMessage.oldpassword}
                                className={commonStyles.textField}
                                fullWidth={true}
                                helperText={errorMessage.oldpassword}
                                value={userForm.oldpassword}
                                onChange={(e) => {
                                    setErrorMessage({ ...errorMessage, oldpassword: '' });
                                    handleFieldChange('oldpassword', e.target.value);
                                }}
                                type='password'
                            />
                        </Grid>
                    {/* </Grid> */}
                   
                        <Grid xs={12} sm={6} item sx={{ paddingBottom: "16px" }}>
                            <CustomInputLabel className={styles.profileLabels}>New Password</CustomInputLabel>
                            <CustomTextFeild
                                error={!!errorMessage.newpassword}
                                className={commonStyles.textField}
                                fullWidth={true}
                                helperText={errorMessage.newpassword}
                                value={userForm.newpassword}
                                onChange={(e) => {
                                    setErrorMessage({ ...errorMessage, newpassword: '' });
                                    handleFieldChange('newpassword', e.target.value);
                                }}
                                type='password'
                            />
                        </Grid>
                        <Grid xs={12} sm={6} item sx={{ paddingBottom: "16px" }}>
                            <CustomInputLabel className={styles.profileLabels}>Re- Enter New Password</CustomInputLabel>
                            <CustomTextFeild
                                error={!!errorMessage.renternewpassword}
                                className={commonStyles.textField}
                                fullWidth={true}
                                helperText={errorMessage.renternewpassword}
                                value={userForm.renternewpassword}
                                onChange={(e) => {
                                    setErrorMessage({ ...errorMessage, renternewpassword: '' });
                                    handleFieldChange('renternewpassword', e.target.value);
                                }}
                                type='password'
                            />
                        </Grid>
                   
                    {/* <Grid container spacing={2} sx={{ marginTop: '0px' }}>
                        <Grid xs={12} sm={6} item sx={{ paddingBottom: "16px" }}>
                            <CustomInputLabel className={styles.profileLabels}>Secret Question</CustomInputLabel>
                            <CustomTextFeild
                                error={!!errorMessage.secretQuestion}
                                className={commonStyles.textField}
                                fullWidth={true}
                                helperText={errorMessage.secretQuestion}
                                value={userForm.secretQuestion}
                                onChange={(e) => {
                                    setErrorMessage({ ...errorMessage, secretQuestion: '' });
                                    handleFieldChange('secretQuestion', e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ marginTop: '0px' }}>
                        <Grid xs={12} sm={6} item sx={{ paddingBottom: "16px" }}>
                            <CustomInputLabel className={styles.profileLabels}>Answer to Secret</CustomInputLabel>
                            <CustomTextFeild
                                error={!!errorMessage.secretAnswer}
                                className={commonStyles.textField}
                                fullWidth={true}
                                helperText={errorMessage.secretAnswer}
                                value={userForm.secretAnswer}
                                onChange={(e) => {
                                    setErrorMessage({ ...errorMessage, secretAnswer: '' });
                                    handleFieldChange('secretAnswer', e.target.value);
                                }}
                                type='password'
                            />
                        </Grid>
                        <Grid xs={12} sm={6} item sx={{ paddingBottom: "16px" }}>
                            <CustomInputLabel className={styles.profileLabels}>Confirm Answer to Secret</CustomInputLabel>
                            <CustomTextFeild
                                error={!!errorMessage.confirmanswertosecretquesstion}
                                className={commonStyles.textField}
                                fullWidth={true}
                                helperText={errorMessage.confirmanswertosecretquesstion}
                                value={userForm.confirmanswertosecretquesstion}
                                onChange={(e) => {
                                    setErrorMessage({ ...errorMessage, confirmanswertosecretquesstion: '' });
                                    handleFieldChange('confirmanswertosecretquesstion', e.target.value);
                                }}
                                type='password'
                            />
                        </Grid>
                    </Grid> */}
                    <Grid xs={12} item sx={{ marginTop: "20px" }}>
                        <Button color="warning" fullWidth={true} variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button
                            color="warning"
                            fullWidth={true}
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{ marginTop: '20px' }}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Box>
            </>
        )
    };

    const userFields = (): React.ReactElement => {
        return (
            <>
                <Box sx={{ marginTop: "10px" }}>
                    {/* <Typography variant="h4" component="h4" align="left">
                        Login
                    </Typography> */}
                    <Typography align='left' sx={{ fontSize: "24px",paddingBottom:"24px" }}>
                        Change Password
                    </Typography>
                </Box>
                {userNameField()}
            </>
        )
    };

    return (
        <div>
            {userFields()}
        </div>
    );
};
