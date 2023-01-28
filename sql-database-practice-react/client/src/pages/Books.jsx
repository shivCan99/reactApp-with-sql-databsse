import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Books = () => {

    const [books, setBooks] = useState([])
    useEffect(() => {
        const fetchAllBook = async () =>{
            try{
                const res = await axios.get("http://localhost:5000/books")
                console.log(res);
                setBooks(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
       fetchAllBook() 
    },[])

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:5000/books/"+id)
            window.location.reload();
        }
            catch(err){
            console.log(err);
        }
    }
  return (
    <div>
        <h1>Shivam Book SHOP</h1>
        <div className="books">
            {books.map(book => (
                <div className="book" key={book.id}>
                    {book.cover && <img src={book.cover}alt=''/>}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <h3>{book.price}</h3>
                    <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                </div>
            ))}
        </div>
        <button>
            <Link to="/add">Add new Book</Link>
        </button>
    </div>
  )
}

export default Books