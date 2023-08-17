import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Animal from './Animal';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cardList, setCardList] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [animal1, setAnimal1] = useState(null);
  const [animal2, setAnimal2] = useState(null);
  const [animal3, setAnimal3] = useState(null);

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
        // console.log(res.data);
        setAnimals(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [cardList]);

  useEffect(() => {
    if (animals.length > 0) {
      // console.log(`cardList: ${cardList}`);

      const animal1 = animals.filter(obj => {
        return obj.title === cardList[0];
      })[0];

      const animal2 = animals.filter(obj => {
        return obj.title === cardList[1];
      })[0];

      const animal3 = animals.filter(obj => {
        return obj.title === cardList[2];
      })[0];

      setAnimal1(animal1);
      setAnimal2(animal2);
      setAnimal3(animal3);

      setLoading(false);
    }
  }, [animals, cardList]);

  const updateCardList = (oldTitle, newTitle) => {
    const uri = `http://localhost:3001/cards/${oldTitle}`;
    const data = { title: newTitle };
    console.log(`uri: ${uri}`);
    let result = axios.post(uri,
      data, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    });

    result
      // .then(response => response.text())
      .then((data) => { console.log('Printing response data: ', data) });

    console.log(`oldTitle: ${oldTitle}, newTitle: ${newTitle}`);
  };

  if (loading) {
    return <>Still loading...</>;
  }

  return (
    <div className="App">
      <Header></Header>
      <div className='animal-container' id='animals-container'>
        <div className="animalCard" id='animal-one-container'>
          <div className="btn-container">
            <button id="add-btn-one" onClick={() => addAnimal(animal1.name)}>Add</button>
            <button id="edit-btn-one" onClick={() => editAnimal(animals, setAnimal1, cardList, setCardList, 0, updateCardList)}>Edit</button>
            <button id="delete-btn-one" onClick={() => deleteAnimal(animals, setAnimal1, cardList, setCardList, 0, updateCardList)}>Delete</button>
          </div>
          <Animal animal={animal1}></Animal>
        </div>
        <div className="animalCard" id='animal-two-container'>
          <div className="btn-container">
            <button id="add-btn-two" onClick={() => addAnimal(animal2.name)}>Add</button>
            <button id="edit-btn-two" onClick={() => editAnimal(animals, setAnimal2, cardList, setCardList, 1, updateCardList)}>Edit</button>
            <button id="delete-btn-two" onClick={() => deleteAnimal(animals, setAnimal2, cardList, setCardList, 1, updateCardList)}>Delete</button>
          </div>
          <Animal animal={animal2}></Animal>
        </div>
        <div className="animalCard" id='animal-three-container'>
          <div className="btn-container">
            <button id="add-btn-three" onClick={() => addAnimal(animal3.name)}>Add</button>
            <button id="edit-btn-three" onClick={() => editAnimal(animals, setAnimal3, cardList, setCardList, 2, updateCardList)}>Edit</button>
            <button id="delete-btn-three" onClick={() => deleteAnimal(animals, setAnimal3, cardList, setCardList, 2, updateCardList)}>Delete</button>
          </div>
          <Animal animal={animal3}></Animal>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

function addAnimal(name) {
  console.log(name);
  var ul = document.getElementById("dynamic-list");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(name));
  ul.appendChild(li);
}

function editAnimal(animals, setAnimal, cardList, setCardList, num, updateCardList) {
  var checkName = false;

  while (checkName === false) {
    const animal_name = prompt('Please enter name of animal')
    console.log(animal_name)

    var result = animals.filter(obj => {
      return (obj.name.toLocaleLowerCase()).includes(animal_name.toLocaleLowerCase());
    })

    result = result[0];

    const newCardList = [cardList[0], cardList[1], cardList[2]];
    if (result !== undefined && animal_name !== '' && !newCardList.includes(result.title)) {
      const oldTitle = newCardList[num];
      newCardList[num] = result.title;
      const newTitle = newCardList[num];
      setCardList(newCardList);
      // console.log(result);
      setAnimal(result);
      checkName = true;
      updateCardList(oldTitle, newTitle);
    }
  }
}


function deleteAnimal(animals, setAnimal, cardList, setCardList, num, updateCardList) {
  let checkDup = true;

  while (checkDup) {
    const new_num = Math.floor(Math.random() * animals.length);
    var result = animals[new_num];
    const newCardList = [cardList[0], cardList[1], cardList[2]];
    // console.log(`New Animal title: ${result.title}`);
    if (!newCardList.includes(result.title)) {
      const oldTitle = newCardList[num];
      newCardList[num] = result.title;
      const newTitle = newCardList[num];
      setCardList(newCardList);
      console.log(result)
      setAnimal(result);
      updateCardList(oldTitle, newTitle);
      checkDup = false;
    }
  }
}

export default Home