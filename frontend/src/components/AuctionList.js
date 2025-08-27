import React, { useEffect, useState } from 'react';

function AuctionList() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/auctions')
            .then(res => res.json())
            .then(data => setAuctions(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Active Auctions</h2>
            <div className="row">
                {auctions.map((auction) => (
                    <div key={auction._id} className="col-md-4">
                        <div className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{auction.title}</h5>
                                <p className="card-text">{auction.description}</p>
                                <p><strong>Starting Bid:</strong> ${auction.startingBid}</p>
                                <p><strong>Ends:</strong> {new Date(auction.endTime).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AuctionList;
