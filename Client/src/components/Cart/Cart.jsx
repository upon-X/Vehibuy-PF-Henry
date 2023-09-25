import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, purchaseProducts, setCart } from "../../Redux/actions";
import { CarRemovedFromCart, MercadoPagoFail, NeedToLogin } from "../NotiStack";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import NOTCARS from "./Icons/NOTCARS.png";
import DELETE from "./Icons/DELETE.png";
import axios from "axios";
import Swal from "sweetalert2";

export default function Cart() {

  const cartList = useSelector((state) => state.cartList);
  const purchasedProducts = useSelector((state) => state.purchasedProducts);
  const dispatch = useDispatch();

  const [preferenceId, setPreferenceId] = useState(null);
  const [showMercadoPago, setShowMercadoPago] = useState(false);
  
  const removeFromCart = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: "No, keep it",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(productId));
        CarRemovedFromCart();
        updateCartStateAndLocalStorage(cartList.filter((item) => item.id !== productId));
      }
    });
  };
  // initMercadoPago('TEST-620ddc2a-2dd8-487a-a99e-61892333c8d0');
  initMercadoPago("TEST-ff5e06a0-15c1-4054-b8bf-9ad68b31499b");

  const updateCartStateAndLocalStorage = (updatedCart) => {
    dispatch(setCart(updatedCart)); // Actualiza el estado en Redux
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guarda en localStorage
  };

  const createPreference = async () => {
    try {
      const items = await cartList.map((product) => ({
        title: `${product.name}, ${product.brand}`,
        unit_price: product.price,
        quantity: 1,
      }));
      const currentDate = new Date().toISOString();
      console.log(items);
      const response = await axios.post(
        "/create_preference/",
        { items, date: currentDate }
      );
      const { id } = response.data;
      console.log(id);
      console.log(response);
      localStorage.setItem("transactionStatus", "success");
      const storedCart = localStorage.getItem("cart");
      const parsedCart = JSON.parse(storedCart);
      const purchasedProductsMap = parsedCart.map((car) => car.id);
      const purchasedProductsName = parsedCart.map((car) => car.name);
      const subPrice = totalPrice();
      localStorage.setItem("subPrice", JSON.stringify(subPrice));
      localStorage.setItem(
        "purshasedCars",
        JSON.stringify(purchasedProductsMap)
      );
      localStorage.setItem(
        "purchasedProductsName",
        JSON.stringify(purchasedProductsName)
      );
      return id;
    } catch (error) {
      console.error(error);
      localStorage.setItem("transactionStatus", "fail");
    }
  };

  const totalPrice = () => {
    return cartList.reduce((total, product) => {
      const productPrice = Number(product.price); // Convert price to number
      return total + productPrice;
    }, 0);
  };

  const isLogged = () => {
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    return userId && userType;
  };

  const handleBuy = async (event) => {
    event.preventDefault();
    if (!isLogged()) {
      NeedToLogin();
    } else {
      try {
        dispatch(purchaseProducts(cartList));
        console.log(purchasedProducts);
        const id = await createPreference();
        if (id) {
          setPreferenceId(id);
          setShowMercadoPago(true);
        }
      } catch (error) {
        console.error("Error al procesar la compra:", error);
      }
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    // Carga el carrito desde localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      dispatch(setCart(parsedCart));
    }
    // Luego se guarda en el carrito en localStorage cada vez que el carrito cambie
    localStorage.setItem("cart", JSON.stringify(cartList));
    const transactionStatus = localStorage.getItem("transactionStatus");
    // Comprueba el estado de la compra y muestra la notificación adecuada
    if (transactionStatus === "success") {
    } else if (transactionStatus === "fail") {
      MercadoPagoFail();
    }
    localStorage.removeItem("transactionStatus");
  }, [dispatch]);
  return (
    <>
      {cartList.length === 0 ? (
        <div className={styles.nocars}>
          <h2 className={styles.cart_title}>Your Cart</h2>
          <div className={styles.notCars}>
            <div>
              <img src={NOTCARS} alt="Not Cars..." />
            </div>
            <div>
              <h2>No cars yet!</h2>
              <p>Add the cars you want to purchase</p>
              <Link to="/home" className={styles.keeplooking}>
                <button>
                  Keep looking
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.cart}>
          <div>
            <h1 className={styles.cart_title}>Your Cart</h1>
          </div>
          <div className={styles.products_detail}>
            <div className={styles.products}>
              <div className={styles.topics}>
                <h3 className={styles.topic_product}>PRODUCT</h3>
                <h3 className={styles.topic_price}>PRICE</h3>
              </div>
              {cartList.map((product) => (
                <div className={styles.car_i} key={product.name}>
                  <div className={styles.delete}>
                    <div
                      className={styles.delete_btn}
                      onClick={() => removeFromCart(product.id)}
                    >
                      <img src={DELETE} alt="Delete..." />
                    </div>
                  </div>
                  <Link
                    className={styles.link_imgcar}
                    to={`/detail/${product.id}`}
                  >
                    {product.image && product.image[0] && (
                      <img
                        className={styles.car_img}
                        src={product.image[0]}
                        alt="Car..."
                      />
                    )}
                  </Link>
                  <div className={styles.name_and_brand}>
                    <div>
                      <h3>{product.name} {product.model}</h3>
                    </div>
                    <div>
                      <p>{product.brand}</p>
                    </div>
                  </div>
                  <div className={styles.price}>
                    <h3 className={styles.car_price}>
                      $ {formatPrice(product.price)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detail_info}>
            <p className={styles.subtotal}>Subtotal: <span className={styles.subPrice}> {' '} $ {formatPrice(totalPrice())} USD</span></p>
              {showMercadoPago ? (   
                <div>
                  {preferenceId && <Wallet initialization={{ preferenceId }} />}
                </div>
              ) : (
                <button className={styles.btn_buy} onClick={handleBuy}>
                  FINISH ORDER
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
