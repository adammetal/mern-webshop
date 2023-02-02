import { useState, useEffect } from "react";
import BidForm from "./BidForm";

const Cards = () => {
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/cards")
      .then((res) => res.json())
      .then((cards) => {
        setCards(cards);
        setLoading(false);
      });
  }, []);

  if (loading === true) {
    return "Loading...";
  }

  return (
    <div>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th>Card</th>
            <th>Bids</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card._id}>
              <td>
                <h1>{card.price} USD</h1>
                <img height={400} src={card.image} />
              </td>
              <td>
                <BidForm
                  cardId={card._id}
                  onBidAdded={(bid) => {
                    console.log(bid);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cards;
