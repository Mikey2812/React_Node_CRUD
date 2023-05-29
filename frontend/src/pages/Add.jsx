import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Add = () => {

    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        image: "",
    });

    const [error,setError] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/books", book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true)
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="form">
                        <h1>Add New Book</h1>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label w-100 text-start">Title</label>
                            <input className="w-100 mb-2" type="text" placeholder="Title" name="title" onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label w-100 text-start">Description</label>
                            <textarea className="w-100 mb-2" rows={5} type="text" placeholder="Description" name="description" onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label w-100 text-start">Price</label>
                            <input className="w-100 mb-2" type="number" placeholder="Price" name="price" onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label w-100 text-start">Image</label>
                            <input className="w-100 mb-2" type="text" placeholder="Image" name="image" onChange={handleChange}/>
                        </div>
                        <div className="d-flex justify-content-start">
                            <button onClick={handleClick} className="btn btn-outline-success mx-3">Add</button>
                                {error && "Something went wrong!"}
                            <Link className="btn btn-outline-primary" to="/">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;