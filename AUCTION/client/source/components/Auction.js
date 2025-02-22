import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Button, Card, CardContent } from "@/components/ui/card";

const socket = io("http://localhost:5000");

const Auction = () => {
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState(0);

  useEffect(() => {
    socket.on("new_bid", (bid) => {
      setBids((prevBids) => [...prevBids, bid]);
    });
    return () => socket.off("new_bid");
  }, []);

  const placeBid = () => {
    socket.emit("place_bid", newBid);
    setNewBid(0);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Live Auction</h1>
      <Card className="my-4 p-4">
        <CardContent>
          <ul>
            {bids.map((bid, index) => (
              <li key={index} className="text-lg">Bid: ${bid}</li>
            ))}
          </ul>
          <input
            type="number"
            value={newBid}
            onChange={(e) => setNewBid(e.target.value)}
            className="border p-2 w-full mt-4"
          />
          <Button onClick={placeBid} className="mt-2 w-full">Place Bid</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auction;
