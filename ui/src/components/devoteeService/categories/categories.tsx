import { Card, FormControl, Grid, MenuItem, Radio, Typography, styled } from '@mui/material';
import { CommonButton, CustomDeleteIcon, CustomInputLabel, CustomSelect, CustomTextFeild } from 'components/common/StyledComponents/StyledFields';
import styles from './categories.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { ValidationError, object, string } from 'yup';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

interface ErrorMessageTypes {
    dob: string;
    preferedLanguage: string;
    nakshatram: string;
    gothram: string;
    access: string;
    dateOfRegistration: string;
    updateDate: string;
    categorie: string;
}
const CustomRadioButton = styled(Radio)`
  & svg {
    color: #F05802;
    height: 24px;
    width:24px;
  }
`;

const Categories = () => {
    const [formData, setFormData] = useState({
        dob: "",
        preferedLanguage: "",
        nakshatram: "",
        gothram: "",
        access: "",
        dateOfRegistration: "",
        updateDate: "",
        categorie: "",
    })
    const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
        dob: "",
        preferedLanguage: "",
        nakshatram: "",
        gothram: "",
        access: "",
        dateOfRegistration: "",
        updateDate: "",
        categorie: "",
    })
    const validationSchema = object().shape({
        dob: string().required('DOB is required'),
        preferedLanguage: string().required('Prefered Language is required'),
        nakshatram: string().required('Nakshatra is required'),
        gothram: string().required('Gothram is required'),
        access: string().required('Access is required'),
        dateOfRegistration: string().required('Date Of Registration is required'),
        updateDate: string().required("UpdateDate is required"),
        categorie: string().required('Categorie is required'),
    })
    const handleAdd = async () => {
        const errors: ErrorMessageTypes = {
            dob: "",
            preferedLanguage: "",
            nakshatram: "",
            gothram: "",
            access: "",
            dateOfRegistration: "",
            updateDate: "",
            categorie: "",
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
    const categoriesList = [
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
    const CategoryDropdown = (): React.ReactElement => {
        return (
            <FormControl className={styles.dropDowns}>
                <CustomSelect
                    IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    defaultValue=""
                    id="grouped-select"
                    placeholder='Select categorie'
                    value={formData.categorie}
                    onChange={(e) => {
                        handleFieldChange('categorie', e.target.value);
                        setErrorMessage({ ...errorMessage, categorie: "" })
                    }}>
                    {categoriesList.map((item, index) => (
                        <MenuItem key={index} value={item.label}>
                            {item.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
                {errorMessage.categorie ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.categorie}</Typography> : ''}
            </FormControl>
        )
    }
    const ItemAddedData = [
        {
            Default: (
                <div>
                    <CustomRadioButton />
                </div>
            ),
            Categorie: "chairman",
            Action: (
                <div>
                    <CustomDeleteIcon />
                </div>
            ),
        },
        {
            Default: (
                <div>
                    <CustomRadioButton />
                </div>
            ),
            Categorie: "Priest",
            Action: (
                <div>
                    <CustomDeleteIcon />
                </div>
            ),
        },
    ]
    return (
        <div>
            <div style={{ display: "flex" }}>
                <LeftMainNavigation />
                <div className={styles.BoxContainer}>
                    <Typography component="div" className={styles.typoGraphyHeading}>
                        Devotee Service
                    </Typography>
                    <div className={styles.formContainer}>
                        <Typography component="div" className={styles.typoGraphy}>
                            Categories
                        </Typography>
                        <Typography className={styles.typography}>
                            Manager Manager<br />
                            1232 ARROWHEAD AVE.LIVERMORE<br />
                            CALIFORNIA-94551<br />
                            Home Phone: -Work Phone:-<br />
                        </Typography>
                        <Card className={styles.cardContainer}>
                            <div style={{ padding: "24px" }}>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Date Of Birth</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("dob", e.target.value);
                                                setErrorMessage({ ...errorMessage, dob: '' })
                                            }}
                                        />
                                        {errorMessage.dob ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.dob}</Typography> : ''}

                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Prefered Language</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("preferedLanguage", e.target.value)
                                                setErrorMessage({ ...errorMessage, preferedLanguage: '' });
                                            }}
                                        />
                                        {errorMessage.preferedLanguage ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.preferedLanguage}</Typography> : ''}

                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Nakshatram</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("nakshatram", e.target.value);
                                                setErrorMessage({ ...errorMessage, nakshatram: '' })
                                            }}
                                        />
                                        {errorMessage.nakshatram ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.nakshatram}</Typography> : ''}
                                    </Grid>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Gothram</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("gothram", e.target.value);
                                                setErrorMessage({ ...errorMessage, gothram: '' })
                                            }}
                                        />
                                        {errorMessage.gothram ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.gothram}</Typography> : ''}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                    <Grid xs={12} sm={3} item>
                                        <CustomInputLabel>Access</CustomInputLabel>
                                        <CustomTextFeild
                                            className={styles.textField}
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                handleFieldChange("access", e.target.value)
                                                setErrorMessage({ ...errorMessage, access: '' });
                                            }}
                                        />
                                        {errorMessage.access ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.access}</Typography> : ''}

                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Date of Registration</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                        onChange={(e) => {
                                            handleFieldChange("dateOfRegistration", e.target.value);
                                            setErrorMessage({ ...errorMessage, dateOfRegistration: '' })
                                        }}
                                    />
                                    {errorMessage.dateOfRegistration ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.dateOfRegistration}</Typography> : ''}
                                </Grid>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Update Date</CustomInputLabel>
                                    <CustomTextFeild
                                        className={styles.textField}
                                        fullWidth
                                        required
                                        onChange={(e) => {
                                            handleFieldChange("updateDate", e.target.value);
                                            setErrorMessage({ ...errorMessage, updateDate: '' })
                                        }}
                                    />
                                    {errorMessage.updateDate ? <Typography sx={{ color: "red", fontSize: "12px" }}>{errorMessage.updateDate}</Typography> : ''}
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                                <Grid xs={12} sm={3} item>
                                    <CustomInputLabel>Category</CustomInputLabel>
                                    {CategoryDropdown()}
                                </Grid>
                            </Grid>
                            <CommonButton sx={{ marginTop: "10px" }} onClick={handleAdd}>Add</CommonButton>
                        </div>

                        </Card>
                    </div>
                    <GridTableComponent tableData={ItemAddedData} />
                    <div style={{ paddingLeft: "24px" }}>
                        <CommonButton>Update</CommonButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Categories;
