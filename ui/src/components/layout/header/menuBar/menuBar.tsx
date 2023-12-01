import React, { useEffect, useState } from 'react';
import styles from './menuBar.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router';
import { type AuthProps } from 'infrastructure/GlobalContextProvider';
import Login, { LoginRightBanner, loginScreen } from 'components/login/userLogin/login';
import ChangePassword from 'components/login/changePassword/changePassword';
import { Button, Dialog, DialogTitle } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { checkAuthToken } from 'infrastructure/backendService';

const MenuBar = (): React.ReactNode => {
   const navigation = useNavigate();
   const [activeTab, setActiveTab] = useState<string | null>(null);
   const subRoles = ['Priest', 'Chief Priest'];
   const [selectedRole, setSelectedRole] = useState('');
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
   const [open, setOpen] = React.useState(false);
   const [isHovered, setIsHovered] = useState<number | null>(null);
   const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
   const [menuVisible, setMenuVisible] = useState(false);
   const [showSubRoles, setShowSubRoles] = useState(false);
   const userName = sessionStorage.getItem('username');

   const style = {
      // borderBottom: "1px solid #CBCBCB",
      width: '100%',
      color: '#F05802',
      fontSize: '16px',
      padding: '8px 0 8px 0',
      transition: 'color 0.3s ease-in-out',
   };
   const hoveredStyle = {
      // borderBottom: "1px solid #CBCBCB",
      width: '100%',
      cursor: 'pointer',
      padding: '8px 0 8px 0',
      color: '#22A699',
      fontSize: '16px',
      transition: 'color 0.3s ease-in-out',
   };
   const handleHover = (index: number) => {
      setIsHovered(index);
   };

   const handleLeave = () => {
      setIsHovered(null);
   };
   const checkUserToken = (): void => {
      const userToken = sessionStorage.getItem('user-token');
      const userName = sessionStorage.getItem('user-name');

      if (userToken == null || userToken === 'undefined') {
         setIsLoggedIn(false);
      } else {
         setIsLoggedIn(true);
      }

      console.log(isLoggedIn);
   };
   useEffect(() => {
      checkUserToken();
   }, [isLoggedIn]);

   const handleClickHome = () => {
      navigation('/');
   };

   const handleClickCalender = () => {
      alert('calendar');
   };

   const handleClickDonation = () => {
      navigation('/donations');
   };

   const handleTempleHistory = () => {
      window.open('https://hccccars.org/', '_blank');
   };

   const handleSubTabMouseEnter = (subTab: string) => {
      setActiveSubTab(subTab);
   };

   const handleSubTabMouseLeave = () => {
      setActiveSubTab(null);
   };

   const menuData = [
      {
         page: 'Home',
         onclickFunction: handleClickHome,
      },
      {
         page: 'Information',
         icon: <ExpandMoreIcon />,
         subTabs: [
            { subTab: 'Pooja Items', supersubItems: ['Individual Samskaras', 'Weekly/Monthly Pooja', 'Paid Seva', 'Abhisekha Sponsorship'] },
            { subTab: 'Newsletter', supersubItems: ['List of Newletters'] },
            { subTab: "Awards" },
            { subTab: 'Event Facilities', supersubItems: ['All Photos and Videos'] },
            { subTab: 'Management Team', supersubItems: ['Team 1', 'Team 2'] },
            { subTab: 'Refund Policy' },

         ],
      },
      {
         page: 'Services',
         icon: <ExpandMoreIcon />,
         subTabs: [
            { subTab: 'Human Services' },
            { subTab: 'Youth and Education' },
            { subTab: "Young Ager's" },
            { subTab: 'Cultural', supersubItems: ['Cultural 1', 'Cultural 2'] },

         ],
      },
      {
         page: 'Calendar',
         onclickFunction: handleClickCalender,
      },
      {
         page: 'Donation',
         onclickFunction: handleClickDonation,
      },
      {
         page: 'Temple History',
         onclickFunction: handleTempleHistory,
      },
      {
         page: 'Contact Us',
         icon: <ExpandMoreIcon />,
         subTabs: [
            { subTab: 'Contact Info', supersubItems: ['Address', 'Map and Contact No', 'members List'] },
            { subTab: 'Send Feedback', supersubItems: ['Form to fill and write feedback'] },
         ],
      },
   ];

   const handleTabMouseEnter = (tabName: string) => {
      setActiveTab(tabName);
   };

   const handleTabMouseLeave = () => {
      setActiveTab(null);
   };

   const SearchBox = () => {
      return (
         <div className={styles.searchBox}>
            <TextField
               sx={{ backgroundColor: '#FFF9E4', width: 130, borderRadius: '4px', border: 'none' }}
               id="input-with-icon-textfield"
               placeholder="Search"
               size="small"
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#F05802' }} />
                     </InputAdornment>
                  ),
               }}
            />
         </div>
      );
   };


   const handleOpenUserMenu = () => {
      setMenuVisible(!menuVisible);
   };

   const handleClickChangeRole = (subRole: any) => {
      // Update the selectedRole with the selected subRole
      setSelectedRole(subRole);

      // Toggle the visibility of subRoles
      setShowSubRoles(!showSubRoles);
   };

   const handleLogout = () => {
      // setAnchorElUser(null);
      sessionStorage.clear();
      navigation('/');
   };

   const handleEditProfile = () => {
      // setAnchorElUser(null);
      navigation(`/user/${userName}`);
   };

   const handleChangePassword = () => {
      setOpen(true);
      setShowChangePassword(true);
   };

   const handleClose = (): void => {
      setOpen(false);
   };

   const handleDonationReport = () => {
      // setAnchorElUser(null);
   };


   const userInfoDetails = [
      {
         settings: 'Change Role',
         onclickFunction: handleClickChangeRole,
      },
      {
         settings: 'Edit Profile',
         onclickFunction: handleEditProfile,
      },
      {
         settings: 'Change Password',
         onclickFunction: handleChangePassword,
      },
      {
         settings: 'Donation Report',
         onclickFunction: handleDonationReport,
      },
      {
         settings: 'Logout',
         onclickFunction: handleLogout,
      },
   ]

   const handleSubTabClick = (subTab: string) => {

      // Redirect to different URLs based on the subtab
      switch (subTab) {
         case 'Pooja Items':
            window.open('https://www.livermoretemple.org/hints/content/asp/temple_services.asp?menuID=172', '_blank');
            break;
         case 'Newsletter':
            window.open('https://www.livermoretemple.org/hints/content/asp/PV.asp?menuID=17', '_blank');
            break;
         case 'Awards':
            window.open('https://www.livermoretemple.org/hints/default2.asp', '_blank');
            break;
         case 'Event Facilities':
            window.open('https://www.livermoretemple.org/hints/content/asp/temple_info.asp?menuID=6', '_blank');
            break;
         case 'Management Team':
            window.open('https://www.livermoretemple.org/hints/content/asp/temple_info.asp?menuID=6', '_blank');
            break;
         case 'Refund Policy':
            window.open('https://www.livermoretemple.org/hints/content/asp/temple_info.asp?menuID=6', '_blank')
            break;


         case 'Human Services':
            window.open(
               'https://www.livermoretemple.org/hints/humanservices/Main.html', '_blank');
            break;
         case 'Youth and Education':
            window.open('https://www.livermoretemple.org/hints/yande/', '_blank');
            break;
         case "Young Ager's":
            window.open('https://www.livermoretemple.org/hints/youngadults/index.html', '_blank');
            break;
         case 'Cultural':
            window.open(
               'https://www.livermoretemple.org/hints/content/asp/cultural_activities.asp?menuID=173', '_blank');
            break;

         case 'Contact Info':
            window.open("https://www.livermoretemple.org/hints/content/asp/contact_info.asp?menuID=99", "_blank")
            break;
         case 'Send Feedback':
            window.open("https://www.livermoretemple.org/hints/content/asp/feedback.asp?menuID=20", "_blank")
            break;

         default:
            break;
      }
   };


   const handleClick = () => {
      alert("clicked......")
   }

   const userDetailsInfo = () => {
      return (
         <div className={styles.mainUserDetails}>
            <div className={styles.typoGraphys}>
               <div>
                  <div style={{ color: 'white', fontSize: '13px' }}>
                     {userName !== null ? userName : 'User Name'}
                  </div>
                  <div style={{ color: 'white', fontSize: '10px' }}>{selectedRole}</div>
               </div>

               {/* IconButton */}
               <Tooltip title="User Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                     <Avatar
                        sx={{ height: '32px', width: '32px', backgroundColor: '#F2BE22' }}
                        alt=""
                        src="/static/images/avatar/2.jpg"
                     />
                     <ExpandMoreIcon sx={{ color: 'white' }} />
                  </IconButton>
               </Tooltip>
            </div>

            {/* Menu */}
            {menuVisible && (
               <div className={styles.cardDetails} style={{ fontSize: '16px', border: "1px solid #F05802" }}>
                  <ul
                     style={{
                        listStyleType: 'none',
                        padding: '8px',
                        margin: 0,
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                     }}
                  >
                     {userInfoDetails.map((setting, index) => (
                        <li
                           key={index}
                           style={index === isHovered ? hoveredStyle : style}
                           onMouseEnter={() => handleHover(index)}
                           onMouseLeave={handleLeave}
                           onClick={() => setting.onclickFunction(subRoles[0])}
                        >
                           {setting.settings}

                        </li>
                     ))}
                  </ul>
               </div>
            )}
            {showSubRoles && (
               <div style={{ width: "100px", fontSize: '16px', position: 'absolute', top: '40px',borderBottom: "1px solid #CBCBCB", right: '150px', padding: '8px', border: "1px solid #F05802", color: "#F05802", backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  {subRoles.map((subRole, roleIndex) => (
                     <div key={roleIndex} onClick={() => handleClickChangeRole(subRole)} style={{ cursor: 'pointer' }}>
                        {subRole}
                     </div>
                  ))}
               </div>
            )}
         </div>
      )
   }

   const menuItems = () => {
      return (
         <>
            {menuData.map((item) => (
               <div
                  key={item.page}
                  onMouseEnter={() => handleTabMouseEnter(item.page)}
                  onMouseLeave={handleTabMouseLeave}
                  className={activeTab === item.page ? styles.activeTab : styles.tab}
                  onClick={item?.onclickFunction}
               >
                  {item.page}
                  <p>{item?.icon}</p>
                  {activeTab === item.page && (
                     <div className={styles.subTabs}>
                        {item?.subTabs?.map((subTabItem, index) => (
                           <div
                              key={index}
                              className={styles.subTab}
                              onClick={() => handleSubTabClick(subTabItem.subTab)}
                              onMouseEnter={() => handleSubTabMouseEnter(subTabItem.subTab)}
                              onMouseLeave={handleSubTabMouseLeave}
                           >
                              {subTabItem.subTab}
                              {activeSubTab === subTabItem.subTab && subTabItem.supersubItems && (
                                 <div style={{ border: "0px solid blue", borderRadius: "4px" }} className={styles.subTabs1} onClick={handleClick}>
                                    {subTabItem.supersubItems.map((superSubItem, subIndex) => (
                                       <div
                                          key={subIndex}
                                          // style={{fontSize: "12px", fontWeight: "500", padding: "5px"}}
                                          className={styles.subTab1}
                                          onClick={() => handleSubTabClick(superSubItem)}
                                       >
                                          {/* {superSubItem} */}
                                       </div>
                                    ))}
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            ))}
         </>
      );
   };

   const chngepasswordDialogbox = () => {
      return (
         <div>
            <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
               fullWidth
               maxWidth="xl"
               PaperProps={{
                  style: {
                     height: 'calc(100% - 64px)',
                     width: 'calc(100% - 64px)',
                     margin: '32px',
                     maxWidth: '1148px',
                     maxHeight: "644px"
                  },
               }}
            >
               <DialogContent style={loginScreen.contentPadding}>
                  <Grid container style={loginScreen.userForm}>
                     <Grid item xs={6} component="form" noValidate sx={loginScreen.formPadding}>
                        {showChangePassword ? <ChangePassword /> : ''}
                     </Grid>
                     <LoginRightBanner />
                  </Grid>
               </DialogContent>
            </Dialog>
         </div>
      );
   };

   return (
      <>
         <div className={styles.mainMenu}>
            {SearchBox()}
            <div className={styles.navBar}>{menuItems()}</div>
            <Dialog open={open}>{chngepasswordDialogbox()}</Dialog>
            <div className={styles.userInfo}>{!checkAuthToken() ? <Login /> : userDetailsInfo()}</div>
         </div>

      </>
   );
};

export default MenuBar;
