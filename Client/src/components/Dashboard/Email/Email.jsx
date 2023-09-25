import React from "react";
import { useEffect } from "react";
import styles from "./Email.module.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { applyFilterDb, deleteUserWithID, editPutUser, getDashboard } from "../../../Redux/actions";
import TRASH from "./Icons/TRASH.svg";
import EDIT from "./Icons/EDIT.svg";
import { useState } from "react";

export default function Email(props) {
    const { id, name, lastName, email, country, age, status, verify, ban, image, phone, onCheckboxChange, isChecked } = props;

    const dispatch = useDispatch();
    const EmailsLoaded = useSelector((state) => state.EmailsLoaded);
    const verifyText = verify ? "Yes" : "Not";
    const banText = ban ? "Banned" : "Not";
    const veryClass = verify ? styles.emailItemVerifyYes : styles.emailItemVerifyNot;
    const veryClassB = ban ? styles.emailItemVerifyNot : styles.emailItemVerifyYes;
    let icon = "question";
    let imageTag = "";

    if (image) {
        icon = null;
        imageTag = `<img src="${image}" alt="User Image" width="100" style="border-radius: 50%;">`;
    }

    const handleDeletedEmail = async (id) => {
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
                dispatch(deleteUserWithID(id));
                dispatch(applyFilterDb("originEmails"));
            }
        });
    };
    const handlePutEmail = (id) => {
        const htmlContent = `
                              ${imageTag}
                              <br />
                              <input id="input-name" class="swal2-input" type="text" placeholder="${name !== undefined ? name : 'Name'}">
                              <input id="input-lastname" class="swal2-input" type="text" placeholder="${lastName !== undefined ? lastName : 'Lastname'}">
                              <input id="input-age" class="swal2-input" type="number" placeholder="${age !== undefined ? age : 'Age'}">
                              <input id="input-country" class="swal2-input" type="text" placeholder="${country !== undefined ? country : 'Country'}">
                              <input id="input-phone" class="swal2-input" type="text" placeholder="${phone !== undefined ? phone : 'Phone'}">
                              <select id="select-status" class="swal2-select">
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                              </select>
                              <select id="select-ban" class="swal2-select">
                                <option value=true>Banned</option>
                                <option value=false>Not Banned</option>
                              </select>
                            `;
        Swal.fire({
            title: "Edit User",
            icon: icon,
            html:
                htmlContent,
                showCancelButton: true,
                reverseButtons: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Accept",
            customClass: {
                actions: styles.customSwal2Actions, // Aplica la clase de estilo CSS Modules
              },
            preConfirm: () => {
                const selectedName = document.getElementById('input-name').value;
                const selectedLastname = document.getElementById('input-lastname').value;
                const selectedAge = document.getElementById('input-age').value;
                const selectedCountry = document.getElementById('input-country').value;
                const selectedPhone = document.getElementById('input-phone').value;
                const selectedStatus = document.getElementById('select-status').value;
                const selectedBan = document.getElementById('select-ban').value;
                return {
                    status: selectedStatus,
                    ban: selectedBan,
                    name: selectedName,
                    lastName: selectedLastname,
                    age: selectedAge,
                    country: selectedCountry,
                    phone: selectedPhone
                };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                // const { type, ban, name, lastName, age, country, phone } = result.value;
                let objeto = {}
                console.log(result, "Soy el result");
                if (result.value.status){
                    objeto.status = result.value.status
                }
                if (result.value.ban){
                    objeto.ban = result.value.ban
                }
                if (result.value.name){
                    objeto.name = result.value.name
                }
                if (result.value.lastName){
                    objeto.lastName = result.value.lastName
                }
                if (result.value.age){
                    objeto.age = result.value.age
                }
                if (result.value.country){
                    objeto.country = result.value.country
                }
                if (result.value.phone){
                    objeto.phone = result.value.phone
                }

                console.log(objeto, "soy el objeto");
                // Aquí puedes utilizar los valores seleccionados (type y ban) como desees
                await dispatch(editPutUser(objeto, id));
                await dispatch(getDashboard());
                await dispatch(applyFilterDb("originEmails"));
            }
        });
    };
    useEffect(() => {
        if (!EmailsLoaded) {
            const handleChangeEmails = async () => {
                await dispatch(getDashboard());
                await dispatch(applyFilterDb("originEmails"));
            };
            handleChangeEmails();
        }
    }, [EmailsLoaded, dispatch])

    return (
        <div className={styles.emailContainer}>
            <input 
            type="checkbox" 
            checked={isChecked}
            onChange={() => onCheckboxChange(id)}>
            </input>
            <div className={styles.emailItem}>{email}</div>
            <div className={styles.emailItem}>{name} {lastName}</div>
            <div className={styles.emailItem}>{country}</div>
            <div className={styles.emailItem}>{status}</div>
            <div className={`${veryClass}`}>{verifyText}</div>
            <div className={`${veryClassB}`}>{banText}</div>
            <div className={styles.emailItem}>
                <>
                    <button className={styles.delete} onClick={() => handleDeletedEmail(id)}>
                        <img className={styles.img} src={TRASH} alt="Icon..." title="Delete user" />
                    </button>
                    <button className={styles.edit} onClick={() => handlePutEmail(id)}>
                        <img className={styles.img} src={EDIT} alt="Icon..." title="Edit user" />
                    </button>
                </>
            </div>
        </div>
    );
}