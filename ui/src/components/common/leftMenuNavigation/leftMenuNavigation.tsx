import React, { useEffect, useState } from 'react';
import styles from './leftMenuNavigation.module.scss';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';
const LeftMainNavigation = () => {
   const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
   const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);
   const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])

   const menuList = [
      {
         mainMenu: 'Devotee Service',
         subMenu: [
            {
               menuName: 'Search Devotee',
            },
            {
               menuName: 'Pooja Booking',
            },
            {
               menuName: 'Donation',
            },
            {
               menuName: 'Donor Advisory Funds',
            },
            {
               menuName: 'Matching Donations',
            },
            {
               menuName: 'Vastras',
            },
            {
               menuName: 'Hall Rental',
            },
            {
               menuName: 'Prasadam Purchase',
            },
            {
               menuName: 'Calendar Purchase',
            },
            {
               menuName: 'Refund',
            },
            {
               menuName: 'Categories',
            },
         ],
      },
      {
         mainMenu: 'Devotee Management',
         subMenu: [
            {
               menuName: 'Register Devotee',
            },
            {
               menuName: 'Consolidate Accounts',
            },
            {
               menuName: 'Duplicate Devotee',
            },
            {
               menuName: 'Restore Consolidate Accounts',
            },
            {
               menuName: 'Deleted Devotee List',
            },
            {
               menuName: 'Quick Register',
            },
         ],
      },
      {
         mainMenu: 'Devotee Tangibles',
         subMenu: [],
      },
      {
         mainMenu: 'Devotee Appointments (COVID)',
         subMenu: [],
      },
      {
         mainMenu: 'Data Entry',
         subMenu: [
            {
               menuName: 'Manage Policies',
            },
            {
               menuName: 'Add New Policy',
            },
            {
               menuName: 'Vendors',
            },
            {
               menuName: 'Inventory',
            },
            {
               menuName: 'Priest Specialization',
            },
            {
               menuName: 'Management Team Bio',
            },
            {
               menuName: 'Festivities',
            },
            {
               menuName: 'Deity Information',
            },
            {
               menuName: 'Edit Deity Information',
            },
            {
               menuName: 'Enter Minutes of Meeting',
            },
            {
               menuName: 'Panchangam',
            },
            {
               menuName: 'File Management',
            },
            {
               menuName: 'Singal_Button_Donation',
            },
            {
               menuName: 'Priest Categorize Volunteers',
            },
            {
               menuName: 'Volunteers',
            },
         ],
      },
      {
         mainMenu: 'Expense Voucher',
         subMenu: [
            {
               menuName: 'Import Budgets',
            },
            {
               menuName: 'Update Budget',
            },
            {
               menuName: 'Expense Request',
            },
            {
               menuName: 'Attach Expense Receipts',
            },
            {
               menuName: 'Attach Expense Receipts(All)',
            },
            {
               menuName: 'View Requests',
            },
            {
               menuName: 'Accounts',
            },
            {
               menuName: 'View All Requests',
            },
            {
               menuName: 'Authorize Expense Requests',
            },
            {
               menuName: 'Add Sub account',
            },
            {
               menuName: 'Expense Report',
            },
            {
               menuName: 'Custom Report',
            },
            {
               menuName: 'Approved Expenses',
            },
            {
               menuName: 'Edit Expense Attachments',
            },
            {
               menuName: 'Print Voucher',
            },
            {
               menuName: 'Print Voucher',
            },
         ],
      },
      {
        mainMenu: 'Financial Updates',
        subMenu: [],
     },
     {
        mainMenu: 'Reports Section',
        subMenu: [],
     },
     {
        mainMenu: 'Meeting Minutes',
        subMenu: [],
     },
     {
        mainMenu: 'Event Calendar',
        subMenu: [],
     },
     {
        mainMenu: 'MPC Documents',
        subMenu: [],
     },
     {
        mainMenu: 'Access Control',
        subMenu: [],
     },
     {
        mainMenu: 'Menu Manager',
        subMenu: [],
     },
     {
        mainMenu: 'Steering Commitee',
        subMenu: [],
     },
     {
        mainMenu: 'System Settings',
        subMenu: [],
     },
     {
        mainMenu: 'Logs',
        subMenu: [],
     },
   ];

   const handleMenuClick = (mainMenu: string) => {
      setSelectedMenu(selectedMenu === mainMenu ? null : mainMenu);
      if (menuList.some((menu) => menu.mainMenu === mainMenu && menu.subMenu.length === 0)) {
         if (mainMenu === 'Devotee Tangibles') {
            navigate(`/tangible`);
         }
         if (mainMenu === '') {
            navigate(`/tangible`);
         }
      }
   };

   const handleSubMenuClick = (subMenu: string) => {
      setSelectedSubMenu(subMenu);
      console.log(subMenu, 'submenu');
      onNavigate(subMenu);
   };

   const onNavigate = (path: string) => {
      let prefixedPath = path;
      // Check for specific main menus
      if (selectedMenu === 'Data Entry') {
         prefixedPath = `dataentry/${path}`;
      } else if (selectedMenu === 'Devotee Service') {
         // Add additional conditions for other main menus
         prefixedPath = `devoteeservice/${path}`;
      } else if (selectedMenu === 'Devotee Management') {
         // Add additional conditions for other main menus
         prefixedPath = `devoteeManagement/${path}`;
      } else if (selectedMenu === 'Expense Voucher') {
         // Add additional conditions for other main menus
         prefixedPath = `expenseVoucher/${path}`;
      } else if (selectedMenu === 'Financial Updates') {
         // Add additional conditions for other main menus
         prefixedPath = `FinancialUpdates/${path}`;
      } else if (selectedMenu === 'Reports Section') {
         // Add additional conditions for other main menus
         prefixedPath = `ReportsSection/${path}`;
      } else if (selectedMenu === 'Meeting Minutes') {
        // Add additional conditions for other main menus
        prefixedPath = `MeetingMinutes/${path}`;
     } else if (selectedMenu === 'Event Calendar') {
         // Add additional conditions for other main menus
         prefixedPath = `EventCalendar/${path}`;
      } else if (selectedMenu === 'MPC Documents') {
        // Add additional conditions for other main menus
        prefixedPath = `MPCDocuments/${path}`;
     }  else if (selectedMenu === 'Access Control') {
        // Add additional conditions for other main menus
        prefixedPath = `AccessControl/${path}`;
     } else if (selectedMenu === 'Menu Manager') {
        // Add additional conditions for other main menus
        prefixedPath = `MenuManager/${path}`;
     } else if (selectedMenu === 'Steering Commitee') {
        // Add additional conditions for other main menus
        prefixedPath = `SteeringCommitee/${path}`;
     }else if (selectedMenu === 'System Settings') {
        // Add additional conditions for other main menus
        prefixedPath = `SystemSettings/${path}`;
     }else if (selectedMenu === 'Logs') {
        // Add additional conditions for other main menus
        prefixedPath = `Logs/${path}`;
     }

      navigate(`/${prefixedPath}`);
   };

   return (
      <div>
         {menuList.map((menu) => (
            <div key={menu.mainMenu} className={styles.mainMenuContainer}>
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div
                     className={`${styles.mainMenu} ${
                        selectedMenu === menu.mainMenu ? `${styles.active}` : ''
                     }`}
                     onClick={() => handleMenuClick(menu.mainMenu)}
                  >
                     {menu.mainMenu}
                  </div>
                  <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
                     {menu.subMenu.length !== 0 ? (
                        <>
                           {selectedMenu === menu.mainMenu ? (
                              <KeyboardArrowUpIcon
                                 sx={{
                                    fontSize: '14px',
                                    marginLeft: 'auto',
                                    // width: '12px',
                                    //  height:"7.41px",
                                    fontWeight: '700',
                                 }}
                              />
                           ) : (
                              <KeyboardArrowDownIcon
                                 sx={{
                                    fontSize: '14px',
                                    marginLeft: 'auto',
                                    // width: '12px',
                                    //  height:"7.41px",
                                    fontWeight: 'bold',
                                 }}
                              />
                           )}{' '}
                        </>
                     ) : (
                        ''
                     )}
                  </div>
               </div>
               {selectedMenu === menu.mainMenu && (
                  <div className={styles.subMenuContainer} id={menu.mainMenu}>
                     {menu.subMenu.map((subMenuItem) => (
                        <div
                           key={subMenuItem.menuName}
                           className={`${styles.subMenu } ${
                              selectedSubMenu === subMenuItem.menuName ? `${styles.active}` : ''
                           }`}
                           onClick={() => handleSubMenuClick(subMenuItem.menuName)}
                        >
                           {subMenuItem.menuName}
                        </div>
                     ))}
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};

export default LeftMainNavigation;
