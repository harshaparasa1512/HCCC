import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

const DataEntry = () : JSX.Element => {

   const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])

   const users = [
    { id: 1, fullName: 'Manage Policies' },
    { id: 2, fullName: 'Vendors' },
    { id: 3, fullName: 'Inventory' },
    { id: 4, fullName: 'Priest Specialization' },
    { id: 5, fullName: 'Management Team Bio' },
    { id: 6, fullName: 'Festivities' },
    { id: 7, fullName: 'Deity Information'},
    { id: 8, fullName: 'Enter Minutes of Meeting'},
    { id: 9, fullName: 'File Management'},
    { id: 10, fullName: 'Priest Categorisation'},
    { id: 11, fullName: 'Volunteers'},
    { id: 12, fullName: 'Panchangam'},
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
            Data Entry
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

export default DataEntry;
