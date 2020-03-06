import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

const Flashcard = ({ set }) => {
    return (
        <div key={set.id}>
            <Card>
                <CardBody>
                    <CardTitle>{set.term || set.Term}</CardTitle>
                    <CardSubtitle>{set.definition || set.Definition}</CardSubtitle>
                    <CardText></CardText>
                </CardBody>
            </Card>
        </div >
    );
};

export default Flashcard;