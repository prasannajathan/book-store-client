import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { APIURL } from '../constants.js'

import UserContext from '../context/UserContext'
import BooksContext from '../context/BooksContext'
import Product from './pages/Product'
import Header from './layouts/Header'
import Login from './auth/Login'

function App() {
    // Data loading
    const [isLoading, setIsLoading] = useState(true);

    // User data context
    const [userData, setUserData] = useState({ token: undefined, user: undefined })

    useEffect(() => {
        const isLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if (!token) {
                token = '';
                localStorage.setItem('auth-token', token);
                return
            }

            fetch(`${APIURL}/users/is-token-valid`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            })
                .then(response => response.json())
                .then(tokenRes => {
                    if (tokenRes.token) {
                        setUserData({
                            token,
                            user: tokenRes
                        });
                    }
                })
                .catch(error => console.log('error is', error));
        };

        isLoggedIn();
    }, [])

    // Books list context
    const [booksData, setBooksData] = useState({ docs: [] });
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(false)

    // Get list of books
    useEffect(() => {
        const getBooks = async () => {
            setIsLoading(true)
            fetch(`${APIURL}/books/list?page=${page}`)
                .then(res => res.json())
                .then(response => {
                    setIsLoading(false)
                    setBooksData(prevState => {
                        let data = response
                        if (prevState.docs.length && !paginate) {
                            const newBooks = [...prevState.docs, ...response.docs]
                            const updateBooks = { ...prevState, ...response }
                            updateBooks.docs = newBooks
                            data = updateBooks
                        }

                        // display first details for desktop
                        if (window.innerWidth > 767) {
                            setDisplay(true)
                            setBookId(data.docs[0]._id)
                        }

                        return data
                    })
                })
                .catch(error => console.log(error));
        };

        getBooks();
    }, [page, paginate])


    // Get book details
    const [book, setBook] = useState({});
    const [bookId, setBookId] = useState(null)
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        if (!bookId) {
            return
        }
        const getBookDetails = async () => {
            setIsLoading(true)
            fetch(`${APIURL}/books/list/${bookId}`)
                .then(res => res.json())
                .then(response => {
                    setIsLoading(false)
                    setBook(response);
                })
                .catch(error => console.log(error));
        };
        getBookDetails();
    }, [bookId])

    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <BooksContext.Provider value={{
                        booksData, setBooksData,
                        page, setPage,
                        isLoading, setIsLoading,
                        bookId, setBookId,
                        book, setBook,
                        paginate, setPaginate,
                        display, setDisplay
                    }}>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Product} />
                            <Route path="/login" component={Login} />
                        </Switch>
                    </BooksContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
