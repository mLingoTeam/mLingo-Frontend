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
                    <CardTitle>{set.term}</CardTitle>
                    <CardSubtitle>{set.definition}</CardSubtitle>
                    <CardText></CardText>
                </CardBody>
            </Card>
        </div >
    );
};

export default Flashcard;