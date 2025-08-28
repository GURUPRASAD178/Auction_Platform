import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Auction Platform</Link>
                <div>
                    <Link className="btn btn-outline-light mx-2" to="/">Auctions</Link>
                    <Link className="btn btn-success" to="/add">+ Add Auction</Link>
                </div>
            </div>
        </nav>
    );
}
