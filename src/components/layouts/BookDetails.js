import React, { useContext } from 'react'

import BooksContext from '../../context/BooksContext'

import { H3, H4 } from '../elements'
import '../styles/book-details.scss'

export default function BookDetails() {

    const { book, display, setDisplay } = useContext(BooksContext)

    const exit = () => {
        setDisplay(false)
    }

    return (
        display && <div className="details">
            <div className="img-block">
                <button onClick={exit}>&lt;</button>
                <img src={book.image} loading="lazy" alt="" />
            </div>
            <div className="content-block">
                <H3>{book.title} <span>{'$' + book.price}</span></H3>
                <H4>{book.author}</H4>
                <p>{book.preface}</p>
            </div>
        </div>
    )
}
