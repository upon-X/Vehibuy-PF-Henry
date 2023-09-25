import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { searchByQueryFilters, applyFilterDb } from "../../../Redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBarDashboard() {

    const [value, setValue] = useState("");
    const queryParamsF = useSelector((state) => state.filteredsDashboard.queryParamsF);
    const dispatch = useDispatch();

    const handlerValueInput = (e) => {
        const { value } = e.target;
        setValue(value);
    }

    const buttonSubmit = async () => {
        queryParamsF.name = value;
        await dispatch(searchByQueryFilters(queryParamsF));
        dispatch(applyFilterDb("FilteredEmails"));  
    }

    useEffect(() => {
        if (value === "") {
            const clearValue = async () => {
                await setValue("");
                queryParamsF.name = "";
                dispatch(applyFilterDb("originEmails"));
            };
            clearValue();
        };
    }, [value])

    return (
        <div className={styles.container}>
            <input
                type="search"
                value={value}
                onChange={handlerValueInput}
                placeholder="Search for name, lastname, email..."
            />
            <button onClick={buttonSubmit}>SEARCH</button>
        </div>
    )
}