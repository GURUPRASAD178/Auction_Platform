import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuctionList from "./pages/AuctionList";
import AuctionForm from "./pages/AuctionForm";
import AuctionDetail from "./pages/AuctionDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuctionList />} />
        <Route path="/auction/new" element={<AuctionForm />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
        <Route path="/auction/edit/:id" element={<AuctionForm />} />
      </Routes>
    </Router>
  );
}

export default App;

