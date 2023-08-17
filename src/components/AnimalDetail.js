import { Link, useLocation, useNavigate } from 'react-router-dom'

function Image({ img, title }) {
    return <img src={img} alt={title} class="animal-image" width="200px" />
}

function Description({ animalName, desc }) {
    return (
        <>
            <h2 className="animalName">{animalName}</h2>
            <p className="animalDesc">{desc}</p>
        </>
    )
}

const AnimalDetail = () => {
    const navigate = useNavigate();
    const animalVal = useLocation().state.animal;

    // console.log('Inside Animal Details: ', animalVal);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate('/login');
    };

    return (
        <div className="animalCard">
            <Image img={animalVal.image} title={animalVal.title} />
            <div className="text-container">
                <Description animalName={animalVal.name} desc={animalVal.description} />
            </div>
            <div>
                <Link to='/home'>Back to Home</Link>
            </div>
            <div>
                <button className="logout-btn" onClick={(event) => handleLogout(event)}>Logout</button>
            </div>
        </div>
    )
}

export default AnimalDetail