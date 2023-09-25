import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ButtonBack } from "../../assets/svgs";
import Card from "../Home/Card/Card";
import style from "./Favorites.module.css";
import NOTFOUND from "./Icons/NOTFOUND.png";
import { Link } from "react-router-dom";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      // Parse the JSON data and update the Redux store or state with it
      dispatch({ type: "SET_FAVORITES", payload: JSON.parse(savedFavorites) });
    }
  }, []);

  return (
    <div>
      <div className={style.coverImage}></div>
      <div className={style.buttonBackContainer}>
        <Link to={"/home"}>
          <ButtonBack />
        </Link>
      </div>
      <h2 className={`${style.favorites_title} ${style.title}`}>
        Your Favorites
      </h2>
      <div className={style.container}>
        {favorites.length === 0 ? (
          <div className={style.containerNF}>
            <div className={style.containerNFP}>
              <div>
                <img src={NOTFOUND} alt="NotFound..." />
              </div>
              <dir>
                <p>You don't have Favorites</p>
                <span>Add all the cars you want!</span>
              </dir>
            </div>
          </div>
        ) : (
          favorites.map((char) => (
            <Card
              key={char.id}
              id={char.id}
              name={char.name}
              state={char.state}
              price={char.price}
              image={char.image}
              location={char.location}
            />
          ))
        )}
      </div>
    </div>
  );
}
