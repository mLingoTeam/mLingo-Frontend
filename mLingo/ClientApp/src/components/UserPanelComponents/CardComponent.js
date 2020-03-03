import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { authenticationService } from '../../services/authentication';

const CardComponent = ({ set }) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{set.name}</CardTitle>
                    <CardSubtitle>{set.ownerId}</CardSubtitle>
                    <CardText>{set.id}</CardText>
                    <Link to="/collection/"><Button onClick={
                        () => {
                            authenticationService.setIntoLocalStorage({ name: "collectionid", value: set.id })
                        }
                    }>Work with that</Button></Link>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardComponent;