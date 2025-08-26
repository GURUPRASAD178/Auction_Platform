import { useEffect, useState } from "react";
import { createAuction, getAuction, updateAuction } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function AuctionForm() {
    const [form, setForm] = useState({ title: "", description: "", startingPrice: "" });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getAuction(id).then(res => setForm(res.data));
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateAuction(id, form);
        } else {
            await createAuction(form);
        }
        navigate("/");
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">{id ? "Edit Auction" : "New Auction"}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
                <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2" />
                <input type="number" name="startingPrice" value={form.startingPrice} onChange={handleChange} placeholder="Starting Price" className="border p-2" />
                <button className="bg-green-500 text-white px-3 py-1 rounded">{id ? "Update" : "Create"}</button>
            </form>
        </div>
    );
}
