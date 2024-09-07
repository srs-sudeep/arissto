import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, Typography, Button, Paper, InputBase, IconButton, Pagination } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import './SearchResultsPage.css';
import Loader from '../component/Loader';

const ITEMS_PER_PAGE = 5;

const SearchResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [papers, setPapers] = useState([]);
    const [allPapers, setAllPapers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(new URLSearchParams(location.search).get('query') || '');
    const [input, setInput] = useState(query);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPapers = async () => {
            if (query) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.crossref.org/works?query=${encodeURIComponent(query)}`);
                    const fetchedPapers = response.data.message.items.map(paper => ({
                        id: paper.DOI,
                        title: paper.title[0],
                        authors: (paper.author && paper.author.length > 0)
                            ? paper.author.map(author => `${author.given} ${author.family}`).join(', ')
                            : 'Unknown authors', // Fallback value when authors are not present
                        year: paper.issued['date-parts'][0][0],
                        citations: paper['is-referenced-by-count'] || 0,
                    }));
                    setAllPapers(fetchedPapers);
                    setTotalPages(Math.ceil(fetchedPapers.length / ITEMS_PER_PAGE));
                    setPapers(fetchedPapers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE));
                    setError(null);
                } catch (error) {
                    setError('Failed to fetch data.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPapers();
    }, [query, currentPage]);

    const handleSearch = () => {
        if (input.trim()) {
            navigate(`/searchPage?query=${encodeURIComponent(input)}`);
            setQuery(input);
            setCurrentPage(1);
        }
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setPapers(allPapers.slice(startIndex, endIndex));
    };

    const savePaper = async (paper) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/save', paper);
            Store.addNotification({
                title: "Success!",
                message: "Paper saved successfully.",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
            navigate('/saved');
        } catch (error) {
            console.error('Error saving paper:', error);
            Store.addNotification({
                title: "Error!",
                message: "Failed to save paper.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
        }
    };

    return (
        <Container>
            <Paper elevation={3} className="search-bar">
                <InputBase
                    placeholder="Search for research papers..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    fullWidth
                    sx={{ ml: 1, flex: 1 }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
            </Paper>

            {loading &&  <Loader />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <List>
                {papers.map((paper) => (
                    <ListItem key={paper.id} className="paper-item">
                        <div>
                            <Typography variant="h6">{paper.title}</Typography>
                            <Typography variant="subtitle1">Authors: {paper.authors}</Typography>
                            <Typography variant="body2">Published Year: {paper.year}</Typography>
                            <Typography variant="body2">Citations: {paper.citations}</Typography>
                        </div>
                        <Button variant="outlined" onClick={() => savePaper(paper)}>
                            Save
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
        </Container>
    );
};

export default SearchResultsPage;
