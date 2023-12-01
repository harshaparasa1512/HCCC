import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

const ExpenseVoucher = () : JSX.Element => {

   const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])

   const users = [
    { id: 1, fullName: 'Import Budgets' },
    { id: 2, fullName: 'Update Budget' },
    { id: 3, fullName: 'Expense Request' },
    { id: 4, fullName: 'Attach Expense Receipts' },
    { id: 5, fullName: 'Attach Expense Receipts(All)' },
    { id: 6, fullName: 'View Requests' },
    { id: 7, fullName: 'View All Requests'},
    { id: 8, fullName: 'Authorize'},
    { id: 9, fullName: 'Add Sub account'},
    { id: 10, fullName: 'Expense Report'},
    { id: 11, fullName: 'Custom Report'},
    { id: 12, fullName: 'Approved Expenses'},
    { id: 13, fullName: 'Edit Expense Attachments'},
    { id: 14, fullName: 'Print Voucher'},
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
            Expense Voucher
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

export default ExpenseVoucher;
