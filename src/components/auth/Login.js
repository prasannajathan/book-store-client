import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { APIURL } from '../../constants'
import UserContext from '../../context/UserContext';

import { H3 } from '../elements'

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };

            fetch(`${APIURL}/users/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginUser)
            })
                .then(response => response.json())
                .then(loginRes => {
                    setUserData({
                        token: loginRes.token,
                        user: loginRes.user,
                    });
                    localStorage.setItem('auth-token', loginRes.token);
                    history.push('/');
                })
                .catch(error => console.log('error is', error));

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div className="container page">
            <H3>Log in</H3>
            <form onSubmit={submit}>
                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Log in" />
            </form>
        </div>
    )
}


