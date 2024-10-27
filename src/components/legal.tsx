
"use client";
// components/Legal.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, Tab, Typography, Box, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, useTheme } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import PreformattedText from './preFormatedText';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};

const Legal: React.FC = () => {
    const searchParams = useSearchParams();
    const initialPolicy = searchParams.get('policy') || 'tnc';
    const [value, setValue] = useState(0);
    const [expanded, setExpanded] = useState<string | false>(initialPolicy);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('customMd'));

    useEffect(() => {
        switch (initialPolicy) {
            case 'tnc':
                setValue(0);
                setExpanded('tnc');
                break;
            case 'privacy':
                setValue(1);
                setExpanded('privacy');
                break;
            case 'refund':
                setValue(2);
                setExpanded('refund');
                break;
            case 'shipping':
                setValue(3);
                setExpanded('shipping');
                break;
            case 'warranty':
                setValue(4);
                setExpanded('warranty');
                break;
            default:
                setValue(0);
                setExpanded('tnc');
        }
    }, [initialPolicy]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {isMobile ? (
                <>
                    <Accordion expanded={expanded === 'tnc'} onChange={handleAccordionChange('tnc')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>Terms and Conditions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PreformattedText url='/assests/termsAndCondition.txt' />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'privacy'} onChange={handleAccordionChange('privacy')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>Privacy Policy</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PreformattedText url='/assests/privacyPolicy.txt' />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'refund'} onChange={handleAccordionChange('refund')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>Refund Policy</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PreformattedText url='/assests/returnAndRefund.txt' />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'shipping'} onChange={handleAccordionChange('shipping')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>Shipping Policy</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PreformattedText url='/assests/shippingPolicy.txt' />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'warranty'} onChange={handleAccordionChange('warranty')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>Warranty Policy</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PreformattedText url='/assests/warrantyPolicy.txt' />
                        </AccordionDetails>
                    </Accordion>
                </>
            ) : (
                <>
                    <Tabs value={value} onChange={handleTabChange} aria-label="legal policies tabs">
                        <Tab className='text-lg font-bold' label="Terms and Conditions" />
                        <Tab className='text-lg font-bold' label="Privacy Policy" />
                        <Tab className='text-lg font-bold' label="Refund Policy" />
                        <Tab className='text-lg font-bold' label="Shipping Policy" />
                        <Tab className='text-lg font-bold' label="Warranty Policy" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <PreformattedText url='/assests/termsAndCondition.txt'/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                            <PreformattedText url='/assests/privacyPolicy.txt' />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                            <PreformattedText url='/assests/returnAndRefund.txt' />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                            <PreformattedText url='/assests/shippingPolicy.txt' />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                            <PreformattedText url='/assests/warrantyPolicy.txt' />
                    </TabPanel>
                </>
            )}
        </Box>
    );
};


export default Legal;
