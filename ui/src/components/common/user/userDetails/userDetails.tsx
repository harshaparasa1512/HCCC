import Typography from '@mui/material/Typography';
import styles from './userDetails.module.scss';
import commonStyles from 'App.module.scss';
import { Grid } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import Divider from '@mui/material/Divider';
import EmptyPage from 'components/common/emptyPages/emptyPage';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import familyIcon from '../../../../assets/familymember.svg';
import FamilyDetails from '../familyDetails/familyDetails';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { object, string, ValidationError } from 'yup';
import dayjs from 'dayjs';
import { apiRequest, checkAuthToken, getaccessToken } from 'infrastructure/backendService';
import {
   CustomCalendarTodayOutlinedIcon,
   CustomTextFeild,
   CustomInputLabel,
   CustomDatePicker,
   CustomCheckbox,
   StyledDateContainer,
   CustomSelect,
   CustomEditIcon,
   CustomDeleteIcon,
   CommonButton,
} from 'components/common/StyledComponents/StyledFields';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';

type ErrorMessageTypes = {
   firstName: string;
   middleName: string;
   lastName: string;
   dateOfBirth: string;
   weddinganniversary: string;
   preferedlanguage: string;
   nakshatram: string;
   gothram: string;
   chandramana: string;
   souramana: string;
   address: string;
   city: string;
   state: string;
   zipcode: string;
   country: string;
   email: string;
   phoneNumber: string;
};


interface DeleteDialogProps {
   isOpen: boolean;
   onClose: () => void;
   onDelete: () => void;
}

export default function UserDetails() {
   const [showFamilyForm, setShowFamilyForm] = useState<boolean>(false);
   const [showFamilyButton, setShowFamilyButton] = useState<boolean>(true);
   const [showSpecialEventsForm, setShowSpecialEventsForm] = useState<boolean>(false);
   const [showAddMoreFields, setShowAddMoreFields] = useState<boolean>(false);
   const [showAddMoreButton, setShowAddMoreButton] = useState<boolean>(true);
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
      chandramana: '',
      souramana: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      email: '',
      phoneNumber: '',
   });

   const validationSchema = object().shape({
      firstName: string().required('First Name is required'),
      lastName: string().required('Last Name is required'),
      dateOfBirth: string().required('DOB is required'),
      weddinganniversary: string().required('wedding anniversary is required'),
      preferedlanguage: string().required('Prefered Language is required'),
      email: string().email('Invalid email address').required('Email is required'),
      address: string().required('Address is required'),
      country: string().required('Country is required'),
      city: string().required('city is required'),
      state: string().required('state is required'),
      zipcode: string().required('zipcode is required'),
      gothram: string().required('gothram is required'),
      nakshatram: string().required('nakshatram is required'),
      phoneNumber: string().required('Phone Number is required'),
      chandramana: string().required('chandramana is required'),
      souramana: string().required('souramana is required'),
   });

   const [formData, setFormData] = useState({
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      weddinganniversary: '',
      preferedlanguage: '',
      nakshatram: '',
      gothram: '',
      chandramana: '',
      souramana: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      email: '',
      phoneNumber: '',
   });

   const { userName } = useParams();

   const [userData, setUserData] = useState({
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      weddinganniversary: '',
      preferedlanguage: '',
      nakshatram: '',
      gothram: '',
      chandramana: '',
      souramana: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      email: '',
      phoneNumber: '',
   });

   const navigate = useNavigate();

   // useEffect(()=>{
   //    if(!checkAuthToken()) {
   //       navigate('/')
   //    }
   // },[getaccessToken()])

   useEffect(() => {
      apiRequest({
         method: 'GET',
         endpoint: `/devotee-management/devotee/${userName}`,
         includeToken: true,
      })
         .then((res) => {
            console.log(res);
            const userFromApi = res.data;
            setUserData({
               firstName: userFromApi.firstname,
               middleName: userFromApi.firstname,
               lastName: userFromApi.firstname,
               dateOfBirth: userFromApi.firstname,
               weddinganniversary: userFromApi.firstname,
               preferedlanguage: userFromApi.firstname,
               nakshatram: userFromApi.firstname,
               gothram: userFromApi.firstname,
               chandramana: userFromApi.firstname,
               souramana: userFromApi.firstname,
               address: userFromApi.firstname,
               city: userFromApi.firstname,
               state: userFromApi.firstname,
               zipcode: userFromApi.firstname,
               country: userFromApi.firstname,
               email: userFromApi.firstname,
               phoneNumber: userFromApi.firstname,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   }, [userName]);

   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const openDialog = () => {
      setIsDialogOpen(true);
   };

   const closeDialog = () => {
      setIsDialogOpen(false);
   };

   const deleteItem = () => {
      // Replace this with your actual delete logic
      alert('Item deleted!');
      // deleteApiCall()
      closeDialog();
   };



   const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, onClose, onDelete }) => {
      return (
         <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', zIndex: 1000 }}>
            <p>Are you sure you want to delete?</p>
            <div style={{display: "flex", gap: "1rem"}}>
            <CommonButton onClick={onDelete}>Yes</CommonButton>
            <CommonButton onClick={onClose}>No</CommonButton>
            </div>
         </div>
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
         chandramana: '',
         souramana: '',
         address: '',
         city: '',
         state: '',
         zipcode: '',
         country: '',
         email: '',
         phoneNumber: '',
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
         // email: formData.email,
         // dateOfRegistration : "",
         // relation:'',
         // updateDate : "",
      };
      apiRequest({
         method: 'PUT',
         endpoint: `/devotee-management/devotee/${userName}`,
         body: JSON.stringify(reqBody),
         includeToken: true,
      })
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const BasicDatePicker = (): React.ReactElement => {
      return (
         <div style={{ minWidth: '100%', marginTop: '12px' }}>
            <StyledDateContainer sx={{ backgroundColor: "#FFF9E4", borderRadius: "8px", height: "48px" }}>
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
                        format="D MMM YYYY"
                        value={
                           formData.dateOfBirth ? dayjs(formData.dateOfBirth, 'MM-DD-YYYY') : ''
                        }
                        onChange={(value) => {
                           setErrorMessage({ ...errorMessage, dateOfBirth: '' });
                           handleFieldChange('dateOfBirth', value);
                        }}
                        className={errorMessage.dateOfBirth ? styles.errorTextFeild : ''}
                        defaultValue={userData.dateOfBirth}
                     />
                  </DemoContainer>
               </LocalizationProvider>
               {!isEmpty(errorMessage.dateOfBirth) && (
                  <Typography sx={{ color: 'red', fontSize: '12px' }}>
                     {errorMessage.dateOfBirth}
                  </Typography>
               )}
            </StyledDateContainer>
         </div>
      );
   };

   const WeddingDatePicker = (): React.ReactElement => {
      return (
         <div style={{ minWidth: '100%', marginTop: '12px' }}>
            <StyledDateContainer sx={{ backgroundColor: "#FFF9E4", borderRadius: "8px", height: "48px" }}>
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
                        className={errorMessage.weddinganniversary ? styles.errorTextFeild : ''}
                        defaultValue={userData.weddinganniversary}
                     />
                  </DemoContainer>
               </LocalizationProvider>
               {!isEmpty(errorMessage.weddinganniversary) ? (
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

   const specialEventsData = [
      {
         Event: 'Vinay',
         Date: '06/11/2023',
         Email: 'abcd@gmail.com',
         Relation: 'Father',
         Action: (
            <div className={styles.icons}>
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} onClick={openDialog} />
            </div>
         ),
      },
      {
         Event: 'Hari',
         Date: '06/11/2023',
         Email: 'mnop@gmail.com',
         Relation: 'Father',
         Action: (
            <div className={styles.icons}>
               <EditIcon className={styles.editAnddeleteIcon} />
               <DeleteIcon className={styles.editAnddeleteIcon} onClick={openDialog} />
            </div>
         ),
      },
   ];

   const handleEdit = () => {
      setShowFamilyForm(true);
   }

   const handleDelete = () => {
      alert("deleted")
   }

   const familyData = [
      {
         Name: 'Vinay',
         DOB: 'date',
         Relation: 'Father',
         Nakshatram: 'Rohini',
         Gothram: 'Kasyapa',
         Action: (
            <div className={styles.icons}>
               <EditIcon className={styles.editAnddeleteIcon} onClick={handleEdit} />
               <DeleteIcon className={styles.editAnddeleteIcon} onClick={openDialog} />
            </div>
         ),
      },
      {
         Name: 'Hari',
         DOB: 'date',
         Relation: 'Father',
         Nakshatram: 'Rohini',
         Gothram: 'Kasyapa',
         Action: (
            <div className={styles.icons}>
               <EditIcon className={styles.editAnddeleteIcon} onClick={handleEdit} />
               <DeleteIcon className={styles.editAnddeleteIcon} onClick={openDialog} />
            </div>
         ),
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
         chandramana: '',
         souramana: '',
         address: '',
         city: '',
         state: '',
         zipcode: '',
         country: '',
         email: '',
         phoneNumber: '',
      });
   };

   const handleFieldChange = (field: string, value: any) => {
      if (field === 'dateOfBirth') {
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
         label: 'Paidipal',
      },
      {
         label: 'Bhrigu',
      },
      {
         label: 'Chandratre',
      },
      {
         label: 'Harinama',
      },
      {
         label: 'Audala',
      },
      {
         label: 'Agastya',
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

   const nakshatramDropdown = (): React.ReactElement => {
      return (
         <FormControl className={styles.dropDowns}>
            <CustomSelect
               IconComponent={KeyboardArrowDownIcon}
               id="grouped-select"
               value={formData.nakshatram}
               onChange={(e) => handleFieldChange('nakshatram', e.target.value)}
               className={errorMessage.nakshatram ? styles.errorTextFeild : ''}
               defaultValue={userData.nakshatram}
            >
               {NakshatraList.map((item, index: number) => (
                  <MenuItem key={index} value={item.label}>
                     {item.label}
                  </MenuItem>
               ))}
            </CustomSelect>
            {!isEmpty(errorMessage.nakshatram) && (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorMessage.nakshatram}
               </Typography>
            )}
         </FormControl>
      );
   };

   const gothramDropdown = (): React.ReactElement => {
      return (
         <FormControl className={styles.dropDowns}>
            <CustomSelect
               IconComponent={KeyboardArrowDownIcon}
               defaultValue=""
               id="grouped-select"
               value={formData.gothram}
               onChange={(e) => handleFieldChange('gothram', e.target.value)}
               className={errorMessage.gothram ? styles.errorTextFeild : ''}
            >
               {gothramList.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                     {item.label}
                  </MenuItem>
               ))}
            </CustomSelect>
            {!isEmpty(errorMessage.gothram) && (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorMessage.gothram}
               </Typography>
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
            {!isEmpty(errorMessage.preferedlanguage) && (
               <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  {errorMessage.preferedlanguage}
               </Typography>
            )}
         </FormControl>
      );
   };

   const handleShowForm = () => {
      setShowFamilyForm(true);
      setShowFamilyButton(false);
      console.log('but...............');
   };

   const emptyPageButton = (): React.ReactElement => {
      return (
         <div>
            <button className={styles.addfamilyButton} onClick={handleShowForm}>
               Add Family
            </button>
         </div>
      );
   };

   const handleAddMore = () => {
      setShowAddMoreFields(true);
      setShowAddMoreButton(false);
   };

   const handleAddDetails = () => {
      console.log("added.........")
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

   const specialEvents = () => {
      return (
         <>
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
                     defaultValue={userData.middleName}
                  />
               </Grid>
               <CommonButton sx={{ marginTop: '43px', marginLeft: '20px' }} onClick={handleAddDetails}>
                  Add
               </CommonButton>
            </Grid>

         </>
      );
   };

   return (
      <div className={styles.BoxContainer}>
         <DeleteDialog isOpen={isDialogOpen} onClose={closeDialog} onDelete={deleteItem} />
         <div style={{ display: 'flex' }}>
            <Typography component="div" className={styles.typoGraphyHeading}>
               Edit Profile
            </Typography>
            <CommonButton
               style={{ marginLeft: 'auto' }}
               className={commonStyles.saveButton}
               onClick={handleSave}
            >
               Update Profile
            </CommonButton>
         </div>
         <div className={styles.formContainer}>
            <Typography component="div" className={styles.typoGraphySubheading}>
               Basic Information
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid xs={12} sm={3} item>
                  <CustomInputLabel>First Name</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.firstName}
                     onChange={(e) => handleFieldChange('firstName', e.target.value)}
                     className={errorMessage.firstName ? styles.errorTextFeild : ''}
                     defaultValue={userData.firstName}
                  />
                  {!isEmpty(errorMessage.firstName) && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.firstName}
                     </Typography>
                  )}
               </Grid>
               <Grid xs={12} sm={3} item>
                  <CustomInputLabel>Middle Name</CustomInputLabel>
                  <CustomTextFeild
                     className={styles.textField}
                     fullWidth
                     required
                     value={formData.middleName}
                     onChange={(e) => handleFieldChange('middleName', e.target.value)}
                     defaultValue={userData.middleName}
                  />
                  {!isEmpty(errorMessage.middleName) && (
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
                     onChange={(e) => handleFieldChange('lastName', e.target.value)}
                     className={errorMessage.lastName ? styles.errorTextFeild : ''}
                     defaultValue={userData.lastName}
                  />
                  {!isEmpty(errorMessage.lastName) && (
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
                     onChange={(e) => handleFieldChange('address', e.target.value)}
                     className={errorMessage.address ? styles.errorTextFeild : ''}
                     defaultValue={userData.address}
                  />
                  {!isEmpty(errorMessage.address) && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.address}
                     </Typography>
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>City</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.city}
                     onChange={(e) => handleFieldChange('city', e.target.value)}
                     className={errorMessage.city ? styles.errorTextFeild : ''}
                     defaultValue={userData.city}
                  />
                  {!isEmpty(errorMessage.city) && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.city}
                     </Typography>
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>State</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.state}
                     onChange={(e) => handleFieldChange('state', e.target.value)}
                     className={errorMessage.state ? styles.errorTextFeild : ''}
                     defaultValue={userData.state}
                  />
                  {!isEmpty(errorMessage.state) && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.state}
                     </Typography>
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
                     onChange={(e) => handleFieldChange('zipcode', e.target.value)}
                     className={errorMessage.zipcode ? styles.errorTextFeild : ''}
                     defaultValue={userData.zipcode}
                  />
                  {!isEmpty(errorMessage.zipcode) && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.zipcode}
                     </Typography>
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Country</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.country}
                     onChange={(e) => handleFieldChange('country', e.target.value)}
                     className={errorMessage.country ? styles.errorTextFeild : ''}
                     defaultValue={userData.country}
                  />
                  {!isEmpty(errorMessage.country) && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.country}
                     </Typography>
                  )}
               </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Contact No</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.phoneNumber}
                     onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                     className={errorMessage.phoneNumber ? styles.errorTextFeild : ''}
                     defaultValue={userData.phoneNumber}
                  />
                  {!isEmpty(errorMessage.phoneNumber) && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.phoneNumber}
                     </Typography>
                  )}
               </Grid>
               <Grid item xs={12} sm={3}>
                  <CustomInputLabel>Email</CustomInputLabel>
                  <CustomTextFeild
                     fullWidth
                     required
                     value={formData.email}
                     onChange={(e) => handleFieldChange('email', e.target.value)}
                     className={errorMessage.email ? styles.errorTextFeild : ''}
                     defaultValue={userData.email}
                  />
                  {!isEmpty(errorMessage.email) && (
                     <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errorMessage.email}
                     </Typography>
                  )}
               </Grid>
            </Grid>
         </div>

         <Divider
            sx={{
               width: '100%',
               background: '#C1C1C1',
               height: '1px',
               marginTop: '20px',
               marginBottom: '20px',
            }}
         />

         <Typography
            sx={{ marginTop: '20px', marginBottom: '20px' }}
            component="div"
            className={styles.typoGraphy}
         >
            Special Events
         </Typography>
         <div className={styles.familyDetails}>
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
         {showAddMoreButton ?
            <CommonButton sx={{ marginTop: '10px' }} onClick={handleAddMore}>
               Add More
            </CommonButton> : ""}

         <Typography sx={{ marginTop: '20px', marginBottom: '20px' }} className={styles.typoGraphy}>
            Family Members
         </Typography>
         <div className={styles.familyDetails}>
            {familyData.length === 0 ? (
               !showFamilyForm ? (
                  <EmptyPage
                     imgUrl={familyIcon}
                     subComponent={emptyPageButton()}
                     typographyText={''}
                  />
               ) : null
            ) : (
               <GridTableComponent tableData={familyData} tableRef={tableRef} />
            )}
            {showFamilyForm ? <FamilyDetails /> : null}
         </div>
         {showFamilyButton ? <CommonButton className={styles.addfamilyButton} onClick={handleShowForm}>
            Add Family
         </CommonButton> : ''}
      </div>
   );
}