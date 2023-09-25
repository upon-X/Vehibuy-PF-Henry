import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Email from "../Email/Email";
import styles from "./Emails.module.css";
import { applyFilterDb, deleteUserWithID, editPutUser, getDashboard } from "../../../Redux/actions";
import EDIT from "../Email/Icons/EDIT.svg";
import TRASH from "../Email/Icons/TRASH.svg";
import Swal from "sweetalert2";
import Filters from "../Filters/Filters";
import SearchBarDashboard from "../SearchBar/SearchBar";

export default function DashBoardEmail() {

    const pageFilteredDb = useSelector((state) => state.pageFilteredDb);
    const EmailsLoaded = useSelector((state) => state.EmailsLoaded);
    const dispatch = useDispatch();
    const [emailSelection, setEmailSelection] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const selectedEmails = Object.keys(emailSelection).filter((key) => emailSelection[key]);
    const selectedEmailObjects = selectedEmails.map((emailId) => {
        return { id: emailId };
    });
    const aux = selectedEmailObjects.length;

    const handleCheckboxActionEdit = async () => {
                Swal.fire({
                    title: "Select options",
                    icon: "question",
                    html: '<select id="select-status" class="swal2-select">' +
                        '<option value="admin">Admin</option>' +
                        '<option value="user">User</option>' +
                        '</select>' +
                        '<select id="select-ban" class="swal2-select">' +
                        '<option value=true>Banned</option>' +
                        '<option value=false>Not Banned</option>' +
                        '</select>',
                    showCancelButton: true,
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Accept",
                    preConfirm: () => {
                        const selectedStatus = document.getElementById('select-status').value;
                        const selectedBan = document.getElementById('select-ban').value;
                        return {
                            type: selectedStatus,
                            ban: selectedBan
                        };
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const objeto = result.value;
                        // Aquí puedes utilizar los valores seleccionados (type y ban) como desees
                        for (const id in emailSelection) {
                        await dispatch(editPutUser(objeto, id));}
                        await dispatch(getDashboard());
                        await dispatch(applyFilterDb("originEmails"));
                    }
                });
            };

    const handleCheckboxActionDelete = async () => {
        Swal.fire({
            title: "¿Are you sure?",
            text: `You are about to delete ${name} from the database`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Accept",
        }).then((result) => {
            if (result.isConfirmed) {
                for (const id in emailSelection) {
                    dispatch(deleteUserWithID(id));
                }
                dispatch(applyFilterDb("originEmails"));
            }
        });
    };

    const handleCheckboxChange = (id) => {
        // Actualiza el estado de selección cuando se cambia el checkbox
        setEmailSelection((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

      const handleSelectAllChange = () => {
          setSelectAll(!selectAll);
          pageFilteredDb.forEach((email) => {
            console.log(email.id, "emailid en checkbox");
        
            setEmailSelection((prevState) => ({
              ...prevState,
              [email.id]: !selectAll,
            }));
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
        <div>
                <div>
                    <SearchBarDashboard/>
                </div>
                <div className={styles.filtersEdit}>
                    <Filters/>
                    <button className={aux<2 ? styles.deleteDisabled : styles.delete} onClick={handleCheckboxActionDelete} disabled={aux<2}>
                       <img className={styles.img} src={TRASH} alt="Icon..." title="Eliminar usuario" />
                    </button>
                    <button className={aux<2 ? styles.editDisabled : styles.edit} onClick={handleCheckboxActionEdit} disabled={aux<2}>
                       <img className={styles.img} src={EDIT} alt="Icon..." title="Editar usuario" />
                    </button>
                </div>
            <div className={styles.emailContainer}>
                <input 
                type="checkbox" 
                checked={selectAll}
                onChange= {handleSelectAllChange}
                >
                </input>
                <div className={styles.emailItem}>Email</div>
                <div className={styles.emailItem}>Full Name</div>
                <div className={styles.emailItem}>Country</div>
                <div className={styles.emailItem}>Type</div>
                <div className={styles.emailItem}>Verify</div>
                <div className={styles.emailItem}>Banned</div>
                <div className={styles.emailItem}>Actions</div>
            </div>
            <div>
                {pageFilteredDb?.map((email) => (
                    <Email
                        key={email.id}
                        id={email.id}
                        name={email.name}
                        lastName={email.lastName}
                        age={email.age}
                        image={email.image}
                        email={email.email}
                        country={email.country}
                        status={email.status}
                        phone={email.phone}
                        verify={email.verify}
                        ban={email.ban} 
                        isChecked={emailSelection[email.id] || false}
                        onCheckboxChange={handleCheckboxChange}
                        />
                ))
                }
                
            </div>
        </div>
    )
}