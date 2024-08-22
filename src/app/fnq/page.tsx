'use client';
import React, { useState, useEffect } from 'react';
import FNQs from '@/components/fnq';

const FAQPage: React.FC = () => {
    const [faqs, setFaqs] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/data/fnq.json')
            .then(response => response.json())
            .then(data => {
                setFaqs(data)
                setLoading(false)
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    return (
        <div className='p-5'>
            <h1 className='text-center text-xl text-primary'>Frequently Asked Questions</h1>
            <FNQs loading={ loading} faqs={faqs} />
        </div>
    );
};

export default FAQPage;
