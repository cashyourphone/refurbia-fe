// components/Search.tsx
import React, { useState, useEffect } from 'react';
import {
    TextField, List, ListItem, ListItemText,
    ListItemAvatar, Avatar, Paper, alpha,
    InputAdornment, IconButton
} from '@mui/material';
import axios from 'axios';
import {debounce} from 'lodash';
import { baseUrl, version } from '@/config/config';
import ClearIcon from '@mui/icons-material/Clear';

interface Product {
    _id: string;
    brandName: string;
    productImage: string;
    variantName: string;
    modelVariant: string;
    quoteValue: number;
}

interface SearchProps {
    className?: string; // Add this line
}

interface Response {
    error: boolean;
    message: string;
    status: number;
    data: Product[];
}

const Search: React.FC<SearchProps> = ({className}) => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Product[]>([]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const debouncedFetchData = debounce(async () => {
            try {
                const { data } = await axios.get<Response>(`${baseUrl}/${version}/mobile/search`, {
                    params: { text: query }
                });
                setResults(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 500); // Adjust the debounce delay as needed

        debouncedFetchData();

        return () => {
            debouncedFetchData.cancel();
        };
    }, [query]);

    function removeParentheses(str: string): string {
        return str.replace(/[()]/g, '');
    }

    const handleClear = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <div className={className}>
            <TextField
                id="outlined-basic"
                className='w-full'
                hiddenLabel
                size="small"
                variant="outlined"
                aria-label="Search your phone"
                placeholder="Search your phone"
                sx={{
                    boxShadow: `0 0 12px 8px ${alpha('#CCC2DC', 0.4)}`
                }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClear} edge="end">
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {results.length > 0 && (
                <Paper
                    sx={{
                        minHeight: '150px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        marginTop: 1,
                    }}
                    elevation={3}
                >
                    <List>
                        {results.map((product) => (
                            <ListItem key={product._id}>
                                <ListItemAvatar>
                                    <Avatar src={product.productImage} alt={product.brandName} />
                                </ListItemAvatar>
                                <ListItemText
                                    className='text-primary pl-0'
                                    primary={removeParentheses(product.modelVariant)}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </div>
    );
};

export default Search;
