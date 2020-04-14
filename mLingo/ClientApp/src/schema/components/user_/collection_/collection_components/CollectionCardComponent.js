import React from './node_modules/react'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
} from './node_modules/reactstrap';
import { Link } from './node_modules/react-router-dom'
import { authenticationService } from '../../../services/authentication';

const StudySetCardComponent = ({ set }) => {
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

export default StudySetCardComponent;