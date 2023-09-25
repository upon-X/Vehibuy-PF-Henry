import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getDetail, resetDetail, addToCart, deleteProduct } from '../../../Redux/actions';
import styles from './Detail.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonBack } from '../../../assets/svgs'
import { CarRemovedFromCart, CarAddedToCart } from '../../NotiStack';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Review from './Review/Review';
import Swal from "sweetalert2";
import { addToFav, removeFromFav } from "../../../Redux/actions";
import { verifyDeleteFav } from "../../NotiStack";

export default function Detail() {

    const { id } = useParams();
    const dispatch = useDispatch();

    const detail = useSelector((state) => state.detail);
    const cartList = useSelector((state) => state.cartList);
    const myFavorites = useSelector((state) => state.favorites);

    const [isFav, setIsFav] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const mainSliderRef = useRef(null);
    const secondSliderRef = useRef(null);

    useEffect(() => {
        console.log(detail)
        myFavorites.forEach((fav) => {
            if (fav.id === id) {
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
                    dispatch(removeFromFav(id));
                    verifyDeleteFav();// Mover la actualización de setIsFav aquí
                    setIsFav(false);
                } else {
                    setIsFav(true);
                }
            });
        } else {
            setIsFav(true);
            dispatch(addToFav({
                id: detail.id,
                name: detail.name,
                state: detail.state,
                price: detail.price,
                image: detail.image,
                location: detail.location
            }));
        }
    };

    const toggleFav = () => {
        setIsFav(!isFav);
    };

    useEffect(() => {
        dispatch(getDetail(id));
        return () => {
            dispatch(resetDetail());
        };
    }, [id, dispatch]);

    const isInCart = () => {
        return cartList.some((product) => product.id === id);
    };

    const handleAddToCart = () => {
        if (!isInCart()) {
            dispatch(addToCart(detail));
            CarAddedToCart()
        }
    };

    const formatPrice = (price) => {
        return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
    };

    const handleThumbnailClick = (index) => {
        mainSliderRef.current.slickGoTo(index);
        setSelectedImage(index);
    };

    const settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false,
        // autoplay: true,
        // autoplaySpeed: 2000,
        beforeChange: (current, next) => {
            if (current === 4 && next === 0) {
                mainSliderRef.current.slickGoTo(next);
            }
            mainSliderRef.current.slickGoTo(next);
        },
        afterChange: (index) => {
            setSelectedImage(index);
        },
    };
    return (
        <div className={styles.detail}>
            <Link to={"/home"}><ButtonBack /></Link>
            <div className={styles.detail_card}>
                <div className={`${styles.carrousel_img} ${styles.custom_carrousel}`}>
                    <div ref={secondSliderRef} className={styles.selected_imgs}>
                        {detail.image &&
                            detail.image.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <img className={index === selectedImage ? styles.selected_image : styles.carrousel_img2} src={img} alt={`Image ${index}`} />
                                </div>
                            ))}
                    </div>
                </div>
                <div className={`${styles.carrousel_img} ${styles.custom_carrousel}`}>
                    <Slider {...settings} ref={mainSliderRef} initialSlide={selectedImage} className={styles.border_img}>
                        {detail.image &&
                            detail.image.map((img, index) => (
                                <div key={index} >
                                    <img className={styles.carrousel_img1} src={img} alt={`Image ${index}`} />
                                </div>
                            ))}
                    </Slider>
                </div>
                <div className={styles.detail_info}>
                    <h1 className={`${styles.h1_detail} ${styles.detail_name}`}>{detail.name && detail.name}</h1>
                    <div className={styles.brandAndState}>
                        <span className={`${styles.h1_detail} ${styles.detail_brand}`}>{detail.brand && detail.brand} {detail.model && detail.model}</span> <br />
                        <span className={`${styles.h1_detail} ${styles.detail_state}`}>{detail.state && detail.state}</span>
                    </div>
                    <h3 className={`${styles.h1_detail} ${styles.detail_price}`}>$ {formatPrice(detail.price)} USD</h3>
                    <p className={styles.pf}>At Vehibuy, we will never ask you for passwords, PINs or verification codes through WhatsApp, phone, SMS or email.</p>
                    <div className={styles.buttonsAddAndFav}>
                        <button className={styles.btn_addcart} onClick={handleAddToCart}>
                            ADD TO CART
                        </button>
                        <div onClick={toggleFav}>
                            <button className={styles.btn_addcart2} onClick={handleFavorite}>
                                {isFav ? "★" : "☆"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.descriptionAndReview}>
                    <div className={styles.locationcolor}>
                        <div className={styles.description_car}>
                            <h2 className={`${styles.h1_detail} ${styles.detail_description}`}>Description:</h2>
                            <p className={styles.description}> {detail.description && detail.description}</p>
                            <p className={styles.detail_location}>
                                This car is located in{' '}
                                <span className={styles.atributes}>
                                    <Link
                                        to={`https://www.google.com/maps/search/${encodeURIComponent(detail.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linktolocation}
                                        style={{ display: 'inline' }}
                                    >
                                        {detail.location && detail.location}
                                    </Link>
                                </span>
                                {' '}and color{' '}
                                <span className={styles.atributes}>
                                    {detail.color && detail.color}
                                </span>
                                .
                            </p>
                        </div>
                    </div>
                    <div className={styles.security}>
                        <div>
                            <h3>Security advice ⚠️</h3>
                        </div>
                        <div className={styles.ul}>
                            <ul>
                                <li>Do not use anonymous payment services (e.g. Western Union), or send money abroad.</li>
                                <li>Do not pay without personally verifying the documentation and condition of the vehicle.</li>
                                <li>Be wary of offers below the market price.</li>
                                <li>At vehibuy we are here to help you choose your next car, contact us through our media!</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Review />
        </div >
    )
}