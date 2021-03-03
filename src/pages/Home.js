import { useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/api";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(`${url}/cards`);
        console.log(response);
        if (response.status === 200) {
          setCards(response.data.cards);
        } else {
          setError("an error occurred");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  if (loading) {
    return;
  }

  if (error) {
    return <h1>An error occurred</h1>;
  }
  console.log(cards);
  return (
    <>
      {cards.map((card) => {
        return (
          <div key={card.id}>
            <p>{card.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default Home;
