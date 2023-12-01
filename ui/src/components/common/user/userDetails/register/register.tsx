import Typography from '@mui/material/Typography';
import styles from './register.module.scss';
import commonStyles from 'App.module.scss';
import { Grid, styled } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import familyIcon from '../../../../../assets/familymember.svg';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
   CustomCalendarTodayOutlinedIcon,
   CustomTextFeild,
   CustomInputLabel,
   CustomDatePicker,
   StyledDateContainer,
   CustomCheckbox,
   CustomSelect,
   CustomEditIcon,
   CustomDeleteIcon,
   CommonButton,
   ContactNumberInput,
} from 'components/common/StyledComponents/StyledFields';
import { apiRequest, checkAuthToken, getaccessToken } from 'infrastructure/backendService';
import EmptyPage from 'components/common/emptyPages/emptyPage';
import FamilyDetails from '../../familyDetails/familyDetails';
import { object, string, ref, ValidationError } from 'yup';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';


interface ErrorMessageTypes {
   firstName: string;
   middleName: string;
   lastName: string;
   dateOfBirth: string;
   weddinganniversary: string;
   preferedlanguage: string;
   nakshatram: string;
   gothram: string;
   address: string;
   city: string;
   state: string;
   zipcode: string;
   country: string;
   email: string;
   phoneNumber: string;
   userName: string;
   password: string;
   reenterpassword: string;
   secretQuestion: string;
   answerTosecretQuestion: string;
   confirmAnswerTosecretQuestion: string;
}

export default function Register() {
   const [showSpecialEventsForm, setShowSpecialEventsForm] = useState<boolean>(false);
   const [showAddMoreFields, setShowAddMoreFields] = useState<boolean>(false);
   const tableRef = useRef(null);
   const [errorMessage, setErrorMessage] = useState<ErrorMessageTypes>({
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      weddinganniversary: '',
      preferedlanguage: '',
      nakshatram: '',
      gothram: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      email: '',
      phoneNumber: '',
      userName: '',
      password: '',
      reenterpassword: '',
      secretQuestion: '',
      answerTosecretQuestion: '',
      confirmAnswerTosecretQuestion: '',
   });

   const navigate = useNavigate();

   // useEffect(() => {
   //    if (!checkAuthToken()) {
   //       navigate('/');
   //    }
   // }, [getaccessToken()]);

   useEffect(() => {
      apiRequest({
         method: 'GET',
         endpoint: '/devotee-management/country',
         // body: JSON.stringify(reqBody),
      })
         .then((res) => {
            console.log(res, 'country......');
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   const validationSchema = object().shape({
      firstName: string().required('First Name is required'),
      lastName: string().required('Last Name is required'),
      middleName: string().required('Middle Name is required'),
      dateOfBirth: string().required('DOB is required'),
      email: string().email('Invalid email address').required('Email is required'),
      address: string().required('Address is required'),
      country: string().required('Country is required'),
      city: string().required('city is required'),
      state: string().required('state is required'),
      zipcode: string().required('zipcode is required'),
      gothram: string().required('gothram is required'),
      nakshatram: string().required('nakshatram is required'),
      weddinganniversary: string().required('wedding anniversary is required'),
      phoneNumber: string().required('Phone Number is required'),
      userName: string().required('User Name is required'),
      password: string().required('Password is required'),
      reenterpassword: string()
         .required('Re-enter Password is required')
         .oneOf([ref('password'), ''], 'Passwords must match'),
      secretQuestion: string().required('Secret Question is required'),
      answerTosecretQuestion: string().required('Answer to Secret Question is required'),
      confirmAnswerTosecretQuestion: string()
         .required('Confirm Answer to Secret Question is required')
         .oneOf([ref('answerTosecretQuestion'), ''], 'Answers must match'),
   });

   const specialEventsData = [
      {
         Event: 'Vinay',
         Date: '06/11/2023',
         Email: 'abcd@gmail.com',
         Relation: 'Father',
         Action: (
            <div>
               <CustomEditIcon />
               <CustomDeleteIcon />
            </div>
         ),
      },
      {
         Event: 'Hari',
         Date: '06/11/2023',
         Email: 'mnop@gmail.com',
         Relation: 'Father',
         Action: (
            <div>
               <CustomEditIcon />
               <CustomDeleteIcon />
            </div>
         ),
      },
   ];

   const handleShowForm = () => {
      setShowSpecialEventsForm(true);
      console.log('but...............');
   };

   const [formData, setFormData] = useState({
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      weddinganniversary: '',
      preferedlanguage: '',
      nakshatram: '',
      gothram: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      email: '',
      phoneNumber: '',
      userName: '',
      password: '',
      reenterpassword: '',
      secretQuestion: '',
      answerTosecretQuestion: '',
      confirmAnswerTosecretQuestion: '',
   });

   const relationList = [
      {
         relationName: 'Father',
      },
      {
         relationName: 'Mother',
      },
      {
         relationName: 'Son',
      },
      {
         relationName: 'Son-in-law',
      },
      {
         relationName: 'daughter-in-law',
      },
      {
         relationName: 'daughter-in-law',
      },
   ];

   const exampleNames = [
      {
         name: 'Subscribe to birthday wish',
      },
      {
         name: 'Perform Birthday Pooja',
      },
      {
         name: 'Subscribe for Anniversary Wishes',
      },
      {
         name: 'Subscribe to Weekly E-mail',
      },
   ];

   const NakshatraList = [
      {
         label: 'Ashvini',
      },
      {
         label: 'Bharani',
      },
      {
         label: 'Krithika',
      },
      {
         label: 'Rohini',
      },
      {
         label: 'Mrigashirsha',
      },
      {
         label: 'Ardra',
      },
      {
         label: 'Punarvasu',
      },
      {
         label: 'Pushya',
      },
      {
         label: 'Ashlesha',
      },
      {
         label: 'Magha',
      },
      {
         label: 'Purva Phalguni',
      },
      {
         label: 'Uttara Phalguni',
      },
      {
         label: 'Hasta',
      },
      {
         label: 'Chitra',
      },
      {
         label: 'Swati',
      },
      {
         label: 'Vishakha',
      },
      {
         label: 'Anuradha',
      },
      {
         label: 'Jyeshtha',
      },
      {
         label: 'Mula',
      },
      {
         label: 'Purva Ashadha',
      },
      {
         label: 'Uttara Ashadha',
      },
      {
         label: 'Shravana',
      },
      {
         label: 'Dhanishtha',
      },
      {
         label: 'Shatabhisha',
      },
      {
         label: 'Purva Bhadrapada',
      },
      {
         label: 'Uttara Bhadrapada',
      },
      {
         label: 'Revati',
      },
   ];

   const gothramList = [
      {
         label: 'gothramName',
      },
      {
         label: 'gothramName',
      },
      {
         label: 'gothramName',
      },
      {
         label: 'gothramName',
      },
      {
         label: 'gothramName',
      },
      {
         label: 'gothramName',
      },
   ];

   const preferedLanguageList = [
      {
         language: 'Telugu',
      },
      {
         language: 'Hindi',
      },
      {
         language: 'English',
      },
      {
         language: 'Tamil',
      },
   ];

   const handleCancel = () => {
      setFormData({
         firstName: '',
         middleName: '',
         lastName: '',
         dateOfBirth: '',
         weddinganniversary: '',
         preferedlanguage: '',
         nakshatram: '',
         gothram: '',
         address: '',
         city: '',
         state: '',
         zipcode: '',
         country: '',
         email: '',
         phoneNumber: '',
         userName: '',
         password: '',
         reenterpassword: '',
         secretQuestion: '',
         answerTosecretQuestion: '',
         confirmAnswerTosecretQuestion: '',
      });
   };

   const handleFieldChange = (field: string, value: any) => {
      if (field === 'dateOfBirth' || field === 'weddinganniversary') {
         const formattedDate = dayjs(value, 'MM-DD-YYYY');

         setFormData({
            ...formData,
            [field]: formattedDate.isValid() ? formattedDate.format('MM-DD-YYYY') : '',
         });
         console.log(dayjs(value).format('MM-DD-YYYY'));
      } else {
         setFormData({
            ...formData,
            [field]: value,
         });
      }
   };

   const nakshatramDropdown = (): React.ReactElement => {
      return (
         <FormControl className={styles.dropDowns}>
            <CustomSelect
               IconComponent={KeyboardArrowDownIcon}
               id="grouped-select"
               placeholder="Select Nakshatram"
               value={formData.nakshatram}
               onChange={(e) => {
                  setErrorMessage({ ...errorMessage, nakshatram: '' });
                  handleFieldChange('nakshatram', e.target.value);
               }}
               className={errorMessage.nakshatram ? styles.errorTextFeild : ''}
            >
               {NakshatraList.map((item, index: number) => (
                  <MenuItem key={index} value={item.label}>
                     {item.label}
                  </MenuItem>
               ))}
            </CustomSelect>
            {errorMessage.nakshatram ? (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorMessage.nakshatram}
               </Typography>
            ) : (
               ''
            )}
         </FormControl>
      );
   };

   const gothramDropdown = (): React.ReactElement => {
      return (
         <FormControl className={styles.dropDowns}>
            <CustomSelect
               IconComponent={KeyboardArrowDownIcon}
               id="grouped-select"
               placeholder="Select Gothram"
               value={formData.gothram}
               onChange={(e) => {
                  setErrorMessage({ ...errorMessage, gothram: '' });
                  handleFieldChange('gothram', e.target.value);
               }}
               className={errorMessage.gothram ? styles.errorTextFeild : ''}
            >
               {gothramList.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                     {item.label}
                  </MenuItem>
               ))}
            </CustomSelect>
            {errorMessage.gothram ? (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorMessage.gothram}
               </Typography>
            ) : (
               ''
            )}
         </FormControl>
      );
   };

   const prefferedLanguageDropdown = (): React.ReactElement => {
      return (
         <FormControl className={styles.dropDowns}>
            <CustomSelect
               IconComponent={KeyboardArrowDownIcon}
               defaultValue=""
               id="grouped-select"
               value={formData.preferedlanguage}
               onChange={(e) => handleFieldChange('preferedlanguage', e.target.value)}
               className={errorMessage.preferedlanguage ? styles.errorTextFeild : ''}
            >
               {preferedLanguageList.map((item, index) => (
                  <MenuItem key={index} value={item.language}>
                     {item.language}
                  </MenuItem>
               ))}
            </CustomSelect>
            {errorMessage.preferedlanguage && (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorMessage.preferedlanguage}
               </Typography>
            )}
         </FormControl>
      );
   };

   const handleSave = async (): Promise<void> => {
      const errors: ErrorMessageTypes = {
         firstName: '',
         middleName: '',
         lastName: '',
         dateOfBirth: '',
         weddinganniversary: '',
         preferedlanguage: '',
         nakshatram: '',
         gothram: '',
         address: '',
         city: '',
         state: '',
         zipcode: '',
         country: '',
         email: '',
         phoneNumber: '',
         userName: '',
         password: '',
         reenterpassword: '',
         secretQuestion: '',
         answerTosecretQuestion: '',
         confirmAnswerTosecretQuestion: '',
      };

      try {
         // Validate the form data against the validation schema
         await validationSchema.validate(formData, { abortEarly: false });
         // If validation passes, you can submit the form
         setErrorMessage(errors);
         // alert('Registration Successful');
         // Call your API or perform other actions here
         saveApiCall();
         // console.log("Register Successful")
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
         firstname: formData.firstName,
         middleName: formData.middleName,
         lastname: formData.lastName,
         dateOfBirth: formData.dateOfBirth,
         weddinganniversary: formData.weddinganniversary,
         preferredLanguage: formData.preferedlanguage,
         phoneResidence: formData.phoneNumber,
         nakshatram: formData.nakshatram,
         gothram: formData.gothram,
         address: formData.address,
         city: formData.city,
         state: formData.state,
         zipcode: formData.zipcode,
         country: formData.country,
         phoneWork: formData.phoneNumber,
         email: formData.email,
         username: formData.userName,
         password: formData.password,
         hintQuestion: formData.secretQuestion,
         hintAnswer: formData.answerTosecretQuestion,
         // dateOfRegistration : "",
         // relation:'',
         // updateDate : "",
      };
      apiRequest({
         method: 'POST',
         endpoint: '/devotee-management/createDevotee',
         body: JSON.stringify(reqBody),
      })
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleButtons = () => {
      return (
         <div>
            <button className={commonStyles.cancelButton} onClick={handleCancel}>
               Cancel
            </button>
            <button className={commonStyles.saveButton} onClick={handleSave}>
               Register Now
            </button>
         </div>
      );
   };
   const emptyPageButton = (): React.ReactElement => {
      return (
         <div>
            <button className={styles.addfamilyButton} onClick={handleShowForm}>
               Add More
            </button>
         </div>
      );
   };

   const BasicDatePicker = (): React.ReactElement => {
      return (
         <div style={{ minWidth: '100%', marginTop: '12px' }}>
            <StyledDateContainer
               sx={{ backgroundColor: '#FFF9E4', borderRadius: '8px', height: '48px' }}
            >
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                     <CustomDatePicker
                        slots={{
                           openPickerIcon: CustomCalendarTodayOutlinedIcon,
                        }}
                        slotProps={{
                           inputAdornment: {
                              position: 'end',
                           },
                        }}
                        format="DD-MM-YYYY"
                        value={
                           formData.dateOfBirth ? dayjs(formData.dateOfBirth, 'MM-DD-YYYY') : ''
                        }
                        onChange={(value) => {
                           setErrorMessage({ ...errorMessage, dateOfBirth: '' });
                           handleFieldChange('dateOfBirth', value);
                        }}
                        className={errorMessage.dateOfBirth ? styles.errorDateFeild : ''}
                     />
                  </DemoContainer>
               </LocalizationProvider>
               {errorMessage.dateOfBirth ? (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {errorMessage.dateOfBirth}
                  </Typography>
               ) : (
                  ''
               )}
            </StyledDateContainer>
         </div>
      );
   };

   const WeddingDatePicker = (): React.ReactElement => {
      return (
         <div style={{ minWidth: '100%', marginTop: '12px' }}>
            <StyledDateContainer
               sx={{ backgroundColor: '#FFF9E4', borderRadius: '8px', height: '48px' }}
            >
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                     <CustomDatePicker
                        slots={{
                           openPickerIcon: CustomCalendarTodayOutlinedIcon,
                        }}
                        slotProps={{
                           inputAdornment: {
                              position: 'end',
                           },
                        }}
                        format="DD-MM-YYYY"
                        value={
                           formData.weddinganniversary
                              ? dayjs(formData.weddinganniversary, 'MM-DD-YYYY')
                              : ''
                        }
                        onChange={(value) => {
                           setErrorMessage({ ...errorMessage, weddinganniversary: '' });
                           handleFieldChange('weddinganniversary', value);
                        }}
                        className={errorMessage.weddinganniversary ? styles.errorDateFeild : ''}
                     />
                  </DemoContainer>
               </LocalizationProvider>
               {errorMessage.weddinganniversary ? (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {errorMessage.weddinganniversary}
                  </Typography>
               ) : (
                  ''
               )}
            </StyledDateContainer>
         </div>
      );
   };

   const SpecialEventsList = (): React.ReactElement => {
      return (
         <FormControl sx={{ width: '100%' }}>
            <CustomSelect IconComponent={KeyboardArrowDownIcon} defaultValue="" id="grouped-select">
               <MenuItem value={formData.preferedlanguage}>
                  <em>Select Special Events</em>
               </MenuItem>
               <MenuItem value={1}>Subscribe to birthday wish</MenuItem>
               <MenuItem value={2}>Subscribe for Anniversary Wishes</MenuItem>
               <MenuItem value={3}>Perform Birthday Pooja</MenuItem>
               <MenuItem value={4}>Subscribe to Weekly E-mail</MenuItem>
            </CustomSelect>
         </FormControl>
      );
   };

   const handleAddMore = () => {
      setShowAddMoreFields(true);
   };

   const specialEvents = () => {
      return (
         <Grid container spacing={2} sx={{ marginTop: '0px' }}>
            <Grid xs={12} sm={3} item>
               <CustomInputLabel>Events</CustomInputLabel>
               {SpecialEventsList()}
            </Grid>
            <Grid xs={12} sm={3} item>
               <CustomInputLabel>Date</CustomInputLabel>
               <CustomTextFeild
                  className={styles.textField}
                  fullWidth
                  required
                  value={formData.middleName}
                  onChange={(e) => handleFieldChange('middleName', e.target.value)}
               />
            </Grid>
         </Grid>
      );
   };

   return (
      <div className={styles.BoxContainer}>
         <Typography component="div" className={styles.typoGraphyHeading}>
            Register
         </Typography>
         <div className={styles.formContainer}>
            <Typography component="div" className={styles.typoGraphy}>
               Basic Information
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid xs={12} sm={3} item>
                  <CustomInputLabel>First Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.firstName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, firstName: '' });
                        handleFieldChange('firstName', e.target.value);
                     }}
                     className={errorMessage.firstName ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.firstName && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.firstName}
                     </Typography>
                  )}
               </Grid>
               <Grid xs={12} sm={3} item>
                  <CustomInputLabel>Middle Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.middleName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, middleName: '' });
                        handleFieldChange('middleName', e.target.value);
                     }}
                     className={errorMessage.middleName ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.middleName && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.middleName}
                     </Typography>
                  )}
               </Grid>
               <Grid xs={12} sm={3} item>
                  <CustomInputLabel>Last Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.lastName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, lastName: '' });
                        handleFieldChange('lastName', e.target.value);
                     }}
                     className={errorMessage.lastName ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.lastName && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.lastName}
                     </Typography>
                  )}
               </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>DOB</CustomInputLabel>
                  {BasicDatePicker()}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Wedding Annivresary</CustomInputLabel>
                  {WeddingDatePicker()}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Preffered Language</CustomInputLabel>
                  {prefferedLanguageDropdown()}
               </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Nakshatram</CustomInputLabel>
                  {nakshatramDropdown()}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Gothram</CustomInputLabel>
                  {gothramDropdown()}
               </Grid>
               <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ display: 'flex', alignItems: 'center', marginTop: '25px' }}
               >
                  <CustomCheckbox />
                  <CustomInputLabel>Chandramana</CustomInputLabel>
                  <CustomCheckbox />
                  <CustomInputLabel>Souramana</CustomInputLabel>
               </Grid>
            </Grid>

            <Divider
               sx={{
                  width: '100%',
                  background: '#C1C1C1',
                  height: '1px',
                  marginTop: '20px',
                  marginBottom: '20px',
               }}
            />

            <Typography component="div" className={styles.typoGraphy}>
               Contact Info
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Address</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.address}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, address: '' });
                        handleFieldChange('address', e.target.value);
                     }}
                     className={errorMessage.address ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.address ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.address}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>City</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.city}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, city: '' });
                        handleFieldChange('city', e.target.value);
                     }}
                     className={errorMessage.city ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.city ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.city}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>State</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.state}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, state: '' });
                        handleFieldChange('state', e.target.value);
                     }}
                     className={errorMessage.state ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.state ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.state}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Zipcode</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.zipcode}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, zipcode: '' });
                        handleFieldChange('zipcode', e.target.value);
                     }}
                     className={errorMessage.zipcode ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.zipcode ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.zipcode}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Country</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.country}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, country: '' });
                        handleFieldChange('country', e.target.value);
                     }}
                     className={errorMessage.country ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.country ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.country}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Contact No</CustomInputLabel>
                  <ContactNumberInput sx={{width:"251px",}}
                     mask="+1 (999) 999-9999"
                     maskChar="_"
                     // id="usPhoneNumber"
                     // name="usPhoneNumber"
                     // placeholder="+1 ___ ___ ____"
                     type="tel"
                     required
                     value={formData.phoneNumber}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, phoneNumber: '' });
                        handleFieldChange('phoneNumber', e.target.value);
                     }}
                     className={
                        errorMessage.phoneNumber ? styles.errorConatctFeild : styles.contactField
                     }
                  />
                  {errorMessage.phoneNumber ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.phoneNumber}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Email</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.email}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, email: '' });
                        handleFieldChange('email', e.target.value);
                     }}
                     className={errorMessage.email ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.email ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.email}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
            </Grid>

            <Divider
               sx={{
                  width: '100%',
                  background: '#C1C1C1',
                  height: '1px',
                  marginTop: '20px',
                  marginBottom: '20px',
               }}
            />

            <Typography component="div" className={styles.typoGraphy}>
               Login Info
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>User Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.userName}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, userName: '' });
                        handleFieldChange('userName', e.target.value);
                     }}
                     className={errorMessage.userName ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.userName ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.userName}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Password</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     type="password"
                     value={formData.password}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, password: '' });
                        handleFieldChange('password', e.target.value);
                     }}
                     className={errorMessage.password ? styles.errorTextFeild : styles.textField}
                  />
                  {errorMessage.password ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.password}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Re-enter Password</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     type="password"
                     value={formData.reenterpassword}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, reenterpassword: '' });
                        handleFieldChange('reenterpassword', e.target.value);
                     }}
                     className={
                        errorMessage.reenterpassword ? styles.errorTextFeild : styles.textField
                     }
                  />
                  {errorMessage.reenterpassword ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.reenterpassword}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
            </Grid>
            <Typography sx={{ fontSize: '10px', marginTop: '5px' }}>
               Choose a question only you know the answer to and that has nothing to do with your
               password. If you forget your password, we'll verify your identity by asking you this
               question.
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Secret Question</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.secretQuestion}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, secretQuestion: '' });
                        handleFieldChange('secretQuestion', e.target.value);
                     }}
                     className={
                        errorMessage.secretQuestion ? styles.errorTextFeild : styles.textField
                     }
                  />
                  {errorMessage.secretQuestion ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.secretQuestion}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Answer to Secret Question</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.answerTosecretQuestion}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, answerTosecretQuestion: '' });
                        handleFieldChange('answerTosecretQuestion', e.target.value);
                     }}
                     className={
                        errorMessage.answerTosecretQuestion
                           ? styles.errorTextFeild
                           : styles.textField
                     }
                  />
                  {errorMessage.answerTosecretQuestion ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.answerTosecretQuestion}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Confirm Answer to Secret Question</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.confirmAnswerTosecretQuestion}
                     onChange={(e) => {
                        setErrorMessage({ ...errorMessage, confirmAnswerTosecretQuestion: '' });
                        handleFieldChange('confirmAnswerTosecretQuestion', e.target.value);
                     }}
                     className={
                        errorMessage.confirmAnswerTosecretQuestion
                           ? styles.errorTextFeild
                           : styles.textField
                     }
                  />
                  {errorMessage.confirmAnswerTosecretQuestion ? (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.confirmAnswerTosecretQuestion}
                     </Typography>
                  ) : (
                     ''
                  )}
               </Grid>
            </Grid>
         </div>
         <div className={styles.familyDetails}>
            <Typography
               sx={{ marginTop: '20px', marginBottom: '20px' }}
               component="div"
               className={styles.typoGraphy}
            >
               Special Events
            </Typography>
            {specialEventsData.length === 0 ? (
               !showSpecialEventsForm ? (
                  <EmptyPage
                     imgUrl={familyIcon}
                     subComponent={emptyPageButton()}
                     typographyText={''}
                  />
               ) : null
            ) : (
               <GridTableComponent tableData={specialEventsData} tableRef={tableRef} />
            )}
         </div>
         {showAddMoreFields ? specialEvents() : ''}
         <CommonButton sx={{ marginTop: '10px' }} onClick={handleAddMore}>
            Add More
         </CommonButton>
         <div style={{ marginTop: '10px', float: 'right' }}>{handleButtons()}</div>
      </div>
   );
}
