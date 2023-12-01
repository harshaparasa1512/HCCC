import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

const DevoteeManagement = () : JSX.Element => {

   const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])

   const users = [
    { id: 1, fullName: 'Register Devotee' },
    { id: 2, fullName: 'Consolidate Accounts' },
    { id: 3, fullName: 'Duplicate Devotee Records' },
    { id: 4, fullName: 'Restore Accounts' },
    { id: 5, fullName: 'Deleted Devotee List' },
    { id: 6, fullName: 'Quick Register' }
  ];



   return (
      <div>
        <Typography component="div" sx={{
            color: "#414141",
            fontFamily: "Lato",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "140%"
        }}>
            Devotee Management
         </Typography>
         {/* <ul>
            {users.map((user) => (
               <li key={user.id}>
                  <NavLink to={user.fullName}>{user.fullName}</NavLink>
               </li>
            ))}
         </ul> */}
         <Outlet />
      </div>
   );
};

export default DevoteeManagement;
