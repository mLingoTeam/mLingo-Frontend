import React from 'react'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { authentication_service } from '../../../../../services/authentication';

const Collection_Card_Component = ({ set }) => {
    return (
        <div>
            <Link to="/collection/" onClick={
                () => {
                    authentication_service.setIntoLocalStorage({ name: "collectionid", value: set.id })
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

export default Collection_Card_Component;