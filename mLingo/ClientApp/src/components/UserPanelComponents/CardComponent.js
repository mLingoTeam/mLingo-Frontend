import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const CardComponent = ({ set }) => {
    console.log(set);
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{set.name}</CardTitle>
                    <CardSubtitle>{set.ownerId}</CardSubtitle>
                    <CardText>{set.id}</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardComponent;