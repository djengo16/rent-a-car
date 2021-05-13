import { useState } from 'react';
import styles from'./login.module.css';
import { Redirect, Link } from 'react-router-dom';

export function Login(props) {
    const [userData, setUserData] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    const onInputChange = (event) => {
        event.persist();

        // state
        // { email: 'aa', password: 'b' }
        // event.target
        // { name: 'email', value: 'ccc' }
        // result
        // { email: 'ccc', password: 'b' }
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    // const onFormSubmit = (event) => {
    //     event.preventDefault();

    //     login(userData).then(_ => {
    //         console.log('success!');
    //         setRedirect(true);
    //     })
    //     .catch(err => setError(err.message));
    //}

    return (
        // <>
        // { redirect && <Redirect to='/' /> }
        <div className={styles["login-form-wrapper"]}>
            <form className={styles["login-form"]} >
            {/* { error && <span className="text-danger">{error}</span>} */}
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" className="form-control" onChange={onInputChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" className="form-control" onChange={onInputChange} required/>
                </div>
                <button className="btn btn-primary">Login</button>
                <div>
                    <Link to="/register">Dont have an account yet?</Link>
                </div>                
            </form>
        </div>
        // </>
    );
}