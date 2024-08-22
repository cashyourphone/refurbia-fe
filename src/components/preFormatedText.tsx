'use client';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress } from '@mui/material';

interface Props {
    url: string
}

const PreformattedText: React.FC<Props> = ({url}) => {
    const [text, setText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                setText(data)
                setLoading(false)
            })
            .catch(error => console.error('Error fetching text file:', error));
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Typography component="pre" style={{ whiteSpace: 'pre-wrap' }}>
            {text}
        </Typography>
    );
};

export default PreformattedText;
