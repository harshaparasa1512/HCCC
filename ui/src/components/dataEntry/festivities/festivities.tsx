import { Card, Typography, Grid, TextareaAutosize } from '@mui/material';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useState, useEffect, useRef } from 'react';
import styles from '../managePolicies/managePolicies.module.scss';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    CustomSelect,
    CustomEditIcon,
    CustomDeleteIcon,
    CommonButton,
    CustomInputLabel,
    CustomTextFeild,
    CustomCheckbox
} from 'components/common/StyledComponents/StyledFields';
import LeftMainNavigation from 'components/common/leftMenuNavigation/leftMenuNavigation';

const DataEntryFestivities = () => {
    const tableRef = useRef(null);

    const festivitiesDetails = [
        {
            "Sr.No": "1",
            "Date": "Title Name 123",
            "Special Events": "Hari",
            "Action": (
                <div>
                    <CustomEditIcon />
                </div>
            ),
        },
        {
            "Sr.No": "2",
            "Date": "Title Name 456",
            "Special Events": "Vinay",
            "Action": (
                <div>
                    <CustomEditIcon />
                </div>
            ),
        },
    ]

    const selectMonths = [
        {
            month: 'January',
        },
        {
            month: 'Febuary',
        },
        {
            month: 'March',
        },
        {
            month: 'April',
        },
        {
            month: 'May',
        },
        {
            month: 'June',
        },
        {
            month: 'July',
        },
        {
            month: 'Augest',
        },
        {
            month: 'September',
        },
        {
            month: 'October',
        },
        {
            month: 'November',
        },
        {
            month: 'December',
        },
    ];


    const selectMonth = (): React.ReactElement => {
        return (
            <FormControl sx={{ width: "100%" }} className={styles.dropDowns}>
                <CustomSelect IconComponent={KeyboardArrowDownIcon}
                    className={styles.dropDownSelect}
                    defaultValue=""
                    id="grouped-select"
                // value={formData.nakshatram}
                // onChange={(e) => handleFieldChange('nakshatram', e.target.value)}
                >
                    {selectMonths.map((item, index: number) => (
                        <MenuItem key={index} value={item.month}>
                            {item.month}
                        </MenuItem>
                    ))}
                </CustomSelect>
            </FormControl>
        )
    }

    const festivities = () => {
        return (
            <div>
                <div className={styles.subContainer}>
                    <Typography className={styles.title}>Festivities</Typography>
                </div>
                <Card sx={{ height: "120px", boxShadow: "0px 2px 20px 0px rgba(237, 237, 237, 0.80)" }} className={styles.card}>
                    <Grid container spacing={2} sx={{ marginTop: "0px", padding: "10px" }}>
                        <Grid item xs={12} sm={3}>
                            <CustomInputLabel>Select Month</CustomInputLabel>
                            {selectMonth()}
                        </Grid>
                    </Grid>
                </Card>
                <div>
                    <CommonButton sx={{ marginTop: "10px", marginBottom: "10px" }}>Add New</CommonButton>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={festivitiesDetails} tableRef={tableRef} />
                </div>
            </div>
        )
    }


    return (
        <div style={{display:"flex"}}>
            <LeftMainNavigation />
            <div className={styles.mainContainer}>
                {festivities()}
            </div>
        </div>
    )
}

export default DataEntryFestivities;
