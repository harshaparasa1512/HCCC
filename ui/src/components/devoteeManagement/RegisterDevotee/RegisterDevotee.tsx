import Register from 'components/common/user/userDetails/register/register'
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterDevotee = ():JSX.Element => {

  const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])
  return (
    <div>
      <Register />
    </div>
  )
}

export default RegisterDevotee
