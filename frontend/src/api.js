import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", // your backend
});

// Auctions CRUD
export const getAuctions = () => API.get("/auctions");
export const getAuction = (id) => API.get(`/auctions/${id}`);
export const createAuction = (auction) => API.post("/auctions", auction);
export const updateAuction = (id, auction) => API.put(`/auctions/${id}`, auction);
export const deleteAuction = (id) => API.delete(`/auctions/${id}`);
