import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import url from "../utils/api";
import Cards from "../components/Cards";
import Loader from "../components/Loader";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changePageLoader, setChangePageLoader] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(`${url}/cards?page=${page}`);
        console.log(page);
        if (response.status === 200) {
          setCards(response.data.cards);
        } else {
          setError("an error occurred");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setChangePageLoader(false);
      }
    };
    fetchApi();
  }, [page]);

  const nextPage = () => {
    setChangePageLoader(true);
    setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 1) {
      setChangePageLoader(true);
      setPage(page - 1);
    }
  };

  if (error) {
    return <h1>An error occurred</h1>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="pagination">
        <button onClick={prevPage} className="button">
          Previous
        </button>
        <div>Page: {page}</div>
        <button onClick={nextPage} className="button">
          Next
        </button>
      </div>
      {changePageLoader ? (
        <Loader />
      ) : (
        <div className="main">
          {cards.map((card) => {
            if (card.imageUrl !== undefined) {
              return (
                <Link to={`/details/${card.id}`} key={card.id}>
                  <Cards
                    rarity={card.rarity}
                    type={card.type}
                    name={card.name}
                    id={card.id}
                    imgUrl={card.imageUrl}
                  />
                </Link>
              );
            }
          })}
        </div>
      )}
      <div className="pagination">
        <button onClick={prevPage} className="button">
          Previous
        </button>
        <div>Page: {page}</div>
        <button onClick={nextPage} className="button">
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
