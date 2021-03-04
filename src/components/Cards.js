// import { useEffect, useState } from "react";

const Cards = (props) => {
  const { type, name, imgUrl, rarity } = props;
  return (
    <div className="card">
      <div className={`rarity ${rarity}`}></div>
      <img className="img" src={imgUrl} alt={name} />
      <p className="name">{name}</p>
      <p className="name">{type}</p>
      <button className="readMore button">More Info</button>
    </div>
  );
};
export default Cards;
