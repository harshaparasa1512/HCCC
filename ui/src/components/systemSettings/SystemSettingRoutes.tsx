import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PriestSeniority from './priestSeniority/priestSeniority';
import PoojaDetails from './poojaDetails/poojaDetails';
import ManagementTeamCategory from './managementTeamCategory/managementTeamCategory';
import DonationType from './donationTypes/donationType';
import DonationPurpose from './donationPurpose/donationPurpose';
import Sponsorship from './sponsorships/sponsorship';
import EventHalls from './eventsHalls/eventHalls';
import VastraPurpose from './vastraPurpose/VastraPurpose';
import AddVastraType from './vastraType/AddVastraType';
import DailyActivities from './dailyActivities/DailyActivities';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

const SystemSettingsRoute: React.FunctionComponent = () => {
   const { systemSettingsType } = useParams();

   let componentToRender: JSX.Element;

   const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])

   switch (systemSettingsType) {
      case 'Priest Seniority':
         componentToRender = <PriestSeniority />;
         break;
      case 'Pooja Details':
         componentToRender = <PoojaDetails />;
         break;
      case 'Management Team Categories':
         componentToRender = <ManagementTeamCategory />;
         break;
      case 'Donation Type':
         componentToRender = <DonationType />;
         break;
      case 'Donation Purpose':
         componentToRender = <DonationPurpose />;
         break;
      case 'Sponsorship':
         componentToRender = <Sponsorship />;
         break;
      case 'Event Hall':
         componentToRender = <EventHalls />;
         break;
      case 'Vastra Purpose':
         componentToRender = <VastraPurpose />;
         break;
      case 'Vastra Types':
         componentToRender = <AddVastraType />;
         break;
      case 'Daily Activities':
         componentToRender = <DailyActivities />;
         break;
      default:
         componentToRender = <div>Page not found</div>;
   }

   return <>{componentToRender}</>;
};

export default SystemSettingsRoute;
