import React, { useContext } from 'react';

import BooksContext from '../../context/BooksContext'

import Books from '../layouts/Books'
import BooksDetails from '../layouts/BookDetails'
import { H3 } from '../elements'

import '../styles/product.scss'

export default function Product() {
    const { isLoading } = useContext(BooksContext)

    return (
        <div className="container page">
            <H3>Product List</H3>
            <div className="content-page">
                <div className="lists-panel">
                    {isLoading && <p className="loader">Loading...</p>}
                    <Books />
                </div>
                <div className="details-panel">
                    <BooksDetails />
                </div>
            </div>
        </div>
    )
}
