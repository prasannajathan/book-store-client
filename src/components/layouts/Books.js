import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'

import BooksContext from '../../context/BooksContext'

export default function BooksList() {
    const { setPage, setBookId, booksData, setPaginate, setDisplay } = useContext(BooksContext)

    // Pagination with buttons
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [windowWidth])

    const changePage = (pageNumber) => {
        setPaginate(true)
        setPage(pageNumber)
    }

    // Pagination through scroll
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) {
            return
        };
        loadMoreBooks();
    }, [isFetching]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching || windowWidth > 767) {
            return;
        }
        setIsFetching(true);
    }

    const loadMoreBooks = () => {
        if (!booksData.nextPage) {
            return
        }
        setPage(booksData.nextPage);
        setIsFetching(false);
    };

    // Display details
    const displayDetail = (id) => {
        setBookId(id);
        setDisplay(true);
    }

    return (
        <>
            <UL>
                {booksData.docs.map(({ _id, title, price }, i) => (
                    <LI key={i} onClick={() => displayDetail(_id)}>
                        <H4>{title}</H4>
                        <P>{'$' + price}</P>
                    </LI>
                ))}
            </UL>

            {windowWidth > 767 && (
                <div className="pagination">
                    { <button disabled={!booksData.hasPrevPage} onClick={() => changePage(booksData.prevPage)}>&lt;</button>}

                    {new Array(booksData.totalPages).fill(booksData.totalPages).map((_n, i) => (
                        <button key={i} onClick={() => changePage(i + 1)}>{i + 1}</button>
                    ))}

                    {<button disabled={!booksData.hasNextPage} onClick={() => changePage(booksData.nextPage)}>&gt;</button>}
                </div>
            )}
        </>
    )
}

const UL = styled.ul`
    list-style-type: none;
    padding: 0;
`
const LI = styled.li`
    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    padding: 1rem;
    cursor: pointer;

    &:active, &:hover{
        background-color: #eee;
    }
`
const H4 = styled.h4`
    font-size: 1.2rem;
    margin-bottom: .5rem;
`
const P = styled.p`
    font-size: 1rem;
    margin-bottom: 0;
`
