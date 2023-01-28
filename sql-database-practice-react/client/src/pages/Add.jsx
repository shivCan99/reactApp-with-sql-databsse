import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [book, setBooks] = useState({
        title:"",
        desc:"",
        price:null,
        cover:""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBooks((prev) => ({...prev, [e.target.name]: e.target.value}));
    };
    console.log(book);

    const handleClick = async (err) => {
        err.preventDefault();
        try{
            await axios.post("http://localhost:5000/books",book);
            navigate("/");
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div className='form'>
        <h1>Add new book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title'/>
        <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>
        <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
        
        <button onClick={handleClick} className="toAdd">ADD</button>
    </div>
  )
}

export default Add