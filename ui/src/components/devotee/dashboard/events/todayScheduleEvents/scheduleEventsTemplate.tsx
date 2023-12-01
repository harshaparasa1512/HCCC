import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { type StepIconProps } from '@mui/material/StepIcon';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './todayScheduleEvents.module.scss';


interface ScheduleTemplateProps {
    itemList : string[]
}

const ColorlibConnector = styled(StepConnector)(({ }) => ({
    [`& .${stepConnectorClasses.line}`]: {
        height: 16,
        minHeight:1,
        border: 0,
        backgroundColor: '#F05802',
        borderRadius: 1,
        width: 1.2,
        marginLeft: -1
    },
})) as typeof StepConnector;



const ScheduleEventsTemplate = (props : ScheduleTemplateProps) : JSX.Element => {

    function ClockStepIcon(prop : StepIconProps): React.ReactElement {

        const generateIcons = (count: number) => {
            const icons: Record<string, React.ReactElement> = {};

            for (let i = 1; i <= count; i++) {
                icons[String(i)] = <AccessTimeIcon key={i} className={styles.clockIcon} />;
            }

            return icons;
        };

        const icons = generateIcons(props.itemList.length);

        return <>{icons[prop.icon?.toString() ?? 'defaultKey']}</>;
    }

    return (
        <div className={styles.scheduleContainer}>
        <Stack sx={{ width: '100%' }}>
            <Stepper activeStep={1} orientation='vertical' connector={<ColorlibConnector />}>
                {props.itemList.map((label : string, index:number) => (
                    <Step key={index}>
                        <StepLabel StepIconComponent={ClockStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
        </div>
    );
};

export default ScheduleEventsTemplate;