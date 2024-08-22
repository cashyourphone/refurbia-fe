
'use client';
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, useTheme, useMediaQuery, CircularProgress, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQItem {
    question: string;
    answer: string;
}

const FNQs: React.FC<{ faqs: FAQItem[], loading:boolean }> = ({ faqs, loading }) => {
    const theme = useTheme();
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            {faqs.map((faq, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}>
                        <Typography variant="h6" className='text-primary'>
                            {faq.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body1" component="pre" whiteSpace="pre-line" color={theme.palette.text.secondary}>
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default FNQs;
