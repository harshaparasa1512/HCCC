import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

const SystemSettings = () : JSX.Element => {
   const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])
   
   const users = [
    { id: 1, fullName: 'Priest Seniority' },
    { id: 2, fullName: 'Pooja Details' },
    { id: 3, fullName: 'Management Team Categories' },
    { id: 4, fullName: 'Donation Type' },
    { id: 5, fullName: 'Donation Purpose' },
    { id: 6, fullName: 'Sponsorship' },
    { id: 7, fullName: 'Event Hall'},
    { id: 8, fullName: 'Vastra Purpose' },
    { id: 9, fullName: 'Vastra Types' },
    { id: 10, fullName: 'Daily Activities' },
  
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
            System Settings
         </Typography>
         <ul>
            {users.map((user) => (
               <li key={user.id}>
                  <NavLink to={user.fullName}>{user.fullName}</NavLink>
               </li>
            ))}
         </ul>
         <Outlet />
      </div>
   );
};

export default SystemSettings;
