import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState(null);

    useEffect(() => {
        console.log(books)
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3500/api/users/auth`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    console.error(`HTTP error: ${res.status}`);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchUser();
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const res = await fetch(`http://localhost:3500/api/books`, {
            credentials: 'include'
        })
        if (res.ok){
            const data = await res.json()
            console.log(data)
            setBooks(data)
        }else{
            console.log("no books")
        }
    }

    const logout =  async () =>{
        try {
            const response = await fetch('http://localhost:3500/api/users/logout', {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`response status: ${response.status}`);
            }
            console.log('Logged out');
            window.location.href = '/'
        } catch (error) {
            console.error('Error:', error);
        } 
    }
    const onClickDelete = async (bookId) => {
        const res = await fetch(`http://localhost:3500/api/books/delete/${bookId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })
        if(res.ok){
            console.log("book was deleted")
            fetchBooks()
        }
    }
    const getStatusLabel = (status) => {
        switch(status) {
            case 0: return 'Before Reading';
            case 1: return 'Currently Reading';
            case 2: return 'Finished Reading';
            default: return 'Unknown';
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div className='profile-page'>
            <div className='info-area'>
                <h2>Welcome to your bookshelf!</h2>
                <p>Username: {user.username}</p>
                <a className='link-btn' href='/'>Go to search books ...</a>
                <button onClick={ logout }>Log Out</button>
            </div>
            <div>
                {books && books.map((book, index) => (
                    <li key={book.id}>
                        <img src={book.image}/>
                        <div className="list-row">
                            <h4>{book.title}</h4>
                            <p>by {book.author}</p>
                            <p>Status: {getStatusLabel(book.status)}</p>
                            <button onClick={() => onClickDelete(book.bookId)}>Delete</button>
                        </div>
                    </li>
                ))}
            </div>
        </div>
        
    );
};
