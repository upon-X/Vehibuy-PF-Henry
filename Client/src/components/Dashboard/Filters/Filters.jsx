import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchByQueryFilters, applyFilterDb } from "../../../Redux/actions";

export default function Filters() {

    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState('');
    const [type, setType] = useState('');
    const [ban, setBan] = useState('');
    const [verify, setVerify] = useState('');

    const dispatch = useDispatch();
    const queryParamsF = useSelector((state) => state.filteredsDashboard.queryParamsF);

    useEffect(() => {
        const fetchCountriesDashboard = async () => {
            const endpoint = "/user/dashboard/users";
            try {
                const { data } = await axios(endpoint);
                const countryNamesDashB = data.map(
                    (users) => users.country
                );
                const uniqueCountry = [...new Set(countryNamesDashB)]
                await uniqueCountry.sort((a, b) => a.localeCompare(b));
                setCountry(uniqueCountry)
            } catch (error) {
                console.error(error);
            };
        };
        fetchCountriesDashboard();
    }, [])

    const handleSelectType = async (e) => {
        const { value } = e.target;
        setType(value);
        queryParamsF.status = value;
        await dispatch(searchByQueryFilters(queryParamsF))
        dispatch(applyFilterDb("FilteredEmails"));
    }

    const handleSelectBan = async (e) => {
        const { value } = e.target;
        setBan(value)
        queryParamsF.ban = value;
        await dispatch(searchByQueryFilters(queryParamsF))
        dispatch(applyFilterDb("FilteredEmails"));
    }

    const handleSelectVerify = async (e) => {
        const { value } = e.target;
        setVerify(value)
        queryParamsF.verify = value;
        await dispatch(searchByQueryFilters(queryParamsF))
        dispatch(applyFilterDb("FilteredEmails"));
    }

    const handleSelectCountry = async (e) => {
        const { value } = e.target;
        setSelectCountry(value)
        queryParamsF.country = value;
        await dispatch(searchByQueryFilters(queryParamsF))
        dispatch(applyFilterDb("FilteredEmails"));
    }


    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <p>Type: </p>
                <select onChange={handleSelectType} value={type}>
                    <option value="">Default</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
            <div className={styles.filters}>
                <p>Ban: </p>
                <select onChange={handleSelectBan} value={ban}>
                    <option value="">Default</option>
                    <option value="true">Banned</option>
                    <option value="false">Not</option>
                </select>
            </div>
            <div className={styles.filters}>
                <p>Verify: </p>
                <select onChange={handleSelectVerify} value={verify}>
                    <option value="">Default</option>
                    <option value="true">Yes</option>
                    <option value="false">Not</option>
                </select>
            </div>
            <div className={styles.filters}>
                <p>Country: </p>
                <select onChange={handleSelectCountry} value={selectCountry}>
                    <option value="">Default</option>
                    {
                        country?.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}