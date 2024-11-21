import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const Login = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`http://localhost:3500/api/users/auth`, {
                credentials: 'include'
            });
            if (res.ok) {
                window.location.href = '/login/profile'
            }
        };

        fetchUser();
    }, []);

    const onClickLogin = async (event) => {
        event.preventDefault()
        const form = document.querySelector('.login-form')
        const formData = new FormData(form)
        const username = formData.get('username')
        const password = formData.get('password')

        const response = await fetch(`http://localhost:3500/api/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            credentials: 'include'
        })
        const data = await response.json()
        console.log(data)
        console.log(response)
        if(response.ok){
            window.location.href = '/login/profile'
        }else{
            alert(data.message)
        }
    };

    const onClickSignup = async (event) => {
        event.preventDefault()
        const singupForm = document.querySelector('.signup-form')

        const formData = new FormData(singupForm)
        const username = formData.get('signup-username')
        const password = formData.get('signup-password')

        const response = await fetch(`http://localhost:3500/api/users/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                "id": "1",
                "username": username,
                "password": password
            }),
            credentials: 'include'
        })
        const data = await response.json()
        console.log(data)
        console.log(response)
        if(response.ok){
            singupForm.reset();
            alert('Your acount is created!')
        }else{
            alert(data.message)
        }
    };
    
    return (
        <div>
            <h3>Login</h3>
            <form className="login-form">
				<label>
					<span>Username:</span>
					<input type="text" name="username" autoComplete="off" id="username" required />
				</label>
				<label>
					<span>Password:</span>
					<input type="password" name="password" required />
				</label>
				<button type="submit" onClick={onClickLogin}>Log In</button>
			</form>
            <p>Or</p>
            <h3>Signup</h3>
            <form className="signup-form">
				<label>
					<span>Username:</span>
					<input type="text" name="signup-username" autoComplete="off" id="signup-username" required />
				</label>
				<label>
					<span>Password:</span>
					<input type="password" name="signup-password" required />
				</label>
				<button type="submit" onClick={onClickSignup}>Sign Up</button>
			</form>
        </div>
    );
};
