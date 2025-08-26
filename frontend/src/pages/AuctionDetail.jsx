import { useEffect, useState } from "react";
import { getAuction } from "../api";
import { useParams } from "react-router-dom";

export default function AuctionDetail() {
    const [auction, setAuction] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getAuction(id).then(res => setAuction(res.data));
    }, [id]);

    if (!auction) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{auction.title}</h1>
            <p>{auction.description}</p>
            <p className="font-semibold">Starting Price: ₹{auction.startingPrice}</p>
        </div>
    );
}
