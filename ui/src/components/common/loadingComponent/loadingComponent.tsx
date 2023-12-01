import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from './loadingComponent.module.scss';

export default function Loader() : JSX.Element {
    return (
        <Box className={styles.mainContainer}>
            <Typography>Loading...</Typography>
        </Box>
    );
};