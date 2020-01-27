import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const CardComponent = ({ set }) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{set.Name}</CardTitle>
                    <CardSubtitle>{set.OwnerId}</CardSubtitle>
                    <CardText>{set.Id}</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardComponent;