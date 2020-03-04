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
                    <CardTitle>Collection name: {set.name}</CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <CardText></CardText>
                    <Link to="/collection/"><Button onClick={
                        () => {
                            authenticationService.setIntoLocalStorage({ name: "collectionid", value: set.id })
                        }
                    }>See the collection</Button></Link>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardComponent;