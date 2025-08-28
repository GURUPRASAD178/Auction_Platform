import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AuctionList() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auctions")
            .then(res => setAuctions(res.data))
            .catch(err => console.error(err));
    }, []);

    const deleteAuction = async (id) => {
        if (window.confirm("Are you sure you want to delete this auction?")) {
            await axios.delete(`http://localhost:5000/api/auctions/${id}`);
            setAuctions(auctions.filter(a => a._id !== id));
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">All Auctions</h2>
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Starting Price</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {auctions.map(auction => (
                        <tr key={auction._id}>
                            <td>{auction.title}</td>
                            <td>${auction.startingPrice}</td>
                            <td>{new Date(auction.endDate).toLocaleString()}</td>
                            <td>
                                <Link to={`/edit/${auction._id}`} className="btn btn-warning btn-sm mx-2">Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteAuction(auction._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
