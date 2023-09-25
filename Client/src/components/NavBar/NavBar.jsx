import React from "react";
import LOGO from "./Icons/LOGO.svg";
import CART from "./Icons/CART.svg";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { addMenuOption, addDashboardOption } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { logOutUserSuccess } from "../NotiStack";
import { changeDarkMode } from "../../Redux/actions.js";

export default function NavBar() {
  //______________DarkMode__________________________________
  const handleModeChange = () => {
    dispatch(changeDarkMode());
    document.body.classList.toggle("darkMode");
    console.log(darkMode);
  };
  const darkMode = useSelector((state) => state.darkMode);
  //________________________________________________________
  const dispatch = useDispatch();
  const location = useLocation();

  const [user, setUser] = useState([]);

  const cartList = useSelector((state) => state.cartList);
  const itemCount = cartList.length;

  const loggedUserJson = localStorage.getItem("authToken");
  const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;

  useEffect(() => {
    const loggedUserJson = localStorage.getItem("authToken");
    const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;
    setUser(loggedUser?.response || []);
  }, []);

  const handleLogout = () => {
    setUser([]);
    localStorage.clear();
    logOutUserSuccess();
  };

  useEffect(() => {
    handleLogout;
    console.log(loggedUser);
    const userInfoFn = async () => {
      try {
        const { data } = await axios.get(`/user/${loggedUser.response.id}`);
        setUser(data);
      } catch (error) {
        console.log(
          `The request could not be completed because of the following error: ${error.message}`
        );
      }
    };
    userInfoFn();
  }, [location.pathname]);

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div>
        <Link to={"/"}>
          <img className={styles.logo} src={LOGO} alt="Logo..." />
        </Link>
      </div>
      {location.pathname === "/" && (
        <div className={styles.containerL}>
          <div>
            {/* Código para la barra de navegación */}
            <label className={`${styles.switch} ${styles.switchRight}`}>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleModeChange}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
          {!loggedUser ? (
            <>
              <Link to={"/login"}>
                <button className={styles.button}>Log in</button>
              </Link>
              <Link to={"/register"}>
                <button className={styles.button}>Register</button>
              </Link>
            </>
          ) : (
            <>
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdown}>
                  <div className={styles.icon_name_user}>
                    <img
                      src={user?.image}
                      alt=""
                      className={styles.iconImage}
                    />{" "}
                    <button className={styles.buttonDropdown}>
                      {user?.name} &#9660;{" "}
                      {/* Agregamos una flecha hacia abajo para indicar que es desplegable */}
                    </button>
                  </div>
                  <div className={styles.dropdownContent}>
                    {/* Aquí agregamos las opciones del menú */}
                    <Link to="/publish-your-car">Publish car</Link>
                    <Link
                      onClick={() => dispatch(addMenuOption("Purchases"))}
                      to="/profile"
                    >
                      My Purchases
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => dispatch(addMenuOption("Profile"))}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => dispatch(addMenuOption("Reviews"))}
                    >
                      My Reviews
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => dispatch(addMenuOption("Posts"))}
                    >
                      My Posts
                    </Link>
                    {loggedUser.response?.type === "admin" && (
                      <Link
                        to={"/admin/dashboard"}
                        onClick={() => dispatch(addDashboardOption("USERS"))}
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link to={"/"} onClick={handleLogout}>
                      Log out
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {location.pathname === "/home" && (
        <>
          <div className={styles.containerLP}>
            <div>
              <Link to={"/home"}>
                <button className={styles.button}>Home</button>
              </Link>
              <Link to={"/about"}>
                <button className={styles.button}>Contacts</button>
              </Link>
              <Link to={"/favorites"}>
                <button className={styles.button}>Favorites</button>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.containerL}>
              <div>
                {/* Código para la barra de navegación */}
                <label className={`${styles.switch} ${styles.switchRight}`}>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={handleModeChange}
                  />
                  <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
              </div>
              {loggedUser && (
                <>
                  <div className={styles.dropdownContainer}>
                    <div className={styles.dropdown}>
                      <div className={styles.icon_name_user}>
                        <img
                          src={user?.image}
                          alt=""
                          className={styles.iconImage}
                        />{" "}
                        <button className={styles.buttonDropdown}>
                          {user?.name} &#9660;{" "}
                          {/* Agregamos una flecha hacia abajo para indicar que es desplegable */}
                        </button>
                      </div>
                      <div className={styles.dropdownContent}>
                        {/* Aquí agregamos las opciones del menú */}
                        <Link to="/publish-your-car">Publish car</Link>
                        <Link
                          onClick={() => dispatch(addMenuOption("Purchases"))}
                          to="/profile"
                        >
                          Purchases
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Profile"))}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Reviews"))}
                        >
                          Reviews
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Posts"))}
                        >
                          My Posts
                        </Link>
                        {loggedUser.response?.type === "admin" && (
                          <Link
                            to={"/admin/dashboard"}
                            onClick={() =>
                              dispatch(addDashboardOption("USERS"))
                            }
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link to={"/"} onClick={handleLogout}>
                          Log out
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!loggedUser && (
                <>
                  <Link to={"/login"}>
                    <button className={styles.button}>Log in</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className={styles.button}>Register</button>
                  </Link>
                </>
              )}
              <Link to="/cart">
                <div className={styles.cartIconContainer}>
                  <img className={styles.icons} src={CART} alt="Cart..." />
                  {itemCount > 0 && (
                    <div className={styles.itemCountCircle}>{itemCount}</div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/cart" && (
        <>
          <div className={styles.containerLP}>
            <div>
              <Link to={"/home"}>
                <button className={styles.button}>Home</button>
              </Link>
              <Link to={"/about"}>
                <button className={styles.button}>Contacts</button>
              </Link>
              <Link to={"/favorites"}>
                <button className={styles.button}>Favorites</button>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.containerL}>
              {loggedUser && (
                <>
                  <div className={styles.dropdownContainer}>
                    <div className={styles.dropdown}>
                      <div className={styles.icon_name_user}>
                        <img
                          src={user.image}
                          alt=""
                          className={styles.iconImage}
                        />{" "}
                        <button className={styles.buttonDropdown}>
                          {user.name} &#9660;{" "}
                          {/* Agregamos una flecha hacia abajo para indicar que es desplegable */}
                        </button>
                      </div>
                      <div className={styles.dropdownContent}>
                        {/* Aquí agregamos las opciones del menú */}
                        <Link to="/publish-your-car">Publish car</Link>
                        <Link
                          onClick={() => dispatch(addMenuOption("Purchases"))}
                          to="/profile"
                        >
                          Purchases
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Profile"))}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Reviews"))}
                        >
                          Reviews
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Posts"))}
                        >
                          My Posts
                        </Link>
                        {loggedUser.response?.type === "admin" && (
                          <Link
                            to={"/admin/dashboard"}
                            onClick={() =>
                              dispatch(addDashboardOption("USERS"))
                            }
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link to={"/"} onClick={handleLogout}>
                          Log out
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!loggedUser && (
                <>
                  <Link to={"/login"}>
                    <button className={styles.button}>Log in</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className={styles.button}>Register</button>
                  </Link>
                </>
              )}
              <Link to="/cart">
                <div className={styles.cartIconContainer}>
                  <img className={styles.icons} src={CART} alt="Cart..." />
                  {itemCount > 0 && (
                    <div className={styles.itemCountCircle}>{itemCount}</div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      {location.pathname.startsWith("/detail/") && (
        <>
          <div className={styles.containerLP}>
            <div>
              <Link to={"/home"}>
                <button className={styles.button}>Home</button>
              </Link>
              <Link to={"/about"}>
                <button className={styles.button}>Contacts</button>
              </Link>
              <Link to={"/favorites"}>
                <button className={styles.button}>Favorites</button>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.containerL}>
              {loggedUser && (
                <>
                  <div className={styles.dropdownContainer}>
                    <div className={styles.dropdown}>
                      <div className={styles.icon_name_user}>
                        <img
                          src={user.image}
                          alt=""
                          className={styles.iconImage}
                        />{" "}
                        <button className={styles.buttonDropdown}>
                          {user.name} &#9660;{" "}
                          {/* Agregamos una flecha hacia abajo para indicar que es desplegable */}
                        </button>
                      </div>
                      <div className={styles.dropdownContent}>
                        {/* Aquí agregamos las opciones del menú */}
                        <Link to="/publish-your-car">Publish car</Link>
                        <Link
                          onClick={() => dispatch(addMenuOption("Purchases"))}
                          to="/profile"
                        >
                          Purchases
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Profile"))}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Reviews"))}
                        >
                          Reviews
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Posts"))}
                        >
                          My Posts
                        </Link>
                        {loggedUser.response?.type === "admin" && (
                          <Link
                            to={"/admin/dashboard"}
                            onClick={() =>
                              dispatch(addDashboardOption("USERS"))
                            }
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link to={"/"} onClick={handleLogout}>
                          Log out
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!loggedUser && (
                <>
                  <Link to={"/login"}>
                    <button className={styles.button}>Log in</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className={styles.button}>Register</button>
                  </Link>
                </>
              )}
              <Link to="/cart">
                <div className={styles.cartIconContainer}>
                  <img className={styles.icons} src={CART} alt="Cart..." />
                  {itemCount > 0 && (
                    <div className={styles.itemCountCircle}>{itemCount}</div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/favorites" && (
        <>
          <div className={styles.containerLP}>
            <div>
              <Link to={"/home"}>
                <button className={styles.button}>Home</button>
              </Link>
              <Link to={"/about"}>
                <button className={styles.button}>Contacts</button>
              </Link>
              <Link to={"/favorites"}>
                <button className={styles.button}>Favorites</button>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.containerL}>
              {loggedUser && (
                <>
                  <div className={styles.dropdownContainer}>
                    <div className={styles.dropdown}>
                      <div className={styles.icon_name_user}>
                        <img
                          src={user.image}
                          alt=""
                          className={styles.iconImage}
                        />{" "}
                        <button className={styles.buttonDropdown}>
                          {user.name} &#9660;{" "}
                          {/* Agregamos una flecha hacia abajo para indicar que es desplegable */}
                        </button>
                      </div>
                      <div className={styles.dropdownContent}>
                        {/* Aquí agregamos las opciones del menú */}
                        <Link to="/publish-your-car">Publish car</Link>
                        <Link
                          onClick={() => dispatch(addMenuOption("Purchases"))}
                          to="/profile"
                        >
                          Purchases
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Profile"))}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Reviews"))}
                        >
                          Reviews
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Posts"))}
                        >
                          My Posts
                        </Link>
                        {loggedUser.response?.type === "admin" && (
                          <Link
                            to={"/admin/dashboard"}
                            onClick={() =>
                              dispatch(addDashboardOption("USERS"))
                            }
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link to={"/"} onClick={handleLogout}>
                          Log out
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!loggedUser && (
                <>
                  <Link to={"/login"}>
                    <button className={styles.button}>Log in</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className={styles.button}>Register</button>
                  </Link>
                </>
              )}
              <Link to="/cart">
                <div className={styles.cartIconContainer}>
                  <img className={styles.icons} src={CART} alt="Cart..." />
                  {itemCount > 0 && (
                    <div className={styles.itemCountCircle}>{itemCount}</div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/profile" && (
        <>
          <div className={styles.containerLP}>
            <div>
              <Link to={"/home"}>
                <button className={styles.button}>Home</button>
              </Link>
              <Link to={"/about"}>
                <button className={styles.button}>Contacts</button>
              </Link>
              <Link to={"/favorites"}>
                <button className={styles.button}>Favorites</button>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.containerL}>
              {loggedUser && (
                <>
                  <div className={styles.dropdownContainer}>
                    <div className={styles.dropdown}>
                      <div className={styles.icon_name_user}>
                        <img
                          src={user?.image}
                          alt=""
                          className={styles.iconImage}
                        />{" "}
                        <button className={styles.buttonDropdown}>
                          {user?.name} &#9660;{" "}
                          {/* Agregamos una flecha hacia abajo para indicar que es desplegable */}
                        </button>
                      </div>
                      <div className={styles.dropdownContent}>
                        {/* Aquí agregamos las opciones del menú */}
                        <Link to="/publish-your-car">Publish car</Link>
                        <Link
                          onClick={() => dispatch(addMenuOption("Purchases"))}
                          to="/profile"
                        >
                          Purchases
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Profile"))}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Reviews"))}
                        >
                          Reviews
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Posts"))}
                        >
                          My Posts
                        </Link>
                        {loggedUser.response?.type === "admin" && (
                          <Link
                            to={"/admin/dashboard"}
                            onClick={() =>
                              dispatch(addDashboardOption("USERS"))
                            }
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link to={"/"} onClick={handleLogout}>
                          Log out
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!loggedUser && (
                <>
                  <Link to={"/login"}>
                    <button className={styles.button}>Log in</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className={styles.button}>Register</button>
                  </Link>
                </>
              )}
              <Link to="/cart">
                <div className={styles.cartIconContainer}>
                  <img className={styles.icons} src={CART} alt="Cart..." />
                  {itemCount > 0 && (
                    <div className={styles.itemCountCircle}>{itemCount}</div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/about" && (
        <>
          <div className={styles.containerLP}>
            <div>
              <Link to={"/home"}>
                <button className={styles.button}>Home</button>
              </Link>
              <Link to={"/about"}>
                <button className={styles.button}>Contacts</button>
              </Link>
              <Link to={"/favorites"}>
                <button className={styles.button}>Favorites</button>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.containerL}>
              {loggedUser && (
                <>
                  <div className={styles.dropdownContainer}>
                    <div className={styles.dropdown}>
                      <div className={styles.icon_name_user}>
                        <img
                          src={user.image}
                          alt=""
                          className={styles.iconImage}
                        />{" "}
                        <button className={styles.buttonDropdown}>
                          {user.name} &#9660;{" "}
                          {/* Agregamos una flecha hacia abajo para indicar que es desplegable */}
                        </button>
                      </div>
                      <div className={styles.dropdownContent}>
                        {/* Aquí agregamos las opciones del menú */}
                        <Link to="/publish-your-car">Publish car</Link>
                        <Link
                          onClick={() => dispatch(addMenuOption("Purchases"))}
                          to="/profile"
                        >
                          Purchases
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Profile"))}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Reviews"))}
                        >
                          Reviews
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(addMenuOption("Posts"))}
                        >
                          My Posts
                        </Link>
                        {loggedUser.response?.type === "admin" && (
                          <Link
                            to={"/admin/dashboard"}
                            onClick={() =>
                              dispatch(addDashboardOption("USERS"))
                            }
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link to={"/"} onClick={handleLogout}>
                          Log out
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!loggedUser && (
                <>
                  <Link to={"/login"}>
                    <button className={styles.button}>Log in</button>
                  </Link>
                  <Link to={"/register"}>
                    <button className={styles.button}>Register</button>
                  </Link>
                </>
              )}
              <Link to="/cart">
                <div className={styles.cartIconContainer}>
                  <img className={styles.icons} src={CART} alt="Cart..." />
                  {itemCount > 0 && (
                    <div className={styles.itemCountCircle}>{itemCount}</div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
      {location.pathname === "/login" ||
        (location.pathname === "/register" && null)}
    </div>
  );
}
