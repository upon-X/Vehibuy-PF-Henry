import React, { useState, useEffect } from 'react'
import styles from './Posts.module.css'
import axios from 'axios';
import NOTCARS from "../../Cart/Icons/NOTCARS.png";
import { Link } from 'react-router-dom';
import { applyFilters, deleteCarWithID } from "../../../Redux/actions";
import TRASH from "../../Dashboard/Email/Icons/TRASH.svg";
import EDIT from "../../Dashboard/Email/Icons/EDIT.svg";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';

export default function Posts() {
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch();
    const loggedUserJson = localStorage.getItem("authToken");
    const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;
    const userId = loggedUser?.response?.id

    console.log(userId, "Estoy en post");

    const getPosts = async (userId) => {
        try {
            const endpoint = "/car/user/";
            const { data } = await axios.get(`${endpoint}${userId}`);
            setPosts(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        try {
            getPosts(userId);
        } catch (error) {
            console.log(error);
        }
    }, [posts]);
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };

      const handleDeletedCar = async (id) => {
        Swal.fire({
        title: "¿Are you sure?",
        text: `You are about to delete ${name} from the database`,
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Accept",
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteCarWithID(id));
            dispatch(applyFilters("originCars"));
        }
    });
};

    return (
        <div>
            {posts.length > 0 ?
                // <div className={styles.posts}>
                //     <h2 className={styles.post_title}>Your Posts</h2>
                //     {posts.map((car, index) => (
                //         <img style={{ width: 60 }} src={car.image[0]} key={index} />
                    //     ))}
            <div className={styles.cart}>
              <div className={styles.products_detail}>
                <div className={styles.products}>
                  <div className={styles.topics}>
                    <h3 className={styles.topic_product}>PRODUCT</h3>
                    <h3 className={styles.topic_price}>PRICE</h3>
                  </div>
                  {posts.map((product) => (
                    <div className={styles.car_i} key={product.name}>
                      <div className={styles.delete}>
                        <div
                          className={styles.delete_btn}
                        >
                            <button className={styles.del} onClick={() => handleDeletedCar(product.id)}>
                            <img className={styles.img} src={TRASH} alt="Icon..." title="Delete Post" />
                            </button>
                            <Link to={`/user/edit/${product.id}`} >
                            <button className={styles.edit}>
                            <img className={styles.img} src={EDIT} alt="Icon..." title="Edit Post" />
                            </button>
                            </Link>
                          {/* <img src={DELETE} alt="Delete..." /> */}
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
                    </div>
                    :
                    <div className={styles.noposts}>
                        <h1 className={styles.post_title}>Your Posts</h1>
                        <div className={styles.notPosts}>
                            <div>
                                <img src={NOTCARS} alt="Not Cars..." />
                            </div>
                            <div>
                                <h2>No posts yet!</h2>
                                <p>Publish your car to show it on our catalogue</p>
                                <Link to="/publish-your-car" className={styles.publish}>
                                    <button>
                                        Publish
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
        </div>
    )   
}   