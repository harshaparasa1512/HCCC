import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataEntryManagePolicy from './managePolicies/managePolicies';
import DataEntryVendors from './vendors/vendors';
import DataEntryInventory from './inventory/inventory';
import DataEntryPriestSpecilisation from './priestSpecilisation/priestSpecilisation';
import DataEntryManagementTeamBio from './managementTeamBio/managementteamBio';
import DataEntryFestivities from './festivities/festivities';
import DataEntryDietyInformation from './dietyInfo/dietyInformation';
import DataEntryEnterMeetingofMinutes from './enterMeetingMiniutes/enterMinutesofMeeting';
import DataEntryFileManagement from './fileManagement/fileManagement';
import DataEntryPriestcategorisation from './priestCategorisation/priestCategorisation';
import Panchangam from './panchangam/panchangam';
import Volunteers from './volunteer/volunteers';
import { checkAuthToken, getaccessToken } from 'infrastructure/backendService';

const DataEntryType: React.FunctionComponent = () => {
   const { dataEntryType } = useParams();

   let componentToRender: JSX.Element;

   const navigate = useNavigate();

   useEffect(()=>{
      if(!checkAuthToken()) {
         navigate('/')
      }
   },[getaccessToken()])

   switch (dataEntryType) {
      case 'Manage Policies':
         componentToRender = <DataEntryManagePolicy />;
         break;
      case 'Vendors':
         componentToRender = <DataEntryVendors />;
         break;
      case 'Inventory':
         componentToRender = <DataEntryInventory />;
         break;
      case 'Priest Specialization':
         componentToRender = <DataEntryPriestSpecilisation />;
         break;
      case 'Management Team Bio':
         componentToRender = <DataEntryManagementTeamBio />;
         break;
      case 'Festivities':
         componentToRender = <DataEntryFestivities />;
         break;
      case 'Deity Information':
         componentToRender = <DataEntryDietyInformation />;
         break;
      case 'Enter Minutes of Meeting':
         componentToRender = <DataEntryEnterMeetingofMinutes />;
         break;
      case 'File Management':
         componentToRender = <DataEntryFileManagement />;
         break;
      case 'Priest Categorisation':
         componentToRender = <DataEntryPriestcategorisation />;
         break;
      case 'Volunteers':
         componentToRender = <Volunteers />;
         break;
      case 'Panchangam':
        componentToRender = <Panchangam/>;
        break;
      default:
         componentToRender = <div>Page not found</div>;
   }

   return <>{componentToRender}</>;
};

export default DataEntryType;
