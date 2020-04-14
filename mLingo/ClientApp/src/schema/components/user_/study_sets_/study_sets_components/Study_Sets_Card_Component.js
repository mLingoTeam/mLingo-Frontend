import React from './node_modules/react'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
} from './node_modules/reactstrap';
import { Link } from './node_modules/react-router-dom'
import { authentication_service } from '../../../../../services/authentication';

const Study_Sets_Card_Component = ({ set }) => {
    return (
        <div>
            <Link to="/studyset/" onClick={
                () => {
                    authentication_service.setIntoLocalStorage({ name: "studysetid", value: set.id })
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

export default Study_Sets_Card_Component;