import React from "react";
import LOGO_NV from "./Icons/LOGO_NV.png";
import styles from "./Footer.module.css";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.containerLeft}>
          <div>
            <div className={styles.footer_icon_company}>
              <img className={styles.logo} src={LOGO_NV} alt="Logo..." />
              <p>VehiBuy</p>
            </div>
            <span>
              Elevating Driving Luxury. Discover a curated selection of
              exquisite luxury cars that redefine elegance and performance.
              Explore the epitome of automotive refinement with Elegance Motors.
            </span>
          </div>
        </div>
        <div className={styles.containerList}>
          <p>Our Service</p>
          <ul>
            <Link to={"/termsAndConditions"}>
              <li>Terms & Conditions</li>
            </Link>
            <Link to={"/about"}>
              <li>About Us</li>
            </Link>
          </ul>
        </div>
        <div className={styles.containerList}>
          <p>Company</p>
          <ul>
            <Link to={"https://wa.link/bu5p4z"}>
              <li>
                <b>Tel: </b>+54 3498 436701
              </li>
            </Link>
            <a href="mailto:vehibuy@vehibuy.com">
              <li>
                <b>Email: </b>vehibuy@vehibuy.com
              </li>
            </a>
            <Link to={"https://wa.link/bu5p4z"}>
              <li>
                <b>WhatsApp: </b>+54 3498 437601
              </li>
            </Link>
            <a href="https://www.youtube.com/watch?v=mmzn77xOCe0">
              <li>Youtube</li>
            </a>
          </ul>
        </div>
        <div className={styles.containerList}>
          <p>Q&A</p>
          <ul>
            <Link to={"/termsAndConditions"}>
              <li>How to buy</li>
            </Link>
            <Link to={"/termsAndConditions"}>
              <li>Warranty</li>
            </Link>
            <Link to={"/termsAndConditions"}>
              <li>Shipping time</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className={styles.containerSecond}>
        <div>
          <p>Copyrigth ® 2023 | vehiBuy</p>
        </div>
      </div>
    </div>
  );
}
