import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Delete() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cardList, setCardList] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState('');

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

    useEffect(() => {
        axios.get('http://localhost:3001/cards')
            .then(res => {
                // console.log('UseEffect being Called...');
                // console.log('CardList: ', res.data);

                const finalArray = (res.data).map(function (obj) {
                    return obj.title;
                });

                // console.log('CardList Index: ', finalArray);

                setCardList(finalArray);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/animals')
            .then(res => {
                // console.log('UseEffect being Called...');
                // console.log(`res.data: ${res.data}`);
                setAnimals(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        setLoading(false);
    }, [cardList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(animals);

        if (selectedAnimal === '') {
            return;
        }

        console.log(`selected animal: ${selectedAnimal}`);

        setAnimals(animals.filter(function (animal) { return animal !== selectedAnimal }));
        var animalsSelect = document.getElementById("animals");
        for (var i = 0; i < animalsSelect.length; i++) {
            if (animalsSelect.options[i].value == selectedAnimal)
                animalsSelect.remove(i);
        }

        if (cardList.includes(selectedAnimal)) {
            console.log('selected animal is in card list');

            const random_value = Math.floor(Math.random() * animals.length);
            const new_title = animals[random_value].title;
            console.log(`random value: ${random_value}`);
            console.log(`new_title: ${new_title}`);

            const uri = `http://localhost:3001/cards/${selectedAnimal}`;
            const data = { title: new_title };
            console.log(`uri: ${uri}`);
            let result = axios.post(uri,
                data, {
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                }
            });

            result.then((data) => { console.log('Printing response data: ', data) });
        }

        const result = axios.post(`http://localhost:3001/delete-animal/${selectedAnimal}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                }
            });

        result.then((data) => {
            // console.log('Printing response data: ', data.data) 
            if (data.data === 'ok') {
                alert('Animal deletion successful');
            } else {
                alert('Animal deletion unsuccessful');
            }
        });
    }

    if (loading || animals.length === 0) {
        return <>Still loading...</>;
    }

    return (
        <div className='bg'>
            <div className="delete-container">
                <h2>Delete Animal Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='delete-form'>
                        <div>
                            <label>Choose Animal: </label>
                            <select id='animals' onChange={(event) => setSelectedAnimal(event.target.value)}>
                                <option value=''></option>
                                {
                                    animals.map((animal) => {
                                        return (
                                            <option value={animal.title}>{animal.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <p> </p>
                        <div>
                            <button type='submit'>Delete Animal</button>
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
    );
}

export default Delete