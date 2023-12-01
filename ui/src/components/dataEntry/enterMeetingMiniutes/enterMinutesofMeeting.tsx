import { Card, Typography, Grid, TextareaAutosize } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useState, useEffect, useRef } from 'react';
import styles from '../managePolicies/managePolicies.module.scss';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

const DataEntryEnterMeetingofMinutes = () => {
    const tableRef = useRef(null);

    const enterMinutesofMeetingDetails = [
        {
            "Meeting Date": "12/11/2023",
            "View Document": "Vinay",
            "File Size": "200mb",
            "Uploaded On": "13/11/2023",
        },
        {
            "Meeting Date": "12/11/2023",
            "View Document": "Hari",
            "File Size": "500mb",
            "Uploaded On": "13/11/2023",
        },
    ]

    const enterMinutesofMeeting = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Enter Minutes of Meeting</Typography>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={enterMinutesofMeetingDetails} tableRef={tableRef} />
                </div>
            </div>
        )
    }


    return (
        <div style={{ display: "flex" }}>
            <LeftMainNavigation />
            <div className={styles.mainContainer}>
                {enterMinutesofMeeting()}
            </div>
        </div>
    )
}

export default DataEntryEnterMeetingofMinutes
