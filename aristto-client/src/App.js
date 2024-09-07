import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import SearchResultsPage from './pages/SearchResultPage';
import SavedPapersPage from './pages/SavedPapersPage';
import Layout from './Layout/Layout';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

function App() {
    return (
        <Router>
                        <ReactNotifications />

            <Layout>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/searchPage" element={<SearchResultsPage />} />
                    <Route path="/saved" element={<SavedPapersPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
