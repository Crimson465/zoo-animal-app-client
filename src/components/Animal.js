import { Link } from 'react-router-dom'

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

const Animal = ({ animal }) => {
    // console.log('Inside Animal: ', animal);
    return (
        <div id={animal.title}>
            <Image img={animal.image} title={animal.title} />
            <div className="text-container">
                <Description animalName={animal.name} desc={animal.description} />
                <Link to='/details' state={{animal: animal}}>More Details</Link>
            </div>
        </div>
    )
}

export default Animal
