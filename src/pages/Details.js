import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/api";
import Loader from "../components/Loader";

const Details = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(`${url}/cards/${id}`);
        if (response.status === 200) {
          setCards(response.data.card);
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
    return <Loader />;
  }

  if (error) {
    return <h1>An error occurred</h1>;
  }

  return (
    <>
      <Link to="/">
        <button className="button">Go Back</button>
      </Link>
      <div className="main">
        <div className="card">
          <div className={`rarity ${cards.rarity}`}></div>
          <img className="img" src={cards.imageUrl} alt={cards.name} />
          <p className="name">{cards.name}</p>
          <p className="name">{cards.type}</p>
          <br />
          <p className="name">{cards.text}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
