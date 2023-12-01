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

const DataEntryVendors = () => {
    const tableRef = useRef(null);


    const vendorsDetails = [
        {
            "S.No": "1",
            "Vendor Name": "Title Name 123",
            "Address": "Hyderabad",
            "Date Last Modified": "13/11/2023",
            "Action": (
                <div>
                    <CustomEditIcon />
                    <CustomDeleteIcon />
                </div>
            ),
        },
        {
            "S.No": "2",
            "Vendor Name": "Title Name 456",
            "Address": "Hyderabad",
            "Date Last Modified": "13/11/2023",
            "Action": (
                <div>
                    <CustomEditIcon />
                    <CustomDeleteIcon />
                </div>
            ),
        },
    ]



    const vendors = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Vendor</Typography>
                    <CommonButton className={styles.addnewButton}>Add New</CommonButton>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={vendorsDetails} tableRef={tableRef} />
                </div>
            </div>
        )
    }
    return (
        <div style={{ display: "flex" }}>
            <LeftMainNavigation />
            <div className={styles.mainContainer}>
                {vendors()}
            </div>
        </div>
    )
}

export default DataEntryVendors;
