import React, { useState } from 'react';

function CreateAuction() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        startingBid: '',
        endTime: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auctions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                alert('Auction created successfully!');
                setForm({ title: '', description: '', startingBid: '', endTime: '' });
            } else {
                alert('Error creating auction');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create Auction</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Starting Bid ($)</label>
                    <input
                        type="number"
                        name="startingBid"
                        className="form-control"
                        value={form.startingBid}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">End Time</label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        className="form-control"
                        value={form.endTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Create Auction</button>
            </form>
        </div>
    );
}

export default CreateAuction;
