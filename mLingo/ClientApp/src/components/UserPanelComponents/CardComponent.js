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
            <Link to="/collection/" onClick={
                () => {
                    authenticationService.setIntoLocalStorage({ name: "collectionid", value: set.id })
                }
            }>
                <Card>
                    <CardBody>
                        <CardTitle>{set.name}</CardTitle>
                        <CardSubtitle>Play Count: {set.playCount}</CardSubtitle>
                    </CardBody>
                </Card>
            </Link>
        </div>
    );
};

export default CardComponent;