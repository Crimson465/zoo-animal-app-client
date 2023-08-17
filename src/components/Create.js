import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios';

function Create() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/getEmail", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(`data.isLoggedIn: ${data.isLoggedIn}`);
                if (!data.isLoggedIn) {
                    navigate("/login")
                }
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const animal = { name, title, description, image };
        console.log(animal);

        const result = axios.post('http://localhost:3001/animals',
            animal, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        });

        result.then((data) => { 
            // console.log('Printing response data: ', data.data) 
            if(data.data === 'ok'){
                alert('Animal creation successful');
            }else{
                alert('Animal creation unsuccessful');
            }
        });

        // console.log(`result: ${result}`);
    }

    return (
        <div className='bg'>
            <div className="create-container">
                <h2>Create Animal Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='create-form'>
                        <div>
                            <label>Name: </label>
                            <input type="text" placeholder="Enter Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Title: </label>
                            <input type="text" placeholder="Enter Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div>
                            <label>Description: </label>
                            <textarea maxLength="1800" placeholder="Enter Description" name="desc" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div>
                            <label>Image: </label>
                            <input type="url" placeholder="Enter Image URL" name="img" value={image} onChange={(e) => setImage(e.target.value)} required />
                        </div>
                        <div>
                            <button type='submit'>Create Animal</button>
                        </div>
                    </div>
                </form>

                <div>
                    <Link to='/home'>
                        <button>Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Create
