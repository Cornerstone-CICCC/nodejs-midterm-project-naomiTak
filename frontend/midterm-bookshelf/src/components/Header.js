import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`http://localhost:3500/api/users/auth`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <header>
                <div className='title-area'>
                <a href='/'><h2>Book Shelf</h2></a>
                </div>
                <div className="login-area">
                <a className='link-btn' href='/login'>Login</a>
                </div>
                </header>;
    }
    return(
        <>
        <header>
            <div className='title-area'>
                <h2>Book Shelf</h2>
            </div>
            <div className="login-area">
                <a className='link-btn' href='/login/profile'>{user.username}'s bookshelf</a>
            </div>
        </header>
        </>
    );
}

//export default Header;