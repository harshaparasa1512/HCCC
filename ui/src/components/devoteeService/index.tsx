import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

const DevoteeService = () => {

    const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])

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
            Devotee Service
         </Typography>
            <Outlet/>
        </div>
    );
};

export default DevoteeService;