import { Card, Typography, Grid, TextareaAutosize } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useState, useEffect, useRef } from 'react';
import styles from '../managePolicies/managePolicies.module.scss';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

const DataEntryFileManagement = () => {
    const tableRef = useRef(null);

    const fileManagementDetails = [
        {
            "File Name": "12/11/2023",
            "View Document": "Voucher",
            "File Size": "200mb",
            "Uploaded By": "Vinay",
            "Uploaded On": "13/11/2023",
        },
        {
            "File Name": "12/11/2023",
            "View Document": "Voucher 1",
            "File Size": "500mb",
            "Uploaded By": "Hari",
            "Uploaded On": "13/11/2023",
        },
    ]

    const fileManagement = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>File Management</Typography>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={fileManagementDetails} tableRef={tableRef} />
                </div>
            </div>
        )
    }


    return (
        <div style={{display:"flex"}}> 
        <LeftMainNavigation/>
            <div className={styles.mainContainer}>
                {fileManagement()}
            </div>
        </div>
    )
}

export default DataEntryFileManagement
