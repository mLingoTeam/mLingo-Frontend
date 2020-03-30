import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import { FaTrash } from 'react-icons/fa'



const Flashcard = ({ set, remove }) => {

    const removeCard = () => {
        remove(set);
    }

    return (
        <div key={set.term}>
            <Card>
                <CardBody>
                    <CardTitle>{set.term || set.Term}</CardTitle>
                    <CardSubtitle>{set.definition || set.Definition}</CardSubtitle>
                    <button onClick={removeCard}><FaTrash /></button>
                </CardBody>
            </Card>
        </div >
    );
};

export default Flashcard;