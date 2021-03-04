import { useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/api";
import Cards from "../components/Cards";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changePageLoader, setChangePageLoader] = useState();
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(`${url}/cards?page=${page}`);
        console.log(page);
        console.log(changePageLoader);
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
    return (
      <div className="loader-div">
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
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
        <div className="loader-div">
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="main">
          {cards.map((card) => {
            if (card.imageUrl !== undefined) {
              return (
                <Cards
                  key={card.id}
                  rarity={card.rarity}
                  type={card.type}
                  name={card.name}
                  id={card.id}
                  imgUrl={card.imageUrl}
                />
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
