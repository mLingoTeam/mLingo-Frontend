import React from './node_modules/react'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
} from './node_modules/reactstrap';
import { Link } from './node_modules/react-router-dom'
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