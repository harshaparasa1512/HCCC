import { Typography } from '@mui/material';
import styles from '../priestSeniority/priestSeniority.module.scss';
import GridTableComponent from 'components/common/GridTableComponent/gridTableTemplate';
import { useRef } from 'react';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const PriestSeniority = () => {
    const tableRef = useRef(null);

    const priestSeniorityDetails = [
        {
            "Seniority": "1",
            "Name": "6099FE38 81652F53 D221C612 ( Chandhu )",
            "Up": (
                <ArrowCircleUpIcon className={styles.circleUpArrowIcon} />
            ),
            "Down": (
                <ArrowCircleDownIcon className={styles.circleDownArrowIcon} />
            ),
        },
        {
            "Seniority": "2",
            "Name": "6099FE38 81652F53 D221C612 ( THEJESVI )",
            "Up": (
                <ArrowCircleUpIcon className={styles.circleUpArrowIcon} />
            ),
            "Down": (
                <ArrowCircleDownIcon className={styles.circleDownArrowIcon} />
            ),
        },
    ];


    const priestSeniorityPage = () => {
        return (
            <div>
                <Typography className={styles.subTitle}>Priest Seniority</Typography>
                <div style={{marginBottom: "15px", marginTop: "15px"}}>
                    <Typography className={styles.description}>You can change the seniority of the priests using the following form. Changes to the seniority order of priests is normally needed when there is an addition or deletion of a name to the list of the priests.</Typography>
                    <Typography className={styles.description} style={{ marginTop: "5px" }}>To change the seniority order for a particular priest, click on "Up" or "Down" arrow.</Typography>
                </div>
                <div className={styles.tableContainer}>
                    <GridTableComponent tableData={priestSeniorityDetails} tableRef={tableRef} />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.mainContainer}>
            {priestSeniorityPage()}
        </div>
    )
}

export default PriestSeniority