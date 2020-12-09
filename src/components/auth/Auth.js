import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import UserContext from '../../context/UserContext'

export default function Auth() {
    const { userData, setUserData } = useContext(UserContext)
    const history = useHistory()

    const login = () => history.push('/login')

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
    }

    return (
        <nav>
            { userData.user ? (
                <>
                    <Span>{userData.user.firstName}</Span>
                    <button onClick={logout}>Log out</button>
                </>
            ) : (<button onClick={login}>Login</button>)}
        </nav>
    )
}

const Span = styled.span`
    font-size: 1rem;
    margin-right: 1rem;
`
