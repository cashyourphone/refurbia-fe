// components/brandSearch.tsx
'use client';

import { FC, useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const BrandSearch: FC = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [query,setQuery] = useState('')

    function handleSearch(term: string) {
        let params
        if (searchParams) {
             params = new URLSearchParams(searchParams);
        }
        if (term) {
            params?.set('query', term);
            setQuery(term)
        } else {
            params?.delete('query');
            setQuery('')
        }
        replace(`${pathname}?${params?.toString()}`);
    }

    return (
        <TextField
            hiddenLabel
            size="small"
            className='w-full'
            variant="outlined"
            aria-label="Search your phone"
            placeholder="Search your phone"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <ClearIcon onClick={()=> handleSearch('')} />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default BrandSearch;
