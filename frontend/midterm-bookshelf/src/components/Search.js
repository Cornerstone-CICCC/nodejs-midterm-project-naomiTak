import React from "react";
import { useState } from 'react';

export const Search = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [searchText, setSearchText] = useState('');
    const [books, setBooks] = useState([]);

    const onChangeSearchText = (event) => {
        setSearchText(event.target.value);
    };

    const onClickSearch = async (event) => {
        event.preventDefault();
        if (searchText === '') return;
        const result = await search()
        const newResult = []
        console.log(result)

        for (let i = 0; i < result.length; i++) {
            const newBook = {
                bookId: result[i].id,
                title: result[i].volumeInfo.title,
                author: result[i].volumeInfo.authors?result[i].volumeInfo.authors[0]:"",
                status: 0,
                image: result[i].volumeInfo.imageLinks.smallThumbnail
            }
            newResult.push(newBook)
        }
        setBooks(newResult)
        
        setSearchText('');
    };

    const onClickAdd = async (book) => {
        const res = await fetch(`http://localhost:3500/api/books/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                bookId: book.bookId,
                title: book.title,
                author: book.author,
                status: 0,
                image: book.image,
                userId: ""
            })
        })
        if(res.ok){
            alert('The book was added into your bookshelf!')
            return true
        }else{
            console.log(res)
            alert('Problems happend. try again.')
            return false
        }
    }

    const checkDuplication = async (bookId) => {
        console.log("duplication")
        const res = await fetch(`http://localhost:3500/api/books/${bookId}`);
        const data = await res.json()
        if(res.ok){
            console.log(data)
            return true
        }else {
            console.log(data)
            return false
        }
    }

    const search = async () =>{
        const keyword = searchText? searchText : 'Book'
        //console.log(`search by ${keyword}`)
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=12&key=${apiKey}`);
            const data = await response.json()
            const result = data.items
            return result
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        <div className="search-page">
            <div className='search-area'>
                <div className='keyword-area'>
                <input  onChange={onChangeSearchText} />
                <button onClick={onClickSearch}>Search</button>
                </div>
            </div>

            <div className="result-area">
            {books && books.map((book, index) => (
                    <li key={book.id}>
                        <img src={book.image}/>
                        <div className="list-row">
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                            <button onClick={() => onClickAdd(book)}>add to bookshelf</button>
                        </div>
                    </li>
                ))}
            </div>
        </div>
        </>
    );
}

//export default Search;