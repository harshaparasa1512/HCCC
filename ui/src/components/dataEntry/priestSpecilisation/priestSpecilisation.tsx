import { Card, Typography, Grid, TextareaAutosize } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useState, useEffect, useRef } from 'react';
import styles from '../managePolicies/managePolicies.module.scss';
import {
    CustomEditIcon,
    CustomDeleteIcon,
    CommonButton,
} from 'components/common/StyledComponents/StyledFields';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

const DataEntryPriestSpecilisation = () => {
    const tableRef = useRef(null);

    const priestSpecializationDetails = [
        {
            "Sr.No": "1",
            "Sign-in Name": "Title Name 123",
            "Name": "Vinay",
            "Action": (
                <div>
                    <CustomEditIcon />
                    <CustomDeleteIcon />
                </div>
            ),
        },
        {
            "Sr.No": "2",
            "Sign-in Name": "Title Name 456",
            "Name": "Hari",
            "Action": (
                <div>
                    <CustomEditIcon />
                    <CustomDeleteIcon />
                </div>
            ),
        },
    ]


    const priestSpecialization = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Priest Specialization</Typography>
                    <CommonButton className={styles.addnewButton}>Add New</CommonButton>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={priestSpecializationDetails} tableRef={tableRef} />
                </div>
            </div>
        )
    }


    return (
        <div style={{ display: "flex" }}>
            <LeftMainNavigation/>
            <div className={styles.mainContainer}>
                {priestSpecialization()}
            </div>
        </div>
    )
}

export default DataEntryPriestSpecilisation
