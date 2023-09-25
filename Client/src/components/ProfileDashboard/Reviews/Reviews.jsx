import React, { useEffect } from 'react'
import styles from './Reviews.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { getReviewsByUserId, resetReviewByUser } from '../../../Redux/actions';
import { Link } from 'react-router-dom';
import NOTCARS from "../../Cart/Icons/NOTCARS.png";


export default function Reviews() {
    const reviewsByUserId = useSelector((state) => state.reviewsByUserId)
    const dispatch = useDispatch()
    const loggedUserJson = localStorage.getItem("authToken");
    const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;
    const idUser = loggedUser?.response?.id

    useEffect(() => {
        dispatch(getReviewsByUserId(idUser))
    }, [idUser])

    return (
        <>
            {reviewsByUserId.length > 0 ?
                <div className={styles.mainContainer}>
                    <div className={styles.cart}>
                        {reviewsByUserId && [...reviewsByUserId].reverse().map((review, index) => (
                            <div key={index} className={styles.car_i}>
                                <Link className={styles.link_imgcar} to={`/detail/${review.Car.id}`}>
                                    <img src={review.Car.image[0]} alt="imgCar" className={styles.car_img} /><br />
                                </Link>
                                <div className={styles.name_and_brand}>
                                    <span>{review.Car.name}</span><br />
                                    <span>{review.Car.brand}</span><br />
                                </div>
                                <div className={styles.reviewInfo}>
                                    <div className={styles.star}>
                                        {[...Array(review.rating)].map((star, i) => {
                                            return (
                                                <label className={styles.star_label} key={i} >{i + 1 <= review.rating ? <AiFillStar /> : <AiOutlineStar />}</label>
                                            );
                                        })}
                                    </div>
                                    <span className=''>{review.title}</span><br />
                                    <span >{review.review}</span><br />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className={styles.noreviews}>
                    <h1 className={styles.review_title}>Your Reviews</h1>
                    <div className={styles.notReviews}>
                        <div>
                            <img src={NOTCARS} alt="Not Cars..." />
                        </div>
                        <div>
                            <h2>No reviews yet!</h2>
                            <p>Go to your purchased cars and post one</p>
                            <Link to="/publish-your-car" className={styles.publish}>
                                <button>
                                    Post Review
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}