import { Card, Typography, Grid, TextareaAutosize } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useState, useEffect, useRef } from 'react';
import styles from '../managePolicies/managePolicies.module.scss';
import {
    CustomEditIcon,
    CommonButton,
} from 'components/common/StyledComponents/StyledFields';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

const DataEntryManagementTeamBio = () => {
    const tableRef = useRef(null);


    const managementTeamBioDetails = [
        {
            "Sign-in Name": "Title Name 123",
            "Name": "Vinay",
            "Action": (
                <div>
                    <CustomEditIcon />
                </div>
            ),
        },
        {
            "Sign-in Name": "Title Name 456",
            "Name": "Hari",
            "Action": (
                <div>
                    <CustomEditIcon />
                </div>
            ),
        },
    ]

    const managementTeamBio = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Management Team Bio</Typography>
                    <CommonButton className={styles.addnewButton}>Add New</CommonButton>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={managementTeamBioDetails} tableRef={tableRef} />
                </div>
            </div>
        )
    }



    return (
        <div style={{display:"flex"}}>
            <LeftMainNavigation/>
        <div className={styles.mainContainer}>
            {managementTeamBio()}
        </div>
        </div>
    )
}

export default DataEntryManagementTeamBio
