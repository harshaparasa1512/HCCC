import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';
import React from 'react';

const ApprovedExpenses = (): JSX.Element => {
    return (
        <div style={{display:"flex"}}>
            <LeftMainNavigation/>
           <p>Approved expenses</p> 
        </div>
    );
};

export default ApprovedExpenses;
