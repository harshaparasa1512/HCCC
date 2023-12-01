import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PoojaBooking from './poojaBooking/poojaBooking';
import ServiceDonation from './Donation/donation';
import DonorAdvisoryFunds from './DonorAdvisoryFunds/donorAdvisoryFunds';
import MatchingDonations from './MatchingDonations/matchingDonations';
import HallRental from './HallRental/hallRental';
import Vastaras from './Vastras/vastaras';
import PrasadamPurchase from './PrasadamPurchase/prasadamPurchase';
import Calendar from './Calendar/calendar';
import ModifyProfile from './ModifyProfile/modifyProfile';
import Refund from './Refund/refund';
import Categories from './categories/categories';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';
import SearchDevotee from './searchDevotee/searchDevotee';

const DevoteeServiceRoutes = () => {

    const { devoteeServiceType } = useParams();

    const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])


    let componentToRender: JSX.Element;
 
    switch (devoteeServiceType) {
      case 'Search Devotee':
         componentToRender = <SearchDevotee/>;
       case 'Pooja Booking':
          componentToRender = <PoojaBooking/>;
          break;
       case 'Donation':
          componentToRender = <ServiceDonation/>;
          break;
       case 'Donor Advisory Funds':
          componentToRender = <DonorAdvisoryFunds/>;
          break;
       case 'Matching Donations':
          componentToRender = <MatchingDonations/>;
          break;
       case 'Vastras':
          componentToRender = <Vastaras/>;
          break;
       case 'Hall Rental':
          componentToRender = <HallRental/> ;
          break; 
        case 'Prasadam Purchase':
          componentToRender = <PrasadamPurchase/> ;
          break;
          case 'Calendar':
          componentToRender = <Calendar/> ;
          break; 
          case 'Modify Profile':
          componentToRender = <ModifyProfile/> ;
          break;
        case 'Refund':
          componentToRender = <Refund/> ;
          break;  
          case 'Categories':
          componentToRender = <Categories/> ;
          break;       
       default:
          componentToRender = <div>Page not found</div>;
    }
 
    return (
        <>
           {componentToRender} 
        </>
    );
};

export default DevoteeServiceRoutes;
