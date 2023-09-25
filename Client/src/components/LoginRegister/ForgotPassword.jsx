import React, { useState } from 'react';
import styles from './Login.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmitRestore = async (e) => {
        e.preventDefault();
        try {
            // Enviar la solicitud POST al servidor (No esta todavia la ruta)
            const response = await axios.post('/reset-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
            console.error(error);
            setMessage('Error sending for restore the password.');
        }
    };

    return (
        <><div className={styles.login}>
            <div className={styles.signin_form}>
                <form className={styles.form_in} onSubmit={(e) => handleSubmitRestore(e)}>
                    <h1 className={styles.title_signin}>Reset Password</h1>
                    <Link to='/login'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-left" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 12l10 0" />
                            <path d="M10 12l4 4" />
                            <path d="M10 12l4 -4" />
                            <path d="M4 4l0 16" />
                        </svg>
                    </Link>
                    <p className={styles.welcome_signin}>
                        Put your email to restore your password
                    </p>
                    <label className={styles.label}>E-mail</label>
                    <input
                        className={styles.input}
                        type="email"
                        id="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type='submit' className={styles.btn_signin_register} >
                        Restore Password
                    </button>
                </form>
                <div>{message}</div>
            </div>
        </div>
        </>
    )
}