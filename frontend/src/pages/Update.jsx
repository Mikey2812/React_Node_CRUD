import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const bookId = location.pathname.split("/")[2];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    useEffect (() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get("http://localhost:8800/book/"+bookId);
                let book = res.data[0];
                setTitle(book.title);
                setDescription(book.description);
                setPrice(book.price);
                setImage(book.image);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBook();
    }, []);
    const [error,setError] = useState(false)

    const handleClick = async (e) => {
        e.preventDefault();
        const book = {title, description, price, image}
        try {
            await axios.put(`http://localhost:8800/books/${bookId}`, book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="form">
                        <h1>Edit Book</h1>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label w-100 text-start">Title</label>
                            <input className="w-100 mb-2" type="text" placeholder="Title" name="title" onChange={e => setTitle(e.target.value)} value={title}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label w-100 text-start">Description</label>
                            <textarea className="w-100 mb-2" rows={5} type="text" placeholder="Description" name="description" onChange={e => setDescription(e.target.value)} value={description}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label w-100 text-start">Price</label>
                            <input className="w-100 mb-2" type="number" placeholder="Price" name="price" onChange={e => setPrice(e.target.value)} value={price}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label w-100 text-start">Image</label>
                            <input className="w-100 mb-2" type="text" placeholder="Image" name="image" onChange={e => setImage(e.target.value)} value={image}/>
                            <img src={image} alt="" />
                        </div>
                        <div className="d-flex justify-content-start">
                            <button onClick={handleClick} className="btn btn-outline-success mx-3">Edit</button>
                                {error && "Something went wrong!"}
                            <Link className="btn btn-outline-primary" to="/">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;