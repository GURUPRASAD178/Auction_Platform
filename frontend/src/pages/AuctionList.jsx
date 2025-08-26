import { useEffect, useState } from "react";
import { getAuctions, deleteAuction } from "../api";
import { Link } from "react-router-dom";

export default function AuctionList() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        getAuctions().then(res => setAuctions(res.data));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this auction?")) {
            await deleteAuction(id);
            setAuctions(auctions.filter(a => a._id !== id));
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Auctions</h1>
            <Link to="/auction/new" className="bg-blue-500 text-white px-3 py-1 rounded">New Auction</Link>
            <ul className="mt-4">
                {auctions.map(a => (
                    <li key={a._id} className="border p-3 flex justify-between items-center">
                        <Link to={`/auction/${a._id}`} className="font-semibold">{a.title}</Link>
                        <div>
                            <Link to={`/auction/edit/${a._id}`} className="mr-2 text-blue-500">Edit</Link>
                            <button onClick={() => handleDelete(a._id)} className="text-red-500">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
