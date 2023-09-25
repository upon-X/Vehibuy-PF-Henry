import React, { useState, useEffect } from "react";
import styles from "./ProfileDashboard.module.css";
import Posts from "./Posts/Posts";
import Reviews from "./Reviews/Reviews";
import CartHistory from "./CartHistory/CartHistory";
import CreateProduct from "../Dashboard/CreateProduct/CreateProduct"
import Modification from "../Modification/Modification";
import { useSelector, useDispatch } from "react-redux";
import { addMenuOption } from "../../Redux/actions";

export default function ProfileDashboard() {
  const [selectedTopic, setSelectedTopic] = useState("Purchases");
  const dispatch = useDispatch();
  const handleTopic = (topic) => {
    setSelectedTopic(topic);
  };
  let menuOption = useSelector((state) => state.menuOption);
  useEffect(() => {
    if (!menuOption) {
      menuOption = "Profile";
      handleTopic(menuOption);
    }
    handleTopic(menuOption);
  }, []);
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.col1}>
          <div className={styles.topics}>
            <button
              className={
                menuOption === "Purchases" ? styles.selectedTopic : styles.topic
              }
              onClick={() => dispatch(addMenuOption("Purchases"))}
            >
              <img
                src="https://img.icons8.com/ios/50/paid--v1.png"
                alt="Cart icon"
                className={styles.img}
              />
              Purchases
            </button>
            <button
              className={
                menuOption === "Profile" ? styles.selectedTopic : styles.topic
              }
              onClick={() => dispatch(addMenuOption("Profile"))}
            >
              <img
                src="https://img.icons8.com/material-outlined/24/admin-settings-male.png"
                alt="Profile Icon"
                className={styles.img}
              />
              My profile
            </button>
            <button
              className={
                menuOption === "Reviews"
                  ? styles.selectedTopic
                  : styles.topic
              }
              onClick={() => dispatch(addMenuOption("Reviews"))}
            >
              <img
                src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/external-rating-ecommerce-xnimrodx-lineal-xnimrodx-3.png"
                alt="Review icon"
                className={styles.img}
              />
              Reviews
            </button>
            <button
              className={
                menuOption === "Posts" ? styles.selectedTopic : styles.topic
              }
              onClick={() => dispatch(addMenuOption("Posts"))}
            >
              <img
                src="https://img.icons8.com/ios/50/paid--v1.png"
                alt="Cart icon"
                className={styles.img}
              />
              Posts
            </button>
          </div>
        </div>
        <div className={styles.col2}>
          <div className={styles.col2a}>
            {menuOption === "Purchases" && (
              <div className={styles.cart}>
                <div className={styles.carthistory}>
                  <CartHistory />
                </div>
              </div>
            )}
            {menuOption === "Profile" && (
              <div className={styles.myProfile}>
                <Modification />
              </div>
            )}
            {menuOption === "Reviews" && (
              <div className={styles.reviews}>
                <Reviews />
              </div>
            )}
            {menuOption === "Posts" && (
              <div className={styles.reviews}>
                <Posts />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
