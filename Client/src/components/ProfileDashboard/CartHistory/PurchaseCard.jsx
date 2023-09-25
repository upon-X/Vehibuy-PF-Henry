import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./PurchaseCard.module.css";
import axios from "axios";

export default function Card(props) {
  const { id, date, description, price } = props;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const splitDate = date.split("T");
  const newDate = splitDate[0].split("-");
  const formatDate = `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
  const splitId = id.split("-");
  const formatId = splitId[0];
  const [cars, setCars] = useState([]);

  const getCarsHandler = async (id) => {
    try {
      const endpoint = "/buy/detail/";
      const { data } = await axios.get(`${endpoint}${id}`);
      return setCars(data);
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = () => {
    return cars.reduce((total, product) => {
      const productPrice = Number(product.price); // Convert price to number
      return total + productPrice;
    }, 0);
  };
  useEffect(() => {
    getCarsHandler(id);
    console.log(cars);
  }, []);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.h2Container}>
          <h2 className={styles.h2}>Order id: {formatId} </h2>
          <div className={styles.dateContainer}>
            <h3 className={styles.date}>{formatDate}</h3>
          </div>
        </div>
      </div>
      <div className={styles.cart}>
        <div className={styles.products_detail}>
          <div className={styles.products}>
            <div className={styles.topics}>
              <h3 className={styles.topic_product}>Product</h3>
              <h3 className={styles.topic_price}>Price</h3>
            </div>
            {cars.map((product) => (
              <div className={styles.car_i} key={product.name}>
                <Link
                  className={styles.link_imgcar}
                  to={`/detail/${product.id}`}
                >
                  {product.image && product.image[0] && (
                    <img
                      className={styles.car_img}
                      src={product.image[0]}
                      alt="imagen"
                    />
                  )}
                </Link>
                <div className={styles.name_and_brand}>
                  <p>
                    {product.name} {product.model}
                    <br />
                    {product.brand}{" "}
                  </p>
                </div>
                <div className={styles.price}>
                  <h4 className={styles.car_price}>${Number(product.price)}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
