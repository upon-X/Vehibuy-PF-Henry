import style from "./FormUserModification.module.css";
import React from "react";
import { useState, useEffect } from "react";
import validation from "../Validation/validationModification";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ButtonBack } from "../../../assets/svgs";
import {
  modificationUserSuccess,
  uploadImageFail,
  uploadImageSuccess,
} from "../../NotiStack";
import { OpenEye, ClosedEye } from "../../LoginRegister/svgs.jsx";
import UserImage from "./UserImage";
import Swal from "sweetalert2";

export default function FormUserModification({ id, image }) {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [user, setUser] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [input, setInput] = useState({
    id,
    name: "",
    lastName: "",
    age: "",
    tel: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [error, setError] = useState({
    name: "",
    lastName: "",
    age: "",
    tel: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleChange = (event) => {
    const {name, value} = event.target
    setInput({
      ...input,
      [name]: value,
    });
    // The form is validated and the local error status is updated with the corresponding validation error messages.
    setError(
      validation({
        ...input,
        [name]: value,
      })
    );
  };

  // Function to check for errors in the error state
  const hasErrors = () => {
    for (const key in error) {
      if (error[key] !== "") {
        // There is a non-empty error message
        return true;
      }
    }
    // No non-empty error messages found
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create a copy of the current input object to send to the server
      let updatedInput = { ...input };
      const { data } = await axios.put(`/user/${id}`, updatedInput);
      modificationUserSuccess();
      navigate("/home");
    } catch (error) {
      console.error(error.message)
    }
  };

  const handleCancelClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Changes will not be updated!",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: "No, stay here",
      confirmButtonText: "Yes, cancel update!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/home');
        processCancelSuccess();
      }
    });
  };

  //api countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get("https://restcountries.com/v3.1/all"); // Endpoint para obtener todos los países
        const countryNames = data.map((country) => country.name.common);
        // Ordena los países alfabéticamente de A-Z
        countryNames.sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const userInfoFn = async () => {
      try {
        const { data } = await axios.get(`/user/${id}`);
        setUser(data);
      } catch (error) {
        console.error(error.message)
      }
    };
    userInfoFn();
  }, [id]);

  return (
    <div className={style.login}>
      <div className={style.register_form}>
        <form onSubmit={handleSubmit} className={style.form_in}>
          <div className={style.divCenter}>
            <h1 className={style.title_register}>Update</h1>

          {image ? (
            <img src={image} alt="" className={style.iconImage} />
          ) : (
            <img src={user?.image} alt="" className={style.iconImage} />
          )}

            <UserImage />
            </div>

          <label htmlFor="name" className={style.label_name}>
            Name: <br />
            <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
              className={style.input}
              placeholder={user?.name}
            />
            {/* Show error message if exists*/}
            {error.name && <p className={style.errors}>{error.name}</p>}
          </label>

          <label htmlFor="lastName" className={style.label_lastName}>
            Last Name: <br />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={input.lastName}
              onChange={handleChange}
              className={style.input}
              placeholder={user?.lastName}
            />
            {/* Show error message if exists*/}
            {error.lastName && <p className={style.errors}>{error.lastName}</p>}
          </label>

          <label htmlFor="age" className={style.label_age}>
            Age: <br />
            <input
              type="text"
              id="age"
              name="age"
              value={input.age}
              onChange={handleChange}
              className={style.input}
              placeholder={user?.age}
            />
            {/* Show error message if exists*/}
            {error.age && <p className={style.errors}>{error.age}</p>}
          </label>

          <label htmlFor="tel" className={style.label_tel}>
            Phone: <br />
            <input
              type="text"
              id="tel"
              name="tel"
              value={input.tel}
              maxLength={14}
              onChange={handleChange}
              className={style.input}
              placeholder={user?.tel}
            />
            {/* Show error message if exists*/}
            {error.tel && <p className={style.errors}>{error.tel}</p>}
          </label>

          <div className={style.largeinput}>
            <label className={style.label_country}>
              Country: <br />
              <select
                className={style.input_country}
                id="country"
                name="country"
                onChange={(e) => handleChange(e)}
              >
                <option hidden>{user?.country}</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={style.largeinput}>
            <label htmlFor="password" className={style.label_password}>
              Password: <br />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                className={style.input_password2}
              />
            </label>
            <div className={style.btn_hideandshow}>
              <button
                type="button"
                className={style.show_hide_password}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ClosedEye /> : <OpenEye />}
              </button>
            </div>
            {/* Show error message if exists*/}
            {error.password && <p className={style.errors}>{error.password}</p>}
          </div>

          <div className={style.largeinput}>
            <label htmlFor="confirmPassword" className={style.label_password}>
              Confirm Password: <br />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={handleChange}
                className={style.input_password2}
              />
            </label>
            <div className={style.btn_hideandshow}>
              <button
                type="button"
                className={style.show_hide_password}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <ClosedEye /> : <OpenEye />}
              </button>
            </div>
            {/* Show error message if exists */}
            {error.confirmPassword && <p className={style.errors}>{error.confirmPassword}</p>}
          </div>

          <div className={style.divButtons}>
            <button
              type="button"
              className={style.btn_cancel}
              onClick={handleCancelClick}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={style.btn_register}
              disabled={hasErrors()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};