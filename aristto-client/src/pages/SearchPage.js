import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Container, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/searchPage?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <Box className="search-page">
            <Container maxWidth="md" className="logo-container">
                <img
                    src="/aristto-logo-zip-file/png/logo-no-background.png"
                    style={{ width: 200, height: 200 }}
                    alt="Logo"
                    className="logo"
                />
            </Container>
            <Container maxWidth="sm" className="search-container">
                <Paper elevation={3} className="search-bar">
                    <InputBase
                        placeholder="Search for research papers..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        fullWidth
                        sx={{ ml: 1, flex: 1 }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Container>
        </Box>
    );
};

export default SearchPage;
