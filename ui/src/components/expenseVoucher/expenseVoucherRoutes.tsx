import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImportBudgets from './importBudgets/importBudgets';
import UpdateExpenseVoucher from './updateBudget/updateBudget';
import ExpenseRequest from './expenseRequest/expenseRequest';
import AttachExpenseReceipt from './attachExpenseReceipts/attachExpenseReceipt';
import AttachExpenseReceiptsAll from './attachExpenseReceipts(All)/attachExpenseReceipts(All)';
import ViewRequest from './viewRequest/viewRequest';
import ViewRequestsAll from './viewRequestsAll/viewRequestsAll';
import Authorize from './authorize/authorize';
import AddSubAccount from './addSubAccount/addSubAccount';
import CustomReport from './customReport/customReport';
import ApprovedExpenses from './approvedExpenses/approvedExpenses';
import EditExpenseAttachments from './editExpenseAttachments/editExpenseAttachments';
import PrintVoucher from './printVoucher/printVoucher';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

const ExpenseVoucherType: React.FunctionComponent = () => {
   const { expenseVoucherType } = useParams();

   let componentToRender: JSX.Element;

   const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])

   switch (expenseVoucherType) {
      case 'Import Budgets':
         componentToRender = <ImportBudgets />;
         break;
      case 'Update Budget':
         componentToRender = <UpdateExpenseVoucher />;
         break;
      case 'Expense Request':
         componentToRender = <ExpenseRequest />;
         break;
      case 'Attach Expense Receipts':
         componentToRender = <AttachExpenseReceipt />;
         break;
      case 'Attach Expense Receipts(All)':
         componentToRender = <AttachExpenseReceiptsAll />;
         break;
      case 'View Requests':
         componentToRender = <ViewRequest />;
         break;
      case 'View All Requests':
         componentToRender = <ViewRequestsAll />;
         break;
      case 'Authorize':
         componentToRender = <Authorize />;
         break;
      case 'Add Sub account':
         componentToRender = <AddSubAccount />;
         break;
      case 'Expense Report':
         componentToRender = <ExpenseRequest />;
         break;
      case 'Custom Report':
         componentToRender = <CustomReport />;
         break;
      case 'Approved Expenses':
         componentToRender = <ApprovedExpenses />;
         break;
      case 'Edit Expense Attachments':
         componentToRender = <EditExpenseAttachments />;
         break;
      case 'Print Voucher':
         componentToRender = <PrintVoucher />;
         break;
      default:
         componentToRender = <div>Page not found</div>;
   }

   return <>{componentToRender}</>;
};

export default ExpenseVoucherType;
