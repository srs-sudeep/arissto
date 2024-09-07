import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Store } from 'react-notifications-component';

const SavedPapersPage = () => {
    const [savedPapers, setSavedPapers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedPapers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/saved');
                setSavedPapers(response.data);
            } catch (error) {
                console.error('Error fetching saved papers:', error);
                setError('Failed to fetch saved papers.');
            }
        };

        fetchSavedPapers();
    }, []);

    const removePaper = async (paperId) => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/remove', {
                data: { paper_id: paperId },
            });
            setSavedPapers(savedPapers.filter(paper => paper.id !== paperId));
            Store.addNotification({
                title: "Success!",
                message: "Paper has been removed.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
        } catch (error) {
            console.error('Error removing paper:', error);
            setError('Failed to remove paper.');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                SAVED PAPERS
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {savedPapers.length === 0 && !error && <Typography>No saved papers.</Typography>}
            <Grid container spacing={2}>
                {savedPapers.map((paper) => (
                    <Grid item xs={12} sm={6} md={4} key={paper.id}>
                        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {paper.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Authors: {paper.authors}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Year: {paper.year}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Citations: {paper.citations}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => removePaper(paper.id)}
                                    sx={{ mt: 2 }}
                                >
                                    Remove
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SavedPapersPage;
