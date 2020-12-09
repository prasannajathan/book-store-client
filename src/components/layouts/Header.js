import React from 'react'
import { Link } from 'react-router-dom'

import Auth from '../auth/Auth'

export default function Header() {
    return (
        <header>
            <div className="container header">
                <Link to="/">
                    <h3>Book Store</h3>
                </Link>
                <Auth />
            </div>
        </header>
    )
}
