import React from 'react';
import RegisterDevotee from './RegisterDevotee/RegisterDevotee';
import ConsolidatedAccounts from './ConsolidatedAccounts/ConsolidatedAccounts';
import DuplicateDevotee from './DuplicateDevotee/DuplicateDevotee';
import RestoreConsolidatedAccounts from './RestoreConsolidatedAccounts/RestoreConsolidatedAccounts';
import DeletedDevoteeList from './DeletedDevoteeList/DeletedDevoteeList';
import PersonalInfo from './DevoteeQuickRegistration/PersonalInfo';
import { useParams } from 'react-router-dom';

const DevoteeManagementRoute: React.FunctionComponent  = () => {
    const { devoteeManagementType } = useParams();

    let componentToRender: JSX.Element;
 
    switch (devoteeManagementType) {
       case 'Register Devotee':
          componentToRender = <RegisterDevotee />;
          break;
       case 'Consolidate Accounts':
          componentToRender = <ConsolidatedAccounts />;
          break;
       case 'Duplicate Devotee Records':
          componentToRender = <DuplicateDevotee />;
          break;
       case 'Restore Accounts':
          componentToRender = <RestoreConsolidatedAccounts />;
          break;
       case 'Deleted Devotee List':
          componentToRender = <DeletedDevoteeList />;
          break;
       case 'Quick Register':
          componentToRender = <PersonalInfo />;
          break;      
       default:
          componentToRender = <div>Page not found</div>;
    }
 
    return <>{componentToRender}</>;
 };

export default DevoteeManagementRoute;