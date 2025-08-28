import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddAuction() {
    const [auction, setAuction] = useState({ title: "", description: "", startingPrice: "", endDate: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setAuction({ ...auction, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/auctions", auction);
        navigate("/");
    };

    return (
        <div className="container">
            <h2>Add New Auction</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <input className="form-control mb-2" name="title" placeholder="Title" onChange={handleChange} required />
                <textarea className="form-control mb-2" name="description" placeholder="Description" onChange={handleChange} required />
                <input className="form-control mb-2" type="number" name="startingPrice" placeholder="Starting Price" onChange={handleChange} required />
                <input className="form-control mb-2" type="datetime-local" name="endDate" onChange={handleChange} required />
                <button className="btn btn-success">Add Auction</button>
            </form>
        </div>
    );
}
