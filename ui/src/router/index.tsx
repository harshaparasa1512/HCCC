import React, { useEffect, useState } from 'react';
import Layout from 'components/layout/layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from 'components/devotee/dashboard/dashboard';
import Home from 'components/home/home';
import UserDetails from 'components/common/user/userDetails/userDetails';
import Register from 'components/common/user/userDetails/register/register';
import DonationReport from 'components/devotee/donationReport/DonationReport';
import ChangePassword from 'components/login/changePassword/changePassword';
import MeetingMinutes from 'components/meetingMinutes/meetingMinutes';
import ExpenseVoucher from 'components/expenseVoucher';
import ExpenseVoucherType from 'components/expenseVoucher/expenseVoucherRoutes';
import DataEntry from 'components/dataEntry';
import DataEntryType from 'components/dataEntry/dataEntryRoutes';
import RegisterDevotee from 'components/devoteeManagement/RegisterDevotee/RegisterDevotee';
import DevoteeAppointments from 'components/devoteeAppointments/DevoteeAppointments';
import DevoteeTangibles from 'components/devoteeTangibles/DevoteeTangibles';
import Donation from 'components/devotee/donation/Donation';
import DevoteeManagement from 'components/devoteeManagement';
import DevoteeManagementRoute from 'components/devoteeManagement/devoteeMangementRoutes';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';
import SearchDevotee from 'components/devoteeService/searchDevotee/searchDevotee';
import PoojaBooking from 'components/devoteeService/poojaBooking/poojaBooking';
import ServiceDonation from 'components/devoteeService/Donation/donation';
import DonorAdvisoryFunds from 'components/devoteeService/DonorAdvisoryFunds/donorAdvisoryFunds';
import MatchingDonations from 'components/devoteeService/MatchingDonations/matchingDonations';
import Vastaras from 'components/devoteeService/Vastras/vastaras';
import HallRental from 'components/devoteeService/HallRental/hallRental';
import PrasadamPurchase from 'components/devoteeService/PrasadamPurchase/prasadamPurchase';
import Calendar from 'components/devoteeService/Calendar/calendar';
import ModifyProfile from 'components/devoteeService/ModifyProfile/modifyProfile';
import Refund from 'components/devoteeService/Refund/refund';
import SystemSettings from 'components/systemSettings';
import SystemSettingsRoute from 'components/systemSettings/SystemSettingRoutes';
import DevoteeService from 'components/devoteeService';
import DevoteeServiceRoutes from 'components/devoteeService/devoteeServiceRoutes';
import ConsolidatedAccounts from 'components/devoteeManagement/ConsolidatedAccounts/ConsolidatedAccounts';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';
import Login from 'components/login/userLogin/login';
import PrivateRoute from './privateRoutes';

const Router: React.FunctionComponent = () => {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   const checkUserToken = (): void => {
      if (!checkAuthToken()) {
         setIsLoggedIn(false);
      } else {
         setIsLoggedIn(true);
      }

      console.log('index---', isLoggedIn);
   };
   useEffect(() => {
      checkUserToken();
   }, [getaccessToken()]);

   return (
      <>
         <BrowserRouter>
            <Layout>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/devotee" element={<Dashboard />} />
                  <Route
                     path="/donations"
                     element={
                        <PrivateRoute roles={['devotee']}>
                           <Donation />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/user/:userName"
                     element={
                        <PrivateRoute roles={['devotee']}>
                           <UserDetails />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/register"
                     element={
                        <PrivateRoute roles={['devotee']}>
                           <Register />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/donationreport"
                     element={
                        <PrivateRoute roles={['devotee']}>
                           <DonationReport />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/changepassword"
                     element={
                        <PrivateRoute roles={['devotee']}>
                           <ChangePassword />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/meetingminutes"
                     element={
                        <PrivateRoute roles={['devotee']}>
                           <MeetingMinutes />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/expenseVoucher"
                     element={
                        <PrivateRoute roles={['manager']}>
                           <Route index element={<ExpenseVoucher />} />
                           <Route path=":expenseVoucherType" element={<ExpenseVoucherType />} />
                        </PrivateRoute>
                     }
                  />
                  {/* <Route path="/expenseVoucher" element={<ExpenseVoucher />}>
                     <Route path=":expenseVoucherType" element={<ExpenseVoucherType />} />
                  </Route> */}
                  <Route
                     path="/dataentry"
                     element={
                        <PrivateRoute roles={['manager']}>
                           <Route index element={<DataEntry />} />
                           <Route path=":dataEntryType" element={<DataEntryType />} />
                        </PrivateRoute>
                     }
                  />
                  {/* <Route path="/dataentry" element={<DataEntry />}>
                     <Route path=":dataEntryType" element={<DataEntryType />} />
                  </Route> */}
                  <Route
                     path="/devoteeManagement"
                     element={
                        <PrivateRoute roles={['manager']}>
                           <Route index element={<DevoteeManagement />} />
                           <Route
                              path=":devoteeManagementType"
                              element={<DevoteeManagementRoute />}
                           />
                        </PrivateRoute>
                     }
                  />
                  {/* <Route path="/devoteeManagement" element={<DevoteeManagement />}>
                     <Route path=":devoteeManagementType" element={<DevoteeManagementRoute />} />
                  </Route> */}
                  <Route
                     path="/systemSettings"
                     element={
                        <PrivateRoute roles={['manager']}>
                           <Route index element={<SystemSettings />} />
                           <Route path=":systemSettingsType" element={<SystemSettingsRoute />} />
                        </PrivateRoute>
                     }
                  />
                  {/* <Route path="/systemSettings" element={<SystemSettings />}>
                     <Route path=":systemSettingsType" element={<SystemSettingsRoute />} />
                  </Route> */}
                  <Route
                     path="/devoteeTangible"
                     element={
                        <PrivateRoute roles={['devotee']}>
                           <DevoteeTangibles />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/devoteeAppointment"
                     element={
                        <PrivateRoute roles={['devotee']}>
                           <DevoteeAppointments />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="/devoteeregister"
                     element={
                        <PrivateRoute roles={['devotee']}>
                           <RegisterDevotee />
                        </PrivateRoute>
                     }
                  />
                  <Route path="/devoteeService" element={<DevoteeService />}>
                     <Route path=":devoteeServiceType" element={<DevoteeServiceRoutes />} />
                  </Route>
                  <Route
                     path="/manager"
                     element={
                        <PrivateRoute roles={['manager']}>
                           <LeftMainNavigation />
                        </PrivateRoute>
                     }
                  />
                  <Route path="/login" element={<Login />} />
               </Routes>
            </Layout>
         </BrowserRouter>
      </>
   );
};

export default Router;
