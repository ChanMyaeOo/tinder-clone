import React, { useEffect, useState } from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import axios from './axios';

const TinderCards = () => {
    const [people, setPeople] = useState([])


    useEffect(() => {
        async function fetchData() {
            const resp = await axios.get("/tinder/cards")

            setPeople(resp.data)
        }

        fetchData();
    }, [])

    const onSwipe = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
    }
 
    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }
    return (
        <div className="tinderCards">
            <div className="tinderCards__container">
                {
                    people.map(person => (
                        <TinderCard 
                            className="swipe"
                            key={person.name}
                            onSwipe={(dir) => onSwipe(dir, person.name)}
                            onCardLeftScreen={() => onCardLeftScreen(person.name)} 
                            preventSwipe={['right', 'left']}
                        >
                            <div
                                style={{ backgroundImage: `url(${person.imgUrl})`}}
                                className="card"
                            >
                                <h3>{person.name}</h3>
                            </div>
                        </TinderCard>
                    ))
                }
            </div>
        </div>
    )
}

export default TinderCards
