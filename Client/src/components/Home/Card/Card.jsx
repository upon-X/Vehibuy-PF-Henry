import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { addToCart, addToFav, removeFromFav } from "../../../Redux/actions";
import Swal from "sweetalert2";
import { verifyDeleteFav } from "../../NotiStack";

export default function Card(props) {
  const { id, name, price, image, location, state } = props;
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.favorites);
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const [isFav, setIsFav] = useState(false);
  const [firstImage, setFirstImage] = useState(null);

  useEffect(() => {
    if (image && image.length > 0) {
      setFirstImage(image[0]);
    }
  }, [image]);

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === props.id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  const handleFavorite = () => {
    if (isFav) {
      Swal.fire({
        title: "¿Are you sure?",
        text: "The cart will be removed from Favorites",
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: "Accept",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeFromFav(props.id));
          verifyDeleteFav();// Mover la actualización de setIsFav aquí
          setIsFav(false); 
        } else {
          setIsFav(true);
        }
      });
    } else {
      setIsFav(true);
      dispatch(addToFav(props));
    }
  };
  
  const toggleFav = () => {
    setIsFav(!isFav);
  };

  return (
    <div className={styles.container}>
      <div>
        <Link to={`/detail/${id}`}>
          <img
            className={styles.containerImg}
            src={firstImage}
            alt="Image..."
          />
        </Link>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>$ {formatPrice(price)} USD </div>
      <div className={styles.state}>{state}</div>
      <div className={styles.locationAndFav}>
        <div className={styles.location}>{location}</div>
        <div className={styles.heart} onClick={toggleFav}>
          <button onClick={handleFavorite}>{isFav ? "★" : "☆"}</button>
        </div>
      </div>
    </div>
  );
}
