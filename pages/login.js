import React from 'react';
import formStyles from '../styles/Forms.module.css'
import Link from 'next/link'
const login = () => {
    return (
        <div className={formStyles.container}>
                <form action='/api/loginapi' method='POST' className={formStyles.form}>
                    <div className={formStyles.formDiv}>
                        <label htmlFor='emailAddress'>Email Address</label>
                        <input type='email' name='emailAddress' id='emailAddress' required></input>
                    </div>
                    <div className={formStyles.formDiv}>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' required></input>
                    </div>
                    <div className={formStyles.formDiv}>
                        <input type='submit' value='Sign In' className={formStyles.input_btn}></input>
                    </div>
                    <div className={formStyles.formBottom}>
                    <Link href="/register" className={formStyles.promptLink}>New User? Sign Up</Link>
                    </div>
            </form>
        </div>
    );
};

export default login;