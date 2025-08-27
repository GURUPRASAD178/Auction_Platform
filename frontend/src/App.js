import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuctionList from './components/AuctionList';
import CreateAuction from './components/CreateAuction';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Auction Platform</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Auctions</Link>
            <Link className="nav-link" to="/create">Create Auction</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<AuctionList />} />
        <Route path="/create" element={<CreateAuction />} />
      </Routes>
    </Router>
  );
}

export default App;
