import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


const Books = () => {
    const [books, setBooks] = useState([])
    useEffect (() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);
    
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8800/books/${id}`);
          window.location.reload()
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <div>
            <h1>Book Shop</h1>
            <div className="container">
                <div className="col-12">
                    <Link to="/add" className='btn btn-outline-primary m-3' style={{textDecoration: "none" }}> Add new book </Link>
                </div>
                <div className="books row">
                    {books.map((book) => (
                        <div key={book.id} className="book col-3 mb-5">
                            <img src={book.image} alt=""className='w-100'/>
                            <h2>{book.title}</h2>
                            <p style={{"minHeight":"72px"}}>{book.description}</p>
                            <p>{book.price} VND</p>
                            <button className="update">
                                <Link to={`/update/${book.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                                    Update
                                </Link>
                            </button>
                            <button className="delete mx-2" onClick={() => handleDelete(book.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Books