import React from 'react';
import formStyles from '../styles/Forms.module.css'
import Link from 'next/link'

const register = () => {
    return (
        <div className={formStyles.container}>
        <form className={formStyles.form} action="/api/registerapi" method="post">
            <div className={formStyles.formDiv}>
                <label htmlFor='fullName'>Full Name</label>
                <input type='text' name='fullname' id='fullName' required></input>
            </div>
            <div className={formStyles.formDiv}>
                <label htmlFor='emailAddress'>Email Address</label>
                <input type='email' name='emailid' id='emailAddress' required></input>
            </div>
            <div className={formStyles.formDiv}>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' required></input>
            </div>
            <div className={formStyles.formDiv}>
                <input type='submit' value='Sign Up' className={formStyles.input_btn}></input>
            </div>
            <div className={formStyles.formBottom}>
            <Link href="/login" className={formStyles.promptLink}>Already have an account? Sign In</Link>
            </div>
        </form>
        </div>
    );
};

export default register;