import React from 'react'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { authenticationService } from '../../../services/authentication';

const StudySetCardComponent = ({ set }) => {
    return (
        <div>
            <Link to="/studyset/" onClick={
                () => {
                    authenticationService.setIntoLocalStorage({ name: "studysetid", value: set.id })
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