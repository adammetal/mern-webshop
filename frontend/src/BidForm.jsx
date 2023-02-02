import { useState } from "react";

const BidForm = ({ cardId, onBidAdded }) => {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    fetch("http://localhost:8080/api/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card: cardId,
        name: user,
        amount: amount,
      }),
    })
      .then((res) => res.json())
      .then((bid) => {
        setLoading(false);
        onBidAdded(bid);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={user}
          onChange={(e) => setUser(e.currentTarget.value)}
          type="text"
          placeholder="User"
          disabled={loading}
        />
      </div>
      <div>
        <input
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
          type="number"
          placeholder="Amount"
          disabled={loading}
        />
      </div>
      <div>
        <button disabled={loading} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BidForm;
